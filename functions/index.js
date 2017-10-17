/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// [START all]
// [START import]
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
var cors = require('cors')({ origin: true });
var webpush = require('web-push');


//note:  This is all dev.
var env = functions.config().notifications.environment;
var serviceAccount = require("./variations-firebase-adminsdk-prod.json");
var databaseURL = "https://project-5333406827865431386.firebaseio.com";
if (env == "dev") {
  console.log("environment is dev");
  serviceAccount = require("./variationsdev-firebase-adminsdk-11794-554be74803.json");
  databaseURL = "https://variationsdev.firebaseio.com";
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
});
// [END import]

exports.helloVariations = functions.https.onRequest(function (request, response) {

  // console.log("body: request.body");
  cors(request, response, function () {

    var whoIs = functions.config().notifications.who;
    console.log("whoIs:", whoIs);
    var message = "<h1 style='color:red'>Hello " + whoIs + " from The Variations!</h1>";
    console.log("request", request);
    response.send(message);
  });
});

exports.sendMessage = functions.https.onRequest(function (request, response) {
  cors(request, response, function () {
    var inputMessage = request.body.message;
    var message = { title: "Variations Notice", content: inputMessage, notifyOnly: true };
    webpush.setVapidDetails('mailto:variationscondos@gmail.com', 'BF1ZDvqSumSNgWPOAcWRhOz7-xXtt8boaOy6bQpjf1mEbOj1R3KXSC5Eb6FRf0wWgjq8EBM8FMI95FTR5HtlE8U', 'g1Z6EQk4lj4olYmqcAPISj4ry7-7TDcj9rW1bSJlPCY');
    return admin.database().ref('Subscriptions').once('value')
      .then(function (subscriptions) {
        console.log("looping thru Subscriptions");
        subscriptions.forEach(function (sub) {
          var pushConfig = {
            endpoint: sub.val().endpoint,
            keys: {
              auth: sub.val().keys.auth,
              p256dh: sub.val().keys.p256dh
            }
          };

          var sendMessage = JSON.stringify(message);
          console.log("sendNotification", sendMessage);
          webpush.sendNotification(pushConfig, sendMessage)
            .catch(function (err) {
              console.log("error:", err);
            })
        });

        console.log("response status");
        response.status(201).json({ message: 'Message sent succesfully' });
      })
      .catch(function (err) {
        response.status(500).json({ error: err });
      });


  });
});

exports.storeAnnouncements = functions.https.onRequest(function (request, response) {
  cors(request, response, function () {
    var postDate = request.body.date;
    console.log("storeAnnouncements");
    console.log("postDate", postDate);
    var announcement = {
      Title: request.body.title,
      URL: request.body.url
    };
    console.log("announcement", announcement);
    admin.database().ref().child("Announcements").child(postDate).set(announcement)
      .then(function () {

        webpush.setVapidDetails('mailto:variationscondos@gmail.com', 'BF1ZDvqSumSNgWPOAcWRhOz7-xXtt8boaOy6bQpjf1mEbOj1R3KXSC5Eb6FRf0wWgjq8EBM8FMI95FTR5HtlE8U', 'g1Z6EQk4lj4olYmqcAPISj4ry7-7TDcj9rW1bSJlPCY');
        return admin.database().ref('Subscriptions').once('value');
      })
      .then(function (subscriptions) {
        console.log("looping thru Subscriptions");
        subscriptions.forEach(function (sub) {
          var pushConfig = {
            endpoint: sub.val().endpoint,
            keys: {
              auth: sub.val().keys.auth,
              p256dh: sub.val().keys.p256dh
            }
          };
          var message = { title: 'New Announcement Posted', content: announcement.Title };
          var sendMessage = JSON.stringify(message);
          console.log("sendNotification", sendMessage);
          webpush.sendNotification(pushConfig, sendMessage)
            .catch(function (err) {
              console.log("error:", err);
            })
        });

        console.log("response status");
        response.status(201).json({ message: 'Announcement Stored and Notified' });

      })
      .catch(function (err) {
        response.status(500).json({ error: err });
      });


  });
});

/* function sendNotification(message) {
  
} */
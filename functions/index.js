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
var serviceAccount = require("./variationsdev-firebase-adminsdk-11794-554be74803.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://variationsdev.firebaseio.com"
});
// [END import]

exports.helloVariations = functions.https.onRequest(function(request, response) {

 // console.log("body: request.body");
 cors(request, response, function () {

  var whoIs = request.body.who;
  var message = "<h1 style='color:red'>Hello " + whoIs + " from The Variations!</h1>";
  console.log("request", request);
  response.send(message);
 });
});

exports.storeAnnouncements = functions.https.onRequest(function(request, response) { 
   cors(request, response, function () {
    console.log("request", request);
    var announcementText = request.body.announcement;
    console.log("announcementText", announcementText);
    //console.log(response);
    var announcement  =  {  
      Title: announcementText,
      URL: "http://usatoday.com"    
      };
    admin.database().ref().child("Announcements").child("20010201").set(announcement)   
    .then(function () {
      console.log("get Subscriptions");
      webpush.setVapidDetails('mailto:variationscondos@gmail.com', 'BF1ZDvqSumSNgWPOAcWRhOz7-xXtt8boaOy6bQpjf1mEbOj1R3KXSC5Eb6FRf0wWgjq8EBM8FMI95FTR5HtlE8U', 'g1Z6EQk4lj4olYmqcAPISj4ry7-7TDcj9rW1bSJlPCY');
      return admin.database().ref('Subscriptions').once('value');
    }) 
    .then(function (subscriptions) {
      console.log("loop thru Subscriptions");
      subscriptions.forEach(function (sub) {
        var pushConfig = {
          endpoint: sub.val().endpoint,
          keys: {
            auth: sub.val().keys.auth,
            p256dh: sub.val().keys.p256dh
          }
        };

        console.log("sendNotification");
        var sendMessage = JSON.stringify({title: 'New Announcement', content: announcementText});
        console.log("sendMessage", sendMessage);
        webpush.sendNotification(pushConfig, sendMessage)
          .catch(function(err) {
            console.log("error:", err);
          })
      });
      console.log("response status");
      response.status(201).json({message: 'Announcement Stored', id: '12345'});
    //  response.send("OK");
    })
    .catch(function (err) {
      response.status(500).json({error: err});
    });
  });
});
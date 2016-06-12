import { Injectable } from '@angular/core';


declare var firebase: any;
@Injectable()
export class FirebaseService {

    constructor() { 
        var config = {
            apiKey: "AIzaSyBzLfPOqnW2ccBGIwprbfAQtat4aWiFakM",
            authDomain: "thevariations.firebaseapp.com",
            databaseURL: "https://thevariations.firebaseio.com",
            storageBucket: "project-4248197981206346819.appspot.com",
        };
        firebase.initializeApp(config);

    }

}
import { Injectable } from '@angular/core';


declare var firebase: any;
@Injectable()
export class FirebaseService {

    constructor() { 
        var config = {
          apiKey: "AIzaSyDOEDQzTcjBQ5Z5i4EAyGAJ1bvYdVcufZ0",
          authDomain: "project-5333406827865431386.firebaseapp.com",
          databaseURL: "https://project-5333406827865431386.firebaseio.com",
          storageBucket: "",
        };
        firebase.initializeApp(config);

    }

}
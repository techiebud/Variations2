import { Injectable } from '@angular/core';


declare var firebase: any;
@Injectable()
export class FirebaseService {

    constructor() { 
        var config = {
           apiKey: "AIzaSyBsMzDuo5sUtsmKxkRM4p7sKWnmAhSVTDo",
            authDomain: "variatons2.firebaseapp.com",
            databaseURL: "https://variatons2.firebaseio.com",
            storageBucket: "variatons2.appspot.com",
        };
        firebase.initializeApp(config);

    }

}
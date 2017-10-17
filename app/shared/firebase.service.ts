import { AppSettings } from './app.common';
import { Injectable } from '@angular/core';


declare var firebase: any;
@Injectable()   
export class FirebaseService {

    constructor() { 
        let config = AppSettings.FIREBASE_PRODUCTION;
        firebase.initializeApp(config);

    }

}
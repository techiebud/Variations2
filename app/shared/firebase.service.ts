import { AppSettings } from './app.common';
import { Injectable } from '@angular/core';


declare var firebase: any;
@Injectable()   
export class FirebaseService {

    constructor() { 
        //TODO:   Change to Production
       // let config = AppSettings.FIREBASE_DEVELOPMENT;
        let config = AppSettings.FIREBASE_PRODUCTION;
        firebase.initializeApp(config);

    }

}
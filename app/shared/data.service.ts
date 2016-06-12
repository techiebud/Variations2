import {Injectable, EventEmitter} from "@angular/core";
import {User} from "./user.interface";
import {AppHelpers, AppSettings} from "../app.component";
import {FirebaseService} from "./firebase.service";

declare var firebase: any;
declare var md5: any;

@Injectable()
export class DataService {

    private _userProfileUpdated = new EventEmitter<any>();

    constructor(private _firebaseService: FirebaseService) { }

    getAnnouncements(): void {
        let fbTable = "Announcements";
        let databaseRef = firebase.database().ref(fbTable).orderByKey();
        databaseRef.once('value',
            (snapshot) => {              
                let returnedData = snapshot.val();             
                localStorage.setItem(fbTable, JSON.stringify(returnedData));
            },
            (error) => {              
                localStorage.setItem(fbTable, "error");
                console.error(error);
                toastr.error(error.message);
            });
    }    

    getBoardMembers(): void {       
        let fbTable = "BoardMembers";
        let databaseRef = firebase.database().ref(fbTable);
        databaseRef.once('value',
            (snapshot) => {              
                let returnedData = snapshot.val();             
                localStorage.setItem(fbTable, JSON.stringify(returnedData));
            },
            (error) => {              
                localStorage.setItem(fbTable, "error");
                console.error(error);
                toastr.error(error.message);
            });
    }

    getUnitsForSale(): void {
        let fbTable = "UnitsForSale";
        let databaseRef = firebase.database().ref(fbTable);
        databaseRef.once('value',
            (snapshot) => {
                let returnedData = snapshot.val();               
                localStorage.setItem(fbTable, JSON.stringify(returnedData));
            },
            (error) => {               
                localStorage.setItem(fbTable, "error");
                console.error(error);
                toastr.error(error.message);
            });
    }

    updateUserProfile(updatedUser: User, originalUser: User) {
        AppHelpers.BlockUI();
        firebase.database().ref("Users/" + firebase.auth().currentUser.uid).set({
            FirstName: updatedUser.firstName,
            LastName: updatedUser.lastName,
            Unit: updatedUser.unit
        })
            .then(() => {
                AppHelpers.UnblockUI();
                localStorage.setItem("userProfile", JSON.stringify(updatedUser));
                if (updatedUser.unit != originalUser.unit) {
                    var allUnits: any = JSON.parse(localStorage.getItem("allUnits"));
                    var updates = {};
                    updates["/Units/" + updatedUser.unit + "/RegisteredUsers"] = +(allUnits[updatedUser.unit].RegisteredUsers) + 1;
                    updates["/Units/" + originalUser.unit + "/RegisteredUsers"] = +(allUnits[originalUser.unit].RegisteredUsers) - 1;
                    firebase.database().ref().update(updates);
                }
                this._userProfileUpdated.emit(true);
            })
            .catch((error) => {
                AppHelpers.UnblockUI();
                toastr.error(error);
            })
    }  //updateUserProfile

    cacheAllUnits(): void {
        localStorage.removeItem("allUnits");
        firebase.database().ref('/Units').once('value')
            .then((snapshot) => {
                localStorage.setItem('allUnits', JSON.stringify(snapshot.val()))
            })
            .catch((error) => {
                toastr.error(error.message);
            })
    }

    hasUnitMaximumNumberOfUsers(unitNumber: string): boolean {
        let allUnits = JSON.parse(localStorage.getItem("allUnits"));
        return (allUnits[unitNumber].RegisteredUsers >= AppSettings.MAXIMUM_USERS_PER_UNIT);
    }

    getUserProfileUpdated(): EventEmitter<any> {
        return this._userProfileUpdated;
    }

}
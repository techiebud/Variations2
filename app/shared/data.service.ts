import {Injectable, EventEmitter} from "@angular/core";
import {User} from "./user.interface";
import {AppHelpers} from "./app.common";
import {AppSettings}  from "./app.common";
import {FirebaseService} from "./firebase.service";
import {GeneralInformation} from "./general-information.interface";
import {Management} from "./management.interface";



@Injectable()
export class DataService {
    supportsLocalStorage: boolean = false;
    generalInformation: GeneralInformation;
    management:  Management;

    private _userProfileUpdated = new EventEmitter<any>();
    private _allUnitsLoaded = new EventEmitter<any>();

    constructor(private _firebaseService: FirebaseService) {
        localStorage.clear();
        this.supportsLocalStorage = this.hasLocalStorage();
        this.getGeneralInformation();
        this.getAllUnits();
        this.getManagement();

    }


    private hasLocalStorage(): boolean {

        var uid = "testingStorage";
        var result = false;
        try {
            localStorage.setItem("uid", uid);
            result = localStorage.getItem("uid") == uid;
            localStorage.removeItem(uid);
            return result;
            //  return (result && <any>localStorage);
        } catch (exception) { }

    }

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

    getGeneralInformation(): void {
        let fbTable = "GeneralInformation";
        let databaseRef = firebase.database().ref(fbTable);
        databaseRef.once('value',
            (snapshot) => {
                let returnedData = snapshot.val();
                this.generalInformation = returnedData;
              //  console.debug(this.generalInformation.SecurityKey);
               // localStorage.setItem(fbTable, JSON.stringify(returnedData));
            },
            (error) => {
              //  localStorage.setItem(fbTable, "error");
                console.error(error);
                toastr.error(error.message);
            });
    }

     getManagement(): void {
        try {
            debugger;
            firebase.database().ref('/Management').once('value')
                .then((snapshot) => {
                  let returnedData = snapshot.val();
                  this.management = returnedData;

                })
                .catch((error) => {
                    toastr.error(error.message);
                  
                })
        }
        catch (ex) {
            toastr.error(ex);
        }
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

    getAllUnits(): void {
        try {
            localStorage.removeItem("allUnits");
            firebase.database().ref('/Units').once('value')
                .then((snapshot) => {
                
                    let allUnits: any = snapshot.val();
                   // debugger;
                    // let allUnregisteredUnits: string = "";
                    // let unregisteredUnits = 0;
                    // let registeredUnits = 0;
                    // for (var _unit in allUnits) {
                    //     var thisUnit = allUnits[_unit];
                    //     if (thisUnit.RegisteredUsers == 0)
                    //     {
                    //         unregisteredUnits++;
                    //         allUnregisteredUnits += _unit + "," + thisUnit.Owner + "~cr";

                    //     }   
                    //     else {
                    //         registeredUnits++;
                    //     }                 
                    // }
                    localStorage.setItem('allUnits', JSON.stringify(allUnits));
                    this._allUnitsLoaded.emit(true);
                })
                .catch((error) => {
                    toastr.error(error.message);
                    this._allUnitsLoaded.emit(true);
                })
        }
        catch (ex) {
            this._allUnitsLoaded.emit(true);
        }
    }

     


    getAllUsersEmail(): void {

        
        try {
            localStorage.removeItem("UserEmails");
            firebase.database().ref('/Users').once('value')
                .then((snapshot) => {
                    debugger;
                    let allUsers: any = snapshot.val();
                    let allUserEmails: string = "";
                    for (var user in allUsers) {
                        allUserEmails += allUsers[user].Email + ";";
                    
                    }
                  
                    localStorage.setItem('UserEmails', allUserEmails);
                  
                })
                .catch((error) => {
                    console.error(error);
                  
                })
        }
        catch (ex) {
            console.error(ex);
        }



    }

    hasUnitMaximumNumberOfUsers(unitNumber: string): boolean {
        let allUnits = JSON.parse(localStorage.getItem("allUnits"));
        return (allUnits[unitNumber].RegisteredUsers >= this.generalInformation.MaximumUsersPerUnit);
    }

    getAllUnitsLoaded(): EventEmitter<any> {
        return this._allUnitsLoaded;

    }
    getUserProfileUpdated(): EventEmitter<any> {
        return this._userProfileUpdated;
    }

}
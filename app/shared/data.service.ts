import { EventEmitter, Injectable } from "@angular/core";

import { AppHelpers } from "./app.common";
import { FirebaseService } from "./firebase.service";
import { GeneralInformation } from "./general-information.interface";
import { Management } from "./management.interface";
import { Resident } from "./resident.interface";
import { User } from "./user.interface";

@Injectable()
export class DataService {
    public supportsLocalStorage: boolean = false;
    public generalInformation: GeneralInformation;
    public management: Management;
    public residents: Resident;

    private _userProfileUpdated = new EventEmitter<any>();
    private _allUnitsLoaded = new EventEmitter<any>();

    constructor(private _firebaseService: FirebaseService) {
        localStorage.clear();
        this.supportsLocalStorage = this.hasLocalStorage();
        this.getGeneralInformation();
        this.getAllUnits();
        this.getManagement();
        this.getResidents();
        localStorage.removeItem("UserEmails");
        localStorage.removeItem("UserEmails2");
        /*  this.getAllUsersEmail();
         this.getAllUsersEmail2();*/
        // this.get();
    }
    private hasLocalStorage(): boolean {

        let uid = "testingStorage";
        let result = false;
        try {
            localStorage.setItem("uid", uid);
            result = localStorage.getItem("uid") === uid;
            localStorage.removeItem(uid);
            return result;
            //  return (result && <any>localStorage);
        // tslint:disable-next-line:no-empty
        } catch (exception) { }
    }

    // tslint:disable-next-line:member-access
    // tslint:disable-next-line:member-ordering
    public getAnnouncements(): void {
        let fbTable = "Announcements";
        let databaseRef = firebase.database().ref(fbTable).orderByKey();
        databaseRef.once("value",
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

    // tslint:disable-next-line:member-access
    getBoardMembers(): void {
        let fbTable = "BoardMembers";
        let databaseRef = firebase.database().ref(fbTable);
        databaseRef.once("value",
            (snapshot) => {
                let returnedData = snapshot.val();
                localStorage.setItem(fbTable, JSON.stringify(returnedData));
            },
            // tslint:disable-next-line:typedef
            (error) => {
                localStorage.setItem(fbTable, "error");
                console.error(error);
                toastr.error(error.message);
            });
    }

    getResidents(): void {
        let fbTable = "Residents";
        let databaseRef = firebase.database().ref(fbTable);
        databaseRef.once("value",
            (snapshot) => {
                let returnedData = snapshot.val();
                this.residents = returnedData;
            },
            (error) => {
                console.error(error);
                toastr.error(error.message);
            });
    }

    getGeneralInformation(): void {
        let fbTable = "GeneralInformation";
        let databaseRef = firebase.database().ref(fbTable);
        databaseRef.once("value",
            (snapshot) => {
                let returnedData = snapshot.val();
                this.generalInformation = returnedData;
                 console.debug(this.generalInformation);
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
            firebase.database().ref("/Management").once("value")
                .then((snapshot) => {
                    let returnedData = snapshot.val();
                    this.management = returnedData;
                })
                .catch((error) => {
                    toastr.error(error.message);
                });
        }
        catch (ex) {
            toastr.error(ex);
        }
    }


    getUnitsForSale(): void {
        let fbTable: string = "UnitsForSale";
        let databaseRef: any = firebase.database().ref(fbTable);
        databaseRef.once("value",
            (snapshot) => {
                let returnedData: any = snapshot.val();
                localStorage.setItem(fbTable, JSON.stringify(returnedData));
            },
            (error) => {
                localStorage.setItem(fbTable, "error");
                console.error(error);
                toastr.error(error.message);
            });
    }

    // tslint:disable-next-line:member-access
    updateUserProfile(updatedUser: User, originalUser: User) {
        AppHelpers.BlockUI();
        firebase.database().ref("Users/" + firebase.auth().currentUser.uid).set({
            FirstName: updatedUser.firstName,
            LastName: updatedUser.lastName,
            Unit: updatedUser.unit,
        })
            .then(() => {
                AppHelpers.UnblockUI();
                localStorage.setItem("userProfile", JSON.stringify(updatedUser));
                if (updatedUser.unit !== originalUser.unit) {
                    let allUnits: any = JSON.parse(localStorage.getItem("allUnits"));
                    let updates = {};
                    updates["/Units/" + updatedUser.unit + "/RegisteredUsers"] = +(allUnits[updatedUser.unit].RegisteredUsers) + 1;
                    updates["/Units/" + originalUser.unit + "/RegisteredUsers"] = +(allUnits[originalUser.unit].RegisteredUsers) - 1;
                    firebase.database().ref().update(updates);
                }
                this._userProfileUpdated.emit(true);
            })
            .catch((error: any) => {
                AppHelpers.UnblockUI();
                toastr.error(error);
            })
    }  // updateUserProfile

    // tslint:disable-next-line:member-access
    getAllUnits(): void {
        try {
            // this.getAllUsersEmail();
            localStorage.removeItem("allUnits");
            firebase.database().ref("/Units").once("value")
                .then((snapshot) => {

                    let allUnits: any = snapshot.val();
                 //   debugger;
                    let allUnregisteredUnits: string = "";
                    let unregisteredUnits = 0;
                    let registeredUnits = 0;
                    // tslint:disable-next-line:forin
                    for (let _unit in allUnits) {
                        let thisUnit = allUnits[_unit];
                        if (thisUnit.RegisteredUsers === 0)
                        // tslint:disable-next-line:one-line
                        {
                            unregisteredUnits++;
                            allUnregisteredUnits += _unit + "," + thisUnit.Owner + "~cr";

                        }
                        // tslint:disable-next-line:one-line
                        else {
                            registeredUnits++;
                        }
                    }

                    localStorage.setItem("allUnits", JSON.stringify(allUnits));
                    this._allUnitsLoaded.emit(true);
                })
                .catch((error: any) => {
                    toastr.error(error.message);
                    this._allUnitsLoaded.emit(true);
                })
        }
        // tslint:disable-next-line:one-line
        catch (ex) {
            this._allUnitsLoaded.emit(true);
        }
    }

    // tslint:disable-next-line:member-access
    getAllUsersEmail(): void {


        try {
            localStorage.removeItem("UserEmails");
            firebase.database().ref("/Users").once("value")
                .then((snapshot) => {

                    let allUsers: any = snapshot.val();
                    let allUserEmails: string = "";
                    // tslint:disable-next-line:forin
                    for (let user in allUsers) {
                        allUserEmails += allUsers[user].Email + ";";

                    }

                    localStorage.setItem("UserEmails", allUserEmails);
                    console.log("registered users");
                    console.log(allUserEmails);

                })
                .catch((error) => {
                    console.error(error);

                })
        }
        // tslint:disable-next-line:one-line
        catch (ex) {
            console.error(ex);
        }
    }

    // tslint:disable-next-line:member-access
    getAllUsersEmail2(): void {


        try {
            localStorage.removeItem("UserEmails2");
            firebase.database().ref("/Residents").once("value")
                .then((snapshot) => {

                    let allUsers: any = snapshot.val();
                    let allUserEmails: string = "";
                    // tslint:disable-next-line:forin
                    for (let user in allUsers) {
                        allUserEmails += allUsers[user].Email + ";";
                    }
                    localStorage.setItem("UserEmails2", allUserEmails);
                    console.log("directory users");
                    console.log(allUserEmails);

                })
                .catch((error) => {
                    console.error(error);

                });
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
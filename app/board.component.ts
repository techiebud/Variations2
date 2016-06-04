import {Component, OnInit} from "@angular/core";
import {BoardMember} from "./shared/board-member.interface";


declare var firebase: any;
declare var toastr: any;
const DATA_TABLE: string = "BoardMembers";



@Component({
    templateUrl: "app/board.component.html"
})

export class BoardComponent implements OnInit {
    boardMembers: Array<BoardMember> = new Array<BoardMember>();
    isLoading: boolean = true;
    isError: boolean = false;


    constructor() {

        if (!this.checkDataReady()) {
            var refreshId = setInterval(() => {
                if (this.checkDataReady()) {
                    clearInterval(refreshId);
                    this.isLoading = false;
                }
            }, 500);
        }
        else
        {
           this.isLoading = false;
        }

    }

    ngOnInit() {

        if (!localStorage.getItem(DATA_TABLE)) {
            let fbTable = "/" + DATA_TABLE;
            firebase.database().ref(fbTable).once('value',
              (snapshot) => {                    
                  let returnedData = snapshot.val();
                  localStorage.setItem(DATA_TABLE, JSON.stringify(returnedData));
               },
             (err) => {
                  this.isError = true;
                  console.error(err);                  
                  toastr.error("Permission Denied!");           
             });
        }

    }

    checkDataReady(): boolean {

        let cachedData: any = localStorage.getItem(DATA_TABLE);
        if (cachedData) {
            this.parseData(JSON.parse(cachedData));          
            return true;
        }
        return false;
    }

    parseData(data: any): void {

        this.boardMembers = []; //initialize
        let members: {} = data;
        let titles = Object.keys(members);

        for (let i: number = 0; i < titles.length; i++) {
            let title: string = titles[i];
            let boardMember: BoardMember = {
                Title: title,
                Name: members[title].Name,
                Email: members[title].Email,
                Address: members[title].Address,
                Phone: members[title].Phone,
                URL: members[title].URL,
                URLCaption: members[title].URLCaption

            }
            this.boardMembers.push(boardMember);
        }  //for loop


    }
}
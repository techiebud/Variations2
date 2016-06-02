import {Component, OnInit} from "@angular/core";
import {BoardMember} from "./shared/board-member.interface";


declare var firebase: any;
declare var toastr: any;


@Component({
    templateUrl: "app/board.component.html"
})

export class BoardComponent implements OnInit {
    boardMembers: Array<BoardMember> = new Array<BoardMember>();
    isLoading: boolean = true;

    constructor() {



    }

    ngOnInit() {

        let cachedData: any = localStorage.getItem("boardMembers");
        if (cachedData) {
            this.parseData(JSON.parse(cachedData));
            this.isLoading = false;
        }
        else {
            firebase.database().ref("/BoardMembers").once('value').then((snapshot) => {
                //todo:  Need error handling here.

                let returnedData = snapshot.val();
                localStorage.setItem("boardMembers", JSON.stringify(returnedData));
                this.parseData(returnedData);
                this.isLoading = false;
            });   //snaphot units for sale
        }



    }

    parseData(data: any): void {

        let members: {} = data;
        console.log("members: ", members);
        let titles = Object.keys(members);

        console.log("titles", titles);
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
            console.log("Loaded: " + boardMember.Name);
            this.boardMembers.push(boardMember);

        }  //for loop


    }
}
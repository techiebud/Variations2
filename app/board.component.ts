import {Component, OnInit} from "@angular/core";
import {BoardMember} from "./shared/board-member.interface";


declare var firebase: any;


@Component({
    templateUrl: "app/board.component.html"
})

export class BoardComponent implements OnInit {
       boardMembers: Array<BoardMember> = new Array<BoardMember>();
       isLoading: boolean = true;

    constructor() {       
        
          firebase.database().ref("/BoardMembers").once('value').then((snapshot) => {
            //todo:  Need error handling here.
            let members: {} = snapshot.val();
            console.log("members: ", members);
            let titles = Object.keys(members);
            
          console.log("titles", titles);
            for (let i: number = 0; i < titles.length; i++) {
                let title: string = titles[i];         
                var boardMember: BoardMember = {
                    Title: title,
                    Name:  members[title].Name,
                    Email: members[title].Email,
                    Address: members[title].Address,
                    Phone: members[title].Phone,
                    URL: members[title].URL, 
                    URLCaption: members[title].URLCaption             
                    
                }
                this.boardMembers.push(boardMember);

            }  //for loop
            this.isLoading = false;
        });   //snaphot units for sale 
     
     }

    ngOnInit() { 
        
        
        
        
        
    }
}
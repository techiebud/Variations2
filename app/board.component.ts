import {Component, OnInit} from "@angular/core";
import {BoardMember} from "./shared/board-member.interface";
import {DataService} from "./shared/data.service";

const DATA_TABLE: string = "BoardMembers";

@Component({
    templateUrl: "app/board.component.html",
})

export class BoardComponent implements OnInit {
    boardMembers: Array<BoardMember> = new Array<BoardMember>();
    isLoading: boolean = true;
    isError: boolean = false;

    constructor(private _dataService: DataService) {} 

    ngOnInit() {
        if (!this.isDataReady())
        {          
            this._dataService.getBoardMembers();
            //now watch the last firebase call to get when the data is ready.
            var refreshId = setInterval(() => {
                if (this.isDataReady() || this.isError) {
                    clearInterval(refreshId);
                    this.isLoading = false;                }
            }, 500);  //check for data every 1/2 second
        }
        else 
        {
            this.isLoading = false;
        }
    }  //ngOnInit

    isDataReady(): boolean {    
        let cachedData: any = localStorage.getItem(DATA_TABLE);        
        if (cachedData) {
            if (cachedData === "error") 
            {
                this.isError = true;
                return;
            }
            this.prepData(JSON.parse(cachedData));          
            return true;
        }
        return false;
    }  //isDataReady

    prepData(data: any): void {
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
                URLCaption: members[title].URLCaption,
                DisplayOrder: +(members[title].DisplayOrder)
            }  //boardMember
            this.boardMembers.push(boardMember);
        }  //for loop
        //FYI: I"m sorting the data here because I cannot get the data to come back sorted from Firebase;
        this.boardMembers.sort((a: BoardMember, b: BoardMember) : number => {
             return (a.DisplayOrder > b.DisplayOrder) ? 1 : (a.DisplayOrder < b.DisplayOrder) ? -1 : 0;            
        })  //sort
    } //prepData
}
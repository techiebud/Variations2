import { Component, OnInit } from "@angular/core";

import { DataService } from "./shared/data.service";
import { Resident } from "./shared/resident.interface";

declare var $: any;

@Component({
    templateUrl: "app/resident-search.component.html"
})

export class ResidentSearchComponent implements OnInit {

    residents: Resident;



    constructor(private _dataService: DataService) {
        this.residents = _dataService.residents;

    }

    ngOnInit() {
        var residentData = this.residents;
        var residentSearchTable = $('#residentSearchTable').DataTable({         
            data: residentData,
            lengthMenu: [ [10,25, 50, -1], [10, 25, 50, "All"] ],
            rowId: 'Email',
            columns: [
                { data: "LastName", title: "Last Name" },
                { data: "FirstName", title: "First Name" },
                { data: "Unit", title: "Unit", searchable: true },
                { data: "Street", title: "Street", searchable: false },
                { data: "Phone1", title: "Phone", searchable: false, orderable: false, className: "phone phone1" },
                { data: "Phone2", title: "Phone 2", searchable: false, orderable: false, className: "phone phone2" },
                { data: "Email", title: "Email", render:  function ( data, type, full, meta ) {
                    return '<a href="mailto:'+data+'">' + data + '</a>'; }
                },
            ],
            drawCallback: function (settings, json) {
                $(".phone").text(function (i, text) {               
                    var phoneNumberRegularPattern: RegExp = /(\d{3})(\d{3})(\d{4})/;
                    var phoneNumberWithExtensionPattern: RegExp =  /(\d{3})(\d{3})(\d{4})(x\d{4})/
                    if (phoneNumberWithExtensionPattern.test(text))
                    {
                       text = text.replace(phoneNumberWithExtensionPattern, "$1-$2-$3 $4");
                    }
                    else {
                          text = text.replace(phoneNumberRegularPattern, "$1-$2-$3");
                    }               
                    return text;
                });
                $(".phone1").css("width", "110px");
            }, 
            initComplete: function(settings, json) {
                $("input[type='search']").focus();

            }
        });

        residentSearchTable.on("xhr.dt", (e, settings, json) => {
            console.info(json);
        });



    }  //ngOnInit


}
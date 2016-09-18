import {Component, OnInit} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
   
} from "@angular/forms";


import {AuthService} from "./shared/auth.service";
import {DataService} from "./shared/data.service";
import {User} from "./shared/user.interface";
import {AppHelpers} from "./shared/app.common";


@Component({
    templateUrl: "app/signup.component.html"
  })
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    supportsLocalStorage: boolean = false;
    isLoading: boolean = true;
    isError: boolean = false;

    constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _dataService: DataService) {

        
            this.buildForm();
    }


    buildForm(): void {
       this.signupForm = this._formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ])],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            unit: ['', Validators.compose([
                Validators.required,
                this.isValidUnit
            ])]
        });

        this.signupForm.statusChanges.subscribe(
            (data: any) => console.log(data)
        );


    }

    ngOnInit(): any {


        this._dataService.getAllUnitsLoaded().subscribe(() => {         
            this.isLoading = false;
            this.supportsLocalStorage = this._dataService.supportsLocalStorage;
        });


        if (!this.isDataReady()) {
            var retryCount: number = 0;           
            this._dataService.getAllUnits();
            //now watch the last firebase call to get when the data is ready.
            var refreshId = setInterval(() => {
                retryCount++;               
                if (this.isDataReady() || this.isError || !this.isLoading || retryCount > 20) {
                    clearInterval(refreshId);
                    this.isLoading = false;
                }
            }, 500);  //check for data every 1/2 second
        }
        else {
            this.supportsLocalStorage = this._dataService.supportsLocalStorage;
            this.isLoading = false;
        }


    }

    isDataReady(): boolean {
        let cachedData: any = localStorage.getItem("allUnits");
        if (cachedData) {
            if (cachedData === "error") {
                this.isError = true;
                return;
            }
            return true;
        }
        return false;
    }  //isDataReady

    onSignup() {
        var user: User = this.signupForm.value;
        if (this._dataService.hasUnitMaximumNumberOfUsers(user.unit)) {
            toastr.error("The maximum number of users have already signed up for this Unit #.")
            return;
        }
        this._authService.signupUser(this.signupForm.value);
    }


    isEmail(control: FormControl): { [s: string]: boolean } {
        if (!control.value.match(/^[a-z0-9_\+-]+(\.[a-z0-9_\+-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,4})$/)) {
            return { noEmail: true };
        }
    }

    isEqualPassword(control: FormControl): { [s: string]: boolean } {
        if (!this.signupForm) {
            return { passwordsNotMatch: true };

        }
        if (control.value !== this.signupForm.controls['password'].value) {
            return { passwordsNotMatch: true };
        }
    }

    isValidUnit(control: FormControl): { [s: string]: boolean } {
        let allUnits = JSON.parse(localStorage.getItem("allUnits"));
        let unit: number = parseInt(control.value);
        const min_unit: number = 1901;
        const max_unit: number = 2112;
        let validUnit: boolean = (!isNaN(unit)) && (unit >= min_unit && unit <= max_unit);
        if (validUnit) {
            validUnit = allUnits[unit.toString()];
        }


        if (!validUnit) {
            return { unitIsInvalid: true };
        }

    }




}
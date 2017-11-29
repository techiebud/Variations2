import { AppHelpers, AppSettings } from './app.common';
import { AppComponent } from './../app.component';
import { FirebaseService } from './firebase.service';
import { Injectable } from "@angular/core";
//I'm overriding the interface here because the one installed does not come with the badge option which is used on Android devices 
//for the black and white icon on the top of the screen
interface NotificationOptions {
    body?: string;
    dir?: "auto" | "ltr" | "rtl";
    icon?: string;
    lang?: string;
    tag?: string;
    badge?: string;
    data: {};
}
@Injectable()
export class NotificationService {

    private displayConfirmNotification(): void {
        let notificationOptions: NotificationOptions = {
            body: "You have subscribed to notifications from The Variations web site.",
            icon: "/img/logo2-48x48.png",
            badge: "/img/logo2-48x48.png",
            data: {
                notifyOnly: true
            }
        };
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready
                .then((swreg) => {
                    swreg.showNotification("Notifications enabled", notificationOptions);

                })
        }
        else {
            new Notification("Notifications enabled!", notificationOptions);
            return;
        }

    }


    private configurePushSub(): void {
        //debugger;
        if (!('serviceWorker' in navigator)) {
            return;  //sorry, no can do.
        }
        let reg: ServiceWorkerRegistration;
        let newSubscription: boolean = false;
        navigator.serviceWorker.ready
            .then((swreg: ServiceWorkerRegistration) => {
                reg = swreg;
                return swreg.pushManager.getSubscription();
            })
            .then((sub: PushSubscription) => {
                //   debugger;
                if (sub === null) {
                    // Create a new subscription
                    console.log("PushSubscription (new)");
                    newSubscription = true;
                    var vapidPublicKey = 'BF1ZDvqSumSNgWPOAcWRhOz7-xXtt8boaOy6bQpjf1mEbOj1R3KXSC5Eb6FRf0wWgjq8EBM8FMI95FTR5HtlE8U';
                    var convertedVapidPublicKey = this.urlBase64ToUint8Array(vapidPublicKey);
                    return reg.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: convertedVapidPublicKey
                    });
                } else {
                    // We have a subscription, good
                }
            })
            .then((newSub: PushSubscription) => {
                // console.log("PushSubscription", JSON.stringify(newSub));
                console.log("PushSubscription (check - fetch)", newSub);
                if (newSubscription) {
                    //TODO:$$$  Change to production before deploying
                    //const subscriptionsURL = AppSettings.FIREBASE_DEVELOPMENT.databaseURL + "/Subscriptions.json";
                    const subscriptionsURL = AppSettings.FIREBASE_PRODUCTION.databaseURL + "/Subscriptions.json";
                    return fetch(subscriptionsURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(newSub)
                    })
                }
            })
            .then((res: Response) => {
                if (res) {
                    if (res.ok && newSubscription) {
                        this.displayConfirmNotification();
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }



    getPermission(): void {
        Notification.requestPermission((result) => {
            //   console.log('User Choice', result);
            if (result !== 'granted') {
               // toastr.warning("No notification permission granted!");
                console.log('No notification permission granted!');
                return;
            } else {
                //this.displayConfirmNotification();
                this.configurePushSub();

            }
        });
    }


    private urlBase64ToUint8Array(base64String: string): Uint8Array {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);

        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }






}

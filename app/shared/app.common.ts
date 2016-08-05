declare var $: any;
export class AppSettings {
    public static get FIREBASE_APP(): string { return 'https://thevariations.firebaseio.com'; }
    public static get VARIATIONS_NAME(): string { return ' The Variations Condominium Association, Inc'; }
    public static get MAXIMUM_USERS_PER_UNIT(): number { return 2; }

}

export class AppHelpers {
    public static parseDate(inputDate: string): Date {
        //Must be in yyyymmdd format.
        if (!inputDate) {
            return null;
        }
        try {
            var y: number = +(inputDate.toString().substr(0, 4)),
                m: number = +(inputDate.toString().substr(4, 2)) - 1,
                d: number = +(inputDate.toString().substr(6, 2));
            return new Date(y, m, d);
        }
        catch (err) {
            console.error(err);
            return null;
        }

    }


    public static BlockUI(message: string = "Processing.....please wait."): void {
        var blockMessage: string = '<h3><img src="img/busy.gif" /> ' + message + '</h3>';
        $.blockUI({ message: blockMessage });
    };

    public static UnblockUI() {
        $.unblockUI();

    };

    public static prepMenuElements(): void {

        var intFrameWidth = window.innerWidth;        
        //     $("div.for-regular-screens > ul").clone(false).appendTo("div.for-small-screens");
        var $liTags = $("div#var-navigation-menu li").has("a");
        if (intFrameWidth < 768) {
            $liTags.attr("data-toggle", "collapse");
            $liTags.attr("data-target", "#var-navigation-menu");
        }
        else {
            $liTags.removeAttr("data-toggle");
            $liTags.removeAttr("data-target");
        }


    }


}
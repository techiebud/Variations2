 declare var firebase: any;
 class CreateUnits {
 
  private createUnits() {
        var unitNumbers: number[];
        for (var i = 1901; i <= 1938; i++) {
            //    unitNumbers.push(i);
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Variations Drive",
                RegisteredUsers: 0,
                Owner: "unknown"

            });
        }
        for (var i = 1939; i <= 1949; i = i + 2) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Variations Drive",
                RegisteredUsers: 0,
                Owner: "unknown"

            });
        }
        for (var i = 1958; i <= 1960; i = i + 2) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Variations Drive",
                RegisteredUsers: 0,
                Owner: "unknown"

            });
        }
        for (var i = 1961; i <= 1978; i++) {
            //    unitNumbers.push(i);
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Variations Drive",
                RegisteredUsers: 0,
                Owner: "unknown"

            });
        }
        for (var i = 1980; i <= 2000; i = i + 2) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Variations Drive",
                RegisteredUsers: 0,
                Owner: "unknown"

            });
        }
        for (var i = 2001; i <= 2017; i++) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Variations Drive",
                RegisteredUsers: 0,
                Owner: "unknown"

            });
        }
        for (var i = 2051; i <= 2060; i++) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Clairmeade Way",
                RegisteredUsers: 0,
                Owner: "unknown"

            });
        }
        for (var i = 2070; i <= 2080; i++) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Clairmeade Valley Road",
                RegisteredUsers: 0,
                Owner: "unknown"
            });
        }
        for (var i = 2081; i <= 2085; i = i + 2) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Clairmeade Valley Road",
                RegisteredUsers: 0,
                Owner: "unknown"
            });
        }
        for (var i = 2097; i <= 2099; i = i + 2) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Clairmeade Valley Road",
                RegisteredUsers: 0,
                Owner: "unknown"
            });
        }
        for (var i = 2100; i <= 2112; i++) {
            console.log("Unit", i);
            firebase.database().ref("Units/" + i).set({
                Street: "Clairmeade Valley Road",
                RegisteredUsers: 0,
                Owner: "unknown"
            });
        }





    }
 }
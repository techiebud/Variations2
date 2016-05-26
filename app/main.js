"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require("./app.component");
var router_deprecated_1 = require("@angular/router-deprecated");
var http_1 = require("@angular/http");
var auth_service_1 = require("./shared/auth.service");
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [router_deprecated_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, auth_service_1.AuthService])
    .then(function (success) { return console.log("Bootstrap success"); })
    .catch(function (error) { return console.log(error); });
//# sourceMappingURL=main.js.map
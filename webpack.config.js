module.exports = {
    entry: ["./js/bootstrap.js", 
    "./node_modules/core-js/client/shim.min.js", 
    "./node_modules/zone.js/dist/zone.js",
    "./node_modules/reflect-metadata/Reflect.js","./app/main.js"],
    output:  {
        filename: "public/app.bundle.js"        
    }    
        
}
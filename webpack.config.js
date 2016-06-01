module.exports = {
    entry: [
    "./node_modules/core-js/client/shim.min.js", 
    "./node_modules/zone.js/dist/zone.js",
    "./node_modules/reflect-metadata/Reflect.js",   
    "./node_modules/bootstrap/dist/js/bootstrap.js",
    "./js/main.js"],
    output:  {
        filename: "public/app.bundle.js"        
    }    
        
}
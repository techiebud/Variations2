/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  // map tells the System loader where to look for things
  var map = {
    'app': 'js', // 'dist',
       // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/router/upgrade': 'npm:@angular/router/bundles/router-upgrade.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      '@angular/upgrade/static': 'npm:@angular/upgrade/bundles/upgrade-static.umd.js',
     // other libraries
    'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
    'angular2-cookie': 'node_modules/angular2-cookie', 
    'crypto-js': 'node_modules/crypto-js',
     'ng2-pdf-viewer': 'node_modules/ng2-pdf-viewer',
    'pdfjs-dist': 'node_modules/pdfjs-dist'
  
  }; 
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { main: 'main.js', defaultExtension: 'js' },
    'angular2-cookie': { main: 'core.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    'ng2-pdf-viewer': { main: 'dist/index.js', defaultExtension: 'js' },
    'pdfjs-dist': { defaultExtension: 'js' }
  };

    
  var config = {
    paths: {
      // paths serve as alias
         'npm:': 'node_modules/'
    },
    map: map,  
    packages: packages
  };
  System.config(config);
  System.import('app').catch(function (err) { console.error(err); });
})(this);

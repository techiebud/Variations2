self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing Service Worker ...', event);  
  });
  
  self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activating Service Worker ....', event);    
    return self.clients.claim();
  });

   self.addEventListener('fetch', function (event) {
   // console.log('[Service Worker] Fetch ....', event);    
   

  });

  self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event.notification.tag);
    event.notification.close();
  });

  
  self.addEventListener('notificationclose', function(event) {
    console.log('On notification close: ', event);
    event.notification.close();
  });
  
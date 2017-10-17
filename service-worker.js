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
  self.addEventListener('push', function(event) {
    console.log('Push Notification received', event);
  
    var data = {title: 'New!', content: 'Something new happened!'};
  
    if (event.data) {
      data = JSON.parse(event.data.text());
    }

    var options = {
      body: data.content,
      icon: "/img/logo2-48x48.png",
      badge: "/img/logo2-48x48.png"
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  });
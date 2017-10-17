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

self.addEventListener('notificationclick', function (event) {
  console.log('On notification click: ', event);

  let url = 'https://variationscondos.com';
  url = "http://localhost:3000";
  let urlSignin = "https://variationscondos.com/signin";
  event.notification.close(); // Android needs explicit close.
  if (!event.notification.data.notifyOnly)
  {
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        console.log("client", client);
        // If so, just focus it.
        if (client.url.startsWith(url) && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(urlSignin);
      }
    })
  );
};
});
self.addEventListener('notificationclose', function (event) {
  console.log('On notification close: ', event);
  event.notification.close();
});
self.addEventListener('push', function (event) {
  console.log('Push Notification received', event);

  var data = { title: 'New!', content: 'Something new happened!', notifyOnly: true };

  if (event.data) {
    data = JSON.parse(event.data.text());
  }

  optionData = {};
  if ('notifyOnly' in data)
  {
    optionData = {notifyOnly: true};
  }

  var options = {
    body: data.content,
    icon: "/img/logo2-48x48.png",
    badge: "/img/logo2-48x48.png",
    data: optionData
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
});
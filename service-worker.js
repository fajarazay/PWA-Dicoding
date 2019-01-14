const CACHE_NAME = "pwasepakbola";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/detailtim.html",
    "/detailplayer.html",
    "/detailmatch.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/pages/favorit.html",
    "/pages/home.html",
    "/pages/matches.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/api.js",
    "/js/indexeddb.js",
    "/js/database.js",
    "/js/idb.js",
    "/js/matches.js",
    "/js/matchFav.js",
    "/js/playerFav.js",
    "/js/standings.js",
    "/js/teamFav.js",
    "/js/teams.js",
    "/js/helper.js",
    "/image/notif.png",
    "/icon.png"
];

///Menyimpan Aset ke Cache
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

///Menyimpan Cache Secara Dinamis
self.addEventListener("fetch", function (event) {
    var base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true
            }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

///Menghapus Cache Lama
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

//siapkan dulu service worker untuk menerima datanya
self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'image/notif.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
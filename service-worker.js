const CACHE_NAME = "pwaprofilekotaserang";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/geografis.html",
    "/pages/universitas.html",
    "/pages/about.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/image/logo_untirta.png",
    "/image/logo_unsera.png",
    "/image/logo_uin_banten.png",
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

///Menggunakan Aset dari Cache
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
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
const CACHE_NAME = "raul_cache_PWA";

var urlsToCache = [
    "./",
    "./img/m.jpg",
    "./img/m16x16.jpg",
    "./img/m32x32.jpg",
    "./img/m64x64.jpg",
    "./img/m96x96.jpg",
    "./img/m128x128.jpg",
    "./img/m144x144.jpg",
    "./img/m192x192.jpg",
    "./img/m256x256.jpg",
    "./img/m384x384.jpg",
    "./img/m512x512.jpg",
    "./img/m1024x1024.jpg",
    "./index.html",
    "./main.js",
    "./manifest.json",
    "./sw.js"
];

// Evento install: Guarda en caché los recursos definidos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(async cache => {
            await cache.addAll(urlsToCache);
            self.skipWaiting();
        })
        .catch(err => console.log('No se ha registrado la cache', err))
    );
});

// Evento activate: Elimina cachés antiguas
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhiteList.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            self.clients.claim();
        })
    );
});

// Evento fetch: Responde con recursos en caché o los busca en la red
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                return res;
            }
            return fetch(e.request);
        })
    );
});


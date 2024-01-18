const CACHE_NAME = 'my-pwa-cache-v3'; // Ändere die Versionsnummer
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/app.js',
    '/icon.png'
];

// Installation des Service Workers
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching app shell');
                return cache.addAll(urlsToCache);
            })
    );
});

// Aktivierung des Service Workers
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch-Ereignis für den Service Worker
self.addEventListener('fetch', (event) => {
    console.log('Service Worker fetching...');

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

// Neuinstallation des Service Workers
self.addEventListener('install', (event) => {
    console.log('New Service Worker installed.');

    // Aktivierung des neuen Service Workers
    event.waitUntil(
        self.skipWaiting()
            .then(() => {
                console.log('New Service Worker activating...');
                return self.clients.claim();
            })
    );
});

// Aktivierung des Service Workers
self.addEventListener('activate', (event) => {
    console.log('New Service Worker activated.');
});

const cacheName = 'tasker-pwa-v18.1';

const htmlFiles = [
  '/index.html',
];

const cssFiles = [
  '/style/style.css',
  '/style/componentStyle.css',
];

const jsFiles = [
  './js/script.js'
];

const assetsFiles = [
  '/assets/Imgens telas/icons/calculator-fill.svg',
  '/assets/Imgens telas/icons/person-lines-fill.svg',
  '/assets/Imgens telas/icons/plus-circle-fill.svg',
  '/assets/Imgens telas/icons/save.svg',
  '/assets/Imgens telas/icons/wallet2.svg',
  '/assets/Imgens telas/carteiraVazia.png',
  '/assets/Imgens telas/Icone_Contas_Pagas_ok.png',
];

const pathsToCache = [
    '/',
    '/manifest.webmanifest',
    ...htmlFiles,
    ...cssFiles,
    ...jsFiles,
    ...assetsFiles,
  ];
  
  self.addEventListener('install', (e) => {
    caches.open(cacheName).then((cache) => cache.addAll(pathsToCache));
  });
  
  self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.open(cacheName).then((cache) => {
        return cache.match(e.request).then((resp) => {
          // Request found in current cache, or fetch the file
          return (
            resp ||
            fetch(e.request)
              .then((response) => {
                // Cache the newly fetched file for next time
                cache.put(e.request, response.clone());
                return response;
                // Fetch failed, user is offline
              })
              .catch(() => {
                // Look in the whole cache to load a fallback version of the file
                return caches.match(e.request).then((fallback) => {
                  return fallback;
                });
              })
          );
        });
      }),
    );
  });
  
  self.addEventListener('activate', (e) => {
    e.waitUntil(
      caches
        .keys()
        .then((keyList) =>
          Promise.all(
            keyList.map((key) =>
              key != cacheName ? caches.delete(key) : Promise.resolve(),
            ),
          ),
        ),
    );
  });
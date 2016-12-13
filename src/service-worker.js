const CACHE_VERSION = 1;
const CURRENT_CACHES = {
  'read-through': 'read-through-cache-v' + CACHE_VERSION
};

self.addEventListener('activate', (event) => {
  const expectedCacheNames = Object.keys(CURRENT_CACHES).map((key) => {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            // If this cache name isn't present in the array of "expected" cache names, then delete it.
            console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {

  event.respondWith(
    caches.open(CURRENT_CACHES['read-through']).then((cache) => {
      return cache.match(event.request).then((response) => {
        if (response) {
          return response;
        }

        console.log(' No response for %s found in cache. ' +
          'About to fetch from network...', event.request.url);

        return fetch(event.request.clone()).then((response) => {

          if (response.status < 400 && response.type === 'basic') {
            cache.put(event.request, response.clone());
          }

          return response;
        });
      }).catch((error) => {
        console.error('  Read-through caching failed:', error);

        throw error;
      });
    })
  );
});
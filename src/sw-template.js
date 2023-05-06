/* eslint-disable no-undef */
importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
  );

workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );
workbox.loadModule('workbox-background-sync')


const { registerRoute } = workbox.routing;
const { CacheFirst , NetworkFirst , NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;


const cacheNetworkFirst = [
    '/api/auth/renew',
    '/api/events',
]

const cacheFirst = [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
]

//* manejamos los NetworkFirst
registerRoute(
    ({ request , url })=>{
        if( cacheNetworkFirst.includes(url.pathname ) )  return true; //* si en las urls esta incluida el pathname del request 
        return false; //* si no esta devolvemos falso
    },
    new NetworkFirst()
)
//* manejamos los CacheFirst
registerRoute(
    ({ request , url })=>{
        if( cacheFirst.includes(url.href ) )  return true; //* si en las href esta incluida el pathname del request 
        return false; //* si no esta devolvemos falso
    },
    new CacheFirst()
)

// Posteos Offline 

const bgSyncPlugin = new BackgroundSyncPlugin('cola-offline', {
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
});

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('sync', (event) => {
    if (event.tag === 'cola-offline') {
      event.waitUntil(
        workbox.backgroundSync
          .popQueue('cola-offline')
          .then(() => console.log('Event synced successfully!'))
          .catch(() => console.log('Event sync failed. Retrying...'))
      );
    }
  });

registerRoute(
    new RegExp('http://localhost:4000/api/events'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'POST'
)

registerRoute(
    new RegExp('http://localhost:4000/api/events'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'PUT'
)

registerRoute(
    new RegExp('http://localhost:4000/api/events'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'DELETE'
)
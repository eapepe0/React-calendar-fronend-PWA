/* eslint-disable no-undef */
importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
  );

workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );
// sw.js
const CACHE_NAME = 'box-calc-v1.6'; // 每次更新代码时手动改这个版本号

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // 立即激活新版
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // 删除旧缓存
          }
        })
      );
    }).then(() => self.clients.claim()) // 立即控制所有页面
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      // 网络优先策略：先请求网络，失败再用缓存
      return fetch(event.request).catch(() => cached);
    })
  );
});
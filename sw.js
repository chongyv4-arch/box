// sw.js
const CACHE = 'box-v1';
const FILES = [
  '/index.html',
  '/manifest.json',
  '/sw.js'      // 把自己也缓存
];

// 安装时一次性把核心文件写进缓存
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
});

// 离线时先读缓存，没命中才走网络
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );

});

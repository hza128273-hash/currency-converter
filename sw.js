const CACHE_NAME = 'currency-converter-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// تنزيل الملفات وتخزينها عند تثبيت التطبيق
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// جلب الملفات من التخزين المحلي إذا لم يكن هناك إنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف في الذاكرة المخبأة، يعيده. وإلا يطلبه من الإنترنت
        return response || fetch(event.request);
      })
  );
});
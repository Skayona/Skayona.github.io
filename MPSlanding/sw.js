self.addEventListener('install', function(event) {

	event.waitUntil(
		caches.open('static').then(function(cache) {
			// return cache.addAll([
			// 	'/img/logo.svg',
			// 	'/img/favicon.png',
			// 	'/js/script.min.js',
			// 	'/css/style.min.css',
			// 	'/fonts/iconfont/iconfont.svg'
			// ])
			return cache.addAll([
				'/MPSlanding/img/logo.svg',
				'/MPSlanding/img/favicon.png',
				'/MPSlanding/js/script.min.js',
				'/MPSlanding/css/style.min.css',
				'/MPSlanding/fonts/iconfont/iconfont.svg'
			])
		})
	)
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) {
				return response;
			}
			return fetch(event.request);
		})
	)
});
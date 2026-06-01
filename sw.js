const CACHE = "golden-wok-mvp-v1";
const ASSETS = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.json",
  "assets/ramen-paitan.jpg",
  "assets/ramen-miso.jpg",
  "assets/ramen-shoyu.jpg",
  "assets/ramen-vegan.jpg",
  "assets/poke.png",
  "assets/poke-salmon.jpg",
  "assets/poke-tuna.jpg",
  "assets/poke-vegan.jpg",
  "assets/poke-shrimp.jpg",
  "assets/kids-kanom-krok.jpg",
  "assets/kids-kanom-tokyo.jpg",
  "assets/kids-fruit-shakes.jpg",
  "assets/kids-corn-dog.jpg",
  "assets/wok-chicken.jpg",
  "assets/wok-beef.jpg",
  "assets/wok-shrimp.jpg",
  "assets/wok-vegan.jpg",
  "assets/golden-wok-logo-160.png",
  "assets/golden-wok-logo-420.png",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request).then(found => found || fetch(event.request)));
});

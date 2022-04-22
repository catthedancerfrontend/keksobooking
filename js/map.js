const TOKYO = {
  lat: 35.68173,
  lng: 139.75393,
};

const map = L.map('map-canvas')
  .setView({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const pinIcoMain = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const markerMain = L.marker(
  {
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  },
  {
    draggable: true,
    icon: pinIcoMain,
  },
);

markerMain.addTo(map);

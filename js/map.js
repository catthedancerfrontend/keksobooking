import { offers } from './data.js';
import { renderPopup } from './ad-popup.js';

const address = document.querySelector('#address');

const TOKYO_COORDINATES = {
  lat: 35.68173,
  lng: 139.75393,
};

const map = L.map('map-canvas')
  .setView({
    lat: TOKYO_COORDINATES.lat,
    lng: TOKYO_COORDINATES.lng,
  }, 12);

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

const pinIconOrdinary = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerMain = L.marker(
  {
    lat: TOKYO_COORDINATES.lat,
    lng: TOKYO_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: pinIcoMain,
  },
);

const setAddress = (value) => {
  address.value = value;
};

setAddress(`${TOKYO_COORDINATES.lat}, ${TOKYO_COORDINATES.lng}`);

markerMain.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  setAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
});
markerMain.addTo(map);

offers.forEach((offer) => {
  const {lat, lng} = offer.location;
  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon:pinIconOrdinary,
  });
  marker
    .addTo(map)
    .bindPopup(renderPopup(offer));
});


import { getOffers } from './data.js';
import { renderMarkers, clearMarkers } from './map.js';
import { debounce } from './util.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');
const conditionerCheckbox = mapFilters.querySelector('#filter-conditioner');
const elevatorCheckbox = mapFilters.querySelector('#filter-elevator')
const washerCheckbox = mapFilters.querySelector('#filter-washer')
const parkingCheckbox = mapFilters.querySelector('#filter-parking')
const dishwasherCheckbox = mapFilters.querySelector('#filter-dishwasher')
const wifiCheckbox = mapFilters.querySelector('#filter-wifi')

const options = [
  housingType,
  housingPrice,
  housingRooms,
  housingGuests,
  conditionerCheckbox,
  elevatorCheckbox,
  washerCheckbox,
  parkingCheckbox,
  dishwasherCheckbox,
  wifiCheckbox,
];

const DEFAULT_VALUE = 'any';
const PRICE_LOWEST = 10000;
const PRICE_HIGHEST = 50000;
const PRICE_RANGE = 'middle';
const PRICE_LOW = 'low';
const PRICE_HIGH = 'high';
const MAX_MARKERS = 10;

const filterByType = (offer) => housingType.value === offer.type || housingType.value === DEFAULT_VALUE;

const filterByPrice = (offer) => {
  if (housingPrice.value === DEFAULT_VALUE) {
    return 1;
  }
  if (housingPrice.value === PRICE_RANGE) {
    return offer.price >= PRICE_LOWEST && offer.price < PRICE_HIGHEST;
  }
  if (housingPrice.value === PRICE_LOW) {
    return offer.price < PRICE_LOWEST;
  }
  if (housingPrice.value === PRICE_HIGH) {
    return offer.price >= PRICE_HIGHEST;
  }
};

const filterByRooms = (offer) => parseInt(housingRooms.value, 10) === offer.rooms || housingRooms.value === DEFAULT_VALUE;

const filterByGuests = (offer) => parseInt(housingGuests.value, 10) === offer.guests || housingGuests.value === DEFAULT_VALUE;

const getFeaturesRank = (offer) => {
  const checkedFeatures = housingFeatures.querySelectorAll('[type="checkbox"]:checked');

  if(!checkedFeatures.length) {
    return true;
  }

  let rank = 0;

  if (!offer.features) {
    return rank;
  }

  for (let i = 0; i < checkedFeatures.length; i++) {
    if (offer.features.includes(checkedFeatures[i].value)) {
      rank++;
    } else {
      rank = 0;
      break;
    }
  }

  return rank;
};

const filterByFeatures = (offer) => getFeaturesRank(offer);

const compareOffers = (offerA, offerB) => {
  const rankA = getFeaturesRank(offerA);
  const rankB = getFeaturesRank(offerB);

  return rankB - rankA;
};

const filter = (offers) => offers.filter(({offer}) => filterByType(offer) && filterByRooms(offer) && filterByGuests(offer) && filterByPrice(offer) && filterByFeatures(offer))
  .sort(compareOffers);

options.forEach((option) => {
  option.addEventListener('change', debounce(() => {
    const filteredOffers = filter(getOffers());
    clearMarkers();
    renderMarkers(filteredOffers.slice(0, MAX_MARKERS));
  }));
});

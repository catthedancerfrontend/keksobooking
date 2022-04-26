import { getOffers } from './data.js';
import { renderMarkers, clearMarkers } from './map.js';
import { debounce } from './util.js';
import { PriceType } from './form-properties.js';

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

const filterElements = [
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
const MAX_MARKERS = 10;

const filterByType = (offer) => housingType.value === offer.type || housingType.value === DEFAULT_VALUE;

const filterByPrice = (offer) => {
  switch (housingPrice.value) {
    case DEFAULT_VALUE:
      return 1;
    case PriceType.MIDDLE:
      return offer.price >= PriceType.LOWEST && offer.price < PriceType.HIGHEST;
    case PriceType.LOW:
      return offer.price < PriceType.LOWEST;
    case PriceType.HIGH:
      return offer.price >= PriceType.HIGHEST;
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
      continue;
    }
    rank = 0;
    break;
  }

  return rank;
};

const filterByFeatures = (offer) => getFeaturesRank(offer);

const compareOffers = (offerA, offerB) => {
  const rankA = getFeaturesRank(offerA);
  const rankB = getFeaturesRank(offerB);

  return rankB - rankA;
};

const filter = (offers) => offers.filter(({offer}) =>
  filterByType(offer)
  && filterByRooms(offer)
  && filterByGuests(offer)
  && filterByPrice(offer)
  && filterByFeatures(offer))
  .sort(compareOffers);

filterElements.forEach((element) => {
  element.addEventListener('change', debounce(() => {
    const filteredOffers = filter(getOffers());
    clearMarkers();
    renderMarkers(filteredOffers.slice(0, MAX_MARKERS));
  }));
});

const resetMapFilterForm = () => {
  mapFilters.reset();
};

export { resetMapFilterForm };

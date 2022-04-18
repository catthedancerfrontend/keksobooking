import { getRandomNumber, getRandomObjectArray, getRandomArrayElement, getArrayFrom } from './util.js'

const MIN_VALUE = 1;
const MAX_VALUE = 10;
const MIN_PRICE = 100;
const MAX_PRICE = 1000;
const MAX_FEATURES = 6;
const OFFERS_COUNT = 10;
const LAT_MIN = 35.65000;
const LAT_MAX = 35.70001;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80001;
let photoId = 0;


const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECK_IN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECK_OUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const TITLE = [
  'Super House',
  'Black Lake Cabin',
  'Radcliff Refuge',
  'Rockaway beach Villa',
  'The Red Bungalow of Deerfield',
  'The Retreat On Lansdale',
  'The Inn at Shorewood Township',
  'Chez Christopher’s',
  'Danielle’s Boutique Inn',
  'The Easy in Brooklyn',
  'The Tired Traveler Inn',
  'The Darling North Sanctuary!',
  'The Brooklyn Penthouse',
  'East Shore Hideaway',
  'Chinatown Artist Loft',
  'The Sunset',
  'The Iconic Allen Street Clubhouse',
];

const DESCRIPTION = [
  'Spacious Large Private Room By Park Avenue',
  'Big Master bed with private bath near Miami Beach',
  'Cozy Private Room for Rent with Beautiful view',
  'Beautiful loft in Los Angeles, minutes to downtown',
  'Bedroom w/ private bath in brand new luxury home',
  'Private Room with Amazing Views in heart of NYC',
  'Beautiful House in West Tampa, Private Entrance',
  'Charming and bright Minnesota apt- fast Wi-Fi!',
  'Wonderful apartment in the city, close to subway',
  'Spacious  Sunnyside studio w/ amazing view',
  'Spacious guest suite with separate entrance',
  'Home in the historic district, next to museums',
  'Cozy bedroom in convenient location downtown',
  'Bright Brooklyn apartment with a garden view',
  'Spacious studio apartment to work remote from',
  'Bright apartment close to French Quarter',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomFeatureArrayElement = () => (getRandomArrayElement(FEATURES));

const getRandomPhotoArrayElement = () => (getRandomArrayElement(PHOTOS));

const getRandomPhotoId = () => {
  ++photoId;
  return (photoId < 10) ? photoId = `0${photoId}` : photoId;  
};

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getRandomOfferObject = () => ({
  author: {
    avatar: `img/avatars/user${getRandomPhotoId()}.png`
  },
  offer: {
    title: getRandomArrayElement(TITLE),
    adress: `${location.lat}, ${location.lng}`,
    price: getRandomNumber(MIN_PRICE, MAX_PRICE),
    type: getRandomArrayElement(TYPE),
    rooms: getRandomNumber(MIN_VALUE, MAX_VALUE),
    guests: getRandomNumber(MIN_VALUE, MAX_VALUE),
    checkin: getRandomArrayElement(CHECK_IN),
    checkout: getRandomArrayElement(CHECK_OUT),
    features: getArrayFrom(getRandomNumber(1, MAX_FEATURES), getRandomFeatureArrayElement),
    description: getRandomArrayElement(DESCRIPTION),
    photos: getArrayFrom(getRandomNumber(MIN_VALUE, MAX_VALUE), getRandomPhotoArrayElement),
  },
  location: {
    lat: parseFloat(getRandomArbitrary(LAT_MIN, LAT_MAX).toFixed(5)),
    lng: parseFloat(getRandomArbitrary(LNG_MIN, LNG_MAX).toFixed(5)),
  },
});

const offers = getRandomObjectArray(OFFERS_COUNT, getRandomOfferObject);

console.log(offers);
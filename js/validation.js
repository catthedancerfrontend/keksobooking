import { minPrice, roomOptions } from './form-properties.js';

const formElement = document.querySelector('.ad-form');
const title = formElement.querySelector('#title');
const pricePerNight = formElement.querySelector('#price');
const propertyType = formElement.querySelector('#type');
const roomsAmount = formElement.querySelector('#room_number');
const propertyCapacity = formElement.querySelector('#capacity');
const submitButton = formElement.querySelector('.ad-form__submit');
const checkIn = formElement.querySelector('#timein');
const checkOut = formElement.querySelector('#timeout');
const MAX_VALUE = 100000;
const MAX_LENGTH = 100;
const MIN_LENGTH = 30;
const DEFAULT_PRICE = 1000;

const formPristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text',
});

const validateTitleField = (value) => (value.length >= MIN_LENGTH && value.length <= MAX_LENGTH);

const validatePriceField = (value) => (value >= minPrice[propertyType.value] && value <= MAX_VALUE);

const getPriceErrorMessage = () => `Минимальная цена ${minPrice[propertyType.value] || DEFAULT_PRICE}, максимальная цена ${MAX_VALUE}`;

const validateAmountOfGuests =() => (roomOptions[roomsAmount.value].includes(propertyCapacity.value));

const syncTime = (value) => {
  checkOut.value = value;
  checkIn.value = value;
};

formPristine.addValidator(
  title,
  validateTitleField,
  'От 30 до 100 символов.',
);

formPristine.addValidator(
  pricePerNight,
  validatePriceField,
  getPriceErrorMessage,
);

formPristine.addValidator(
  roomsAmount,
  validateAmountOfGuests,
  'Количество гостей не подходит по параметрам!',
);

formPristine.addValidator(
  propertyCapacity,
  validateAmountOfGuests,
  'Количество гостей не подходит по параметрам!',
);

propertyType.addEventListener('change', () => {
  pricePerNight.value && formPristine.validate(pricePerNight);
});

[propertyCapacity, roomsAmount].forEach((element) => {
  element.addEventListener('change', () => {
    propertyCapacity.value && formPristine.validate(propertyCapacity);
    roomsAmount.value && formPristine.validate(roomsAmount);
  });
});

submitButton.addEventListener('submit', (evt) => {
  if (!formPristine.validate()) {
    evt.preventDefault();
  }
});

checkIn.addEventListener('click', () => {
  syncTime(checkIn.value);
});

checkOut.addEventListener('click', () => {
  syncTime(checkOut.value);
});

export { formPristine };

const formElement = document.querySelector('.ad-form');
const title = formElement.querySelector('#title');
const pricePerNight = formElement.querySelector('#price');
const propertyType = formElement.querySelector('#type');
const MAX_VALUE = 100000;
const roomsAmount = formElement.querySelector('#room_number');
const propertyCapacity = formElement.querySelector('#capacity');
const submitButton = formElement.querySelector('.ad-form__submit');
const checkIn = formElement.querySelector('#timein');
const checkOut = formElement.querySelector('#timeout');

const formPristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text',
});

const PropertyTypes = {
  bungalow: 'bungalow',
  flat: 'flat',
  hotel: 'hotel',
  house: 'house',
  palace: 'palace',
};

const minPrice = {
  [PropertyTypes.bungalow]: 0,
  [PropertyTypes.flat]: 1000,
  [PropertyTypes.hotel]: 3000,
  [PropertyTypes.house]: 5000,
  [PropertyTypes.palace]: 10000,
};

const roomOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const validateTitleField = (value) => (value.length >= 30 && value.length <= 100);

const validatePriceField = (value) => (value >= minPrice[propertyType.value] && value <= MAX_VALUE);

const getPriceErrorMessage = () => `Минимальная цена ${minPrice[propertyType.value]}, максимальная цена ${MAX_VALUE}`;

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

propertyCapacity.addEventListener('change', () => {
  propertyCapacity.value && formPristine.validate(propertyCapacity);
});

roomsAmount.addEventListener('change', () => {
  roomsAmount.value && formPristine.validate(roomsAmount);
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

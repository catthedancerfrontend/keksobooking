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

const HousingType = {
  [PropertyTypes.bungalow]: 'Бунгало',
  [PropertyTypes.flat]: 'Квартира',
  [PropertyTypes.hotel]: 'Отель',
  [PropertyTypes.house]: 'Дом',
  [PropertyTypes.palace]: 'Дворец',
};

const Rooms = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  HUNDRED: '100',
};

const roomOptions = {
  [Rooms.ONE]: ['1'],
  [Rooms.TWO]: ['1', '2'],
  [Rooms.THREE]: ['1', '2', '3'],
  [Rooms.HUNDRED]: ['0'],
};

const PriceType = {
  LOW: 'low',
  HIGH: 'high',
  MIDDLE: 'middle',
  LOWEST: 10000,
  HIGHEST: 50000,
};

export { minPrice, roomOptions, HousingType, PropertyTypes, PriceType };

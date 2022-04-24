const getRandomNumber = function (from, to) {
  if (from < 0 || to <= from) {
    throw new Error('Неверный параметр!');
  }
  return Math.floor(Math.random() * (Math.floor(to) - Math.ceil(from) + 1) + Math.ceil(from));
};

const isValidLength = (str, maxLength) => str.length <= maxLength;

const getRandomObjectArray = (count, callback) => Array.from({length: count}, callback);

const getArrayFrom = (count, callback) => Array.from({length: count}, callback);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomNumber, isValidLength, getRandomObjectArray, getRandomArrayElement, getArrayFrom, isEscapeKey };

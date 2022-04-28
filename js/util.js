const getRandomNumber = function (from, to) {
  if (from < 0 || to <= from) {
    throw new Error('Неверный параметр!');
  }
  return Math.floor(Math.random() * (Math.floor(to) - Math.ceil(from) + 1) + Math.ceil(from));
};

const getRandomObjectArray = (count, callback) => Array.from({length: count}, callback);

const getArrayFrom = (count, callback) => Array.from({length: count}, callback);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    timeoutDelay;
  };
}

export { getRandomNumber, getRandomObjectArray, getRandomArrayElement, getArrayFrom, isEscapeKey, debounce };

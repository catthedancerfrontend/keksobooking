import { showAlert } from './alert.js';
import { setOffers } from './data.js';

const GET_URL = 'https://25.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://25.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(
    GET_URL,
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((offers) => {
      onSuccess(offers);
      setOffers(offers);
    })
    .catch((err) => {
      onFail(err);
      showAlert(err);
    });
};

const sendData = (data, onSuccess, onError) => {
  fetch(
    POST_URL,
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      response.ok ? onSuccess() : onError('Не удалось отправить форму. Попробуйте ещё раз');
    })
    .catch((err) => {
      onError(err);
    });
};

export { getData, sendData };

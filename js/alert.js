import { isEscapeKey } from './util.js';

const successPopup = document.querySelector('#success').content.querySelector('.success');
const errorPopup = document.querySelector('#error').content.querySelector('.error');

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '24px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#8B0000';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showMessage = (messageTemplate) => {
  const message = messageTemplate.cloneNode(true);

  const onEscKey = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeMessage();
    }
  };

  const removeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onEscKey);
  };

  message.addEventListener('click', () => removeMessage(message));
  document.addEventListener('keydown', onEscKey);
  document.body.append(message);
};

const showSuccessMessage = () => showMessage(successPopup);
const showFailMessage = () => showMessage(errorPopup);

export { showAlert, showSuccessMessage, showFailMessage };

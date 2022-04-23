import { formPristine } from './validation.js';
import { sendData } from './api.js';
import { showAlert } from './alert.js';
import { resetMap } from './map.js';
import { resetSlider } from './slider-element.js';
import { showSuccessMessage, showFailMessage } from './alert.js';

const formElement = document.querySelector('.ad-form');
const formFieldsets = formElement.querySelectorAll('fieldset');
const submitButton = formElement.querySelector('.ad-form__submit');
const resetButton = formElement.querySelector('.ad-form__reset');

const setFormDisabledState = (isDisabled) => {
  isDisabled
    ? formElement.classList.add('ad-form--disabled')
    : formElement.classList.remove('ad-form--disabled');

  formFieldsets.forEach((fieldset) => (fieldset.disabled = isDisabled));
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const blockResetButton = () => {
  resetButton.disabled = true;
};

const unblockResetButton = () => {
  resetButton.disabled = false;
};

setFormDisabledState(true);

const resetForm = () => {
  formElement.reset();
  resetMap();
  resetSlider();
  // reset map filters
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});


formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = formPristine.validate();
  if (isValid) {
    blockSubmitButton();
    blockResetButton();
    sendData(
      new FormData(evt.target),
      () => {
        showSuccessMessage();
        unblockSubmitButton();
        unblockResetButton();
        formPristine.reset();
        resetForm();
      },
      () => {
        showAlert('Не удалось отправить форму. Попробуйте ещё раз');
        unblockSubmitButton();
        unblockResetButton();
        showFailMessage();
      },
    );
  }
});

document.addEventListener('keypress', (evt) => {
  if (evt.key === 'Enter') { // use isEscKey function
    evt.preventDefault();
  }
});

setTimeout(() => setFormDisabledState(false), 50);

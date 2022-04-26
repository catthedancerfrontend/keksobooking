import { formPristine } from './validation.js';
import { sendData } from './api.js';
import { resetMap } from './map.js';
import { resetSlider } from './slider-element.js';
import { showSuccessMessage, showFailMessage, showAlert } from './alert.js';
import { isEscapeKey } from './util.js';
import { resetMapFilterForm } from './map-filters.js';


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

const setSubmitButtonState = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? 'Публикую...' : 'Опубликовать';
};

const setResetButtonState = (isDisabled) => {
  resetButton.disabled = isDisabled;
};


const resetForm = () => {
  formElement.reset();
  formPristine.reset();
  resetMap();
  resetSlider();
  resetMapFilterForm();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

const onFormSubmitSuccess = () => {
  showSuccessMessage();
  setSubmitButtonState(false);
  setResetButtonState(false);
  formPristine.reset();
  resetForm();
};

const onFormSubmitFail = () => {
  showAlert('Не удалось отправить форму. Попробуйте ещё раз');
  setSubmitButtonState(false);
  setResetButtonState(false);
  showFailMessage();
};

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = formPristine.validate();
  if (isValid) {
    setSubmitButtonState(true);
    setResetButtonState(true);
    sendData(
      new FormData(evt.target),
      () => {
        onFormSubmitSuccess();
      },
      () => {
        onFormSubmitFail();
      },
    );
  }
});

document.addEventListener('keypress', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
  }
});

export { setFormDisabledState };

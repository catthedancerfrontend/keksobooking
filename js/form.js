import { formPristine } from './validation.js';

const formElement = document.querySelector('.ad-form');
const formFieldsets = formElement.querySelectorAll('fieldset');
const submitButton = formElement.querySelector('.ad-form__submit');


const setFormDisabledState = (isDisabled) => {
  isDisabled
    ? formElement.classList.add('ad-form--disabled')
    : formElement.classList.remove('ad-form--disabled');

  formFieldsets.forEach((fieldset) => (fieldset.disabled = isDisabled));
};

setFormDisabledState(true);

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  formPristine.validate();
});

submitButton.addEventListener('keypress', (evt) => {
  if (evt.key === 'Enter') {
    evt.preventDefault();
  }
});

setTimeout(() => setFormDisabledState(false), 50);

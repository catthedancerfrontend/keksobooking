import { formPristine } from './validation.js';

const formElement = document.querySelector('.ad-form');
const formFieldsets = formElement.querySelectorAll('fieldset');

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

setTimeout(() => setFormDisabledState(false), 50);


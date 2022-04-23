const slider = document.querySelector('.ad-form__slider');
const price = document.querySelector('#price');

const MAX_PRICE = 100000;
const MIN_PRICE = 0;
const DEFAULT_PRICE = 5000;
const STEP = 1;

noUiSlider.create(slider, {
  range: {
    min: MIN_PRICE,
    max: MAX_PRICE,
  },
  start: DEFAULT_PRICE,
  step: STEP,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

slider.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  if (value) {
    price.value = value;
  }
});

price.addEventListener('change', () => {
  slider.noUiSlider.set([price.value]);
});

const resetSlider = () => {
  slider.noUiSlider.set(DEFAULT_PRICE);
  price.value = DEFAULT_PRICE;
  price.min = DEFAULT_PRICE;
};

export { resetSlider };

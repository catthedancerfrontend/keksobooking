const filters = document.querySelector('.map__filters');
const filtersList = filters.querySelectorAll('select');
const filtersCheckboxConteiner = filters.querySelector('.map__features');
const filtersCheckboxList = filtersCheckboxConteiner.querySelectorAll('input[type=checkbox]');

const setFiltersDisbledState = (isDisabled) => {
  if (isDisabled) {
    filters.classList.add('map__filters--disabled');
    filtersCheckboxConteiner.classList.add('map__filters--disabled')
  } else {
    filters.classList.remove('map__filters--disabled');
    filtersCheckboxConteiner.classList.remove('map__filters--disabled')
  }
  
  filtersList.forEach((filter) => (filter.disabled = isDisabled));
  filtersCheckboxList.forEach((checkbox) => (checkbox.disabled = isDisabled));
};

setFiltersDisbledState(true);

setTimeout(() => setFiltersDisbledState(false), 5000);
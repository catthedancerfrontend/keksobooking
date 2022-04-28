const filters = document.querySelector('.map__filters');
const filtersList = filters.querySelectorAll('select');
const filtersCheckboxContainer = filters.querySelector('.map__features');
const filtersCheckboxList = filtersCheckboxContainer.querySelectorAll('input[type=checkbox]');

const setFiltersDisabledState = (isDisabled) => {
  if (isDisabled) {
    filters.classList.add('map__filters--disabled');
    filtersCheckboxContainer.classList.add('map__filters--disabled');
  } else {
    filters.classList.remove('map__filters--disabled');
    filtersCheckboxContainer.classList.remove('map__filters--disabled');
  }

  filtersList.forEach((filter) => (filter.disabled = isDisabled));
  filtersCheckboxList.forEach((checkbox) => (checkbox.disabled = isDisabled));
};

export { setFiltersDisabledState };

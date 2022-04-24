import { getData } from './api.js';
import { renderMarkers } from './map.js';
import { setFiltersDisbledState } from './filters.js';
import { setFormDisabledState } from './form.js';

const MAX_MARKERS_COUNT = 10;

const deactivateAll = () => {
  setFiltersDisbledState(true);
  setFormDisabledState(true);
};

const onLoadSuccess = (markers) => {
  renderMarkers(markers.slice(0, MAX_MARKERS_COUNT));
  setFiltersDisbledState(false);
  setFormDisabledState(false);
};

const onLoadFail = () => {
  setFiltersDisbledState(true);
  setFormDisabledState(true);
};

const init = () => getData(onLoadSuccess, onLoadFail);

export { init, deactivateAll };

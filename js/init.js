import { getData } from './api.js';
import { renderMarkers } from './map.js';
import { setFiltersDisabledState } from './filters.js';
import { setFormDisabledState } from './form.js';

const MAX_MARKERS_COUNT = 10;

const deactivateAll = () => {
  setFiltersDisabledState(true);
  setFormDisabledState(true);
};

const onLoadSuccess = (markers) => {
  renderMarkers(markers.slice(0, MAX_MARKERS_COUNT));
  setFiltersDisabledState(false);
  setFormDisabledState(false);
};

const onLoadFail = () => {
  deactivateAll();
};

const init = () => getData(onLoadSuccess, onLoadFail);

export { init, deactivateAll };

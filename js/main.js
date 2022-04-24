import './util.js';
import './ad-popup.js';
import './form.js';
import './filters.js';
import './validation.js';
import './map.js';
import './slider-element.js';
import { getData } from './api.js';
import { renderMarkers } from './map.js';
// import {setUserFormSubmit} from './form.js';

getData(renderMarkers);
// setUserFormSubmit();

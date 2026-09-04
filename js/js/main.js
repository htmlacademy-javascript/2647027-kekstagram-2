import { getPhotos } from './api.js';
import { renderCards } from './render-cards.js';
import { initFilters } from './filters.js';
import { showDataError } from './util.js';
import './upload-form.js';

getPhotos()
  .then((photos) => {
    initFilters(photos);
    renderCards(photos);
  })
  .catch(() => {
    showDataError();
  });

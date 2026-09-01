import { getPhotos } from './api.js';
import { renderCards } from './render-cards.js';
import { showDataError } from './util.js';
import './upload-form.js';
import './validation.js';

// renderCards(getPhotos(COUNT_PHOTOS));

getPhotos()
  .then((photos) => {
    renderCards(photos);
  })
  .catch(() => {
    showDataError();
  });

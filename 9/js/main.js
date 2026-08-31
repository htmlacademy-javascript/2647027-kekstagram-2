import { getPhotos, COUNT_PHOTOS } from './data.js';
import './util.js';
import { renderCards } from './render-cards.js';
import './upload-form.js';
import './validation.js';

renderCards(getPhotos(COUNT_PHOTOS));

import { getPhotos, COUNT_PHOTOS } from './data.js';
import './util.js';
import { renderCards } from './render-cards.js';

renderCards(getPhotos(COUNT_PHOTOS));

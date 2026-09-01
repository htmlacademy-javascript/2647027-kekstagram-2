import { renderCards } from './render-cards.js';
import { debounce } from './util.js';

const filtersElement = document.querySelector('.img-filters');
const filtersButtons = document.querySelectorAll('.img-filters__button');

let currentFilter = 'default';
let allPhotos = [];

const showFilters = () => {
  filtersElement.classList.remove('img-filters--inactive');
};

const filterDefault = (photos) => photos;

const filterRandom = (photos) => {
  const shuffled = [...photos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
};

const filterDiscussed = (photos) => [...photos].sort((a, b) => b.comments.length - a.comments.length);

const getSortedPhotos = (filterType, photos) => {
  let sortedPhotos;
  switch (filterType) {
    case 'default':
      sortedPhotos = filterDefault(photos);
      break;
    case 'random':
      sortedPhotos = filterRandom(photos);
      break;
    case 'discussed':
      sortedPhotos = filterDiscussed(photos);
      break;
    default:
      sortedPhotos = photos;
  }
  renderCards(sortedPhotos);
};

// Оборачиваем getSortedPhotos в debounce
const debouncedFilter = debounce(getSortedPhotos, 500);

const onFilterClick = (evt) => {
  const filterType = evt.target.id.replace('filter-', '');
  if (currentFilter === filterType) {
    return;
  }

  filtersElement
    .querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');

  evt.target.classList.add('img-filters__button--active');
  currentFilter = filterType;

  // ✅ вызываем debouncedFilter, а не getSortedPhotos
  debouncedFilter(currentFilter, allPhotos);
};

export const initFilters = (photos) => {
  allPhotos = [...photos];

  showFilters();

  filtersButtons.forEach((button) => {
    button.addEventListener('click', onFilterClick);
  });

  renderCards(allPhotos);
};

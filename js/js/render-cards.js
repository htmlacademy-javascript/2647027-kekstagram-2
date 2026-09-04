import { openBigPicture } from './open-big-picture.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const gallery = document.querySelector('.pictures');

const clear = () => {
  document.querySelectorAll('.picture').forEach((item) => {
    item.remove();
  });
};

const renderCards = (pictures) => {
  clear();
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {

    const newCardElement = template.cloneNode(true);

    const pictureImg = newCardElement.querySelector('.picture__img');
    pictureImg.src = picture.url;
    pictureImg.alt = picture.description;

    newCardElement.querySelector('.picture__comments').textContent = picture.comments.length;
    newCardElement.querySelector('.picture__likes').textContent = picture.likes;

    newCardElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(picture);
    });

    fragment.appendChild(newCardElement);
  });
  gallery.append(fragment);
};

export {renderCards};

const template = document.querySelector('#picture').content.querySelector('.picture');
const gallery = document.querySelector('.pictures');

export const renderCards = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    console.log(picture);
    const newCardElement = template.cloneNode(true);

    const pictureImg = newCardElement.querySelector('.picture__img');
    pictureImg.src = picture.url;
    pictureImg.alt = picture.description;

    newCardElement.querySelector('.picture__comments').textContent = picture.comments.length;
    newCardElement.querySelector('.picture__likes').textContent = picture.likes;

    fragment.appendChild(newCardElement);
  });
  gallery.append(fragment);
};

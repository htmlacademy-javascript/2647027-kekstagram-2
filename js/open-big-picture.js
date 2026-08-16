const bigPicture = document.querySelector('.big-picture');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const img = bigPicture.querySelector('.big-picture__img img');//Адрес изображения url подставьте как src
const likesCount = bigPicture.querySelector('.likes-count');//Количество лайков likes
const commentsShown = bigPicture.querySelector('.social__comment-shown-count');//Количество комментариев
const commentsTotal = bigPicture.querySelector('.social__comment-total-count');//Общее количество комментариев
const caption = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');

// - Вспомогательные функции -
const isEscapeKey = (evt) => evt.key === 'Escape';

// - ОТКРЫТИЕ ОКНА -
export const openBigPicture = (photo) => {
  // Показать окно и заблокировать скролл
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Заполнить данные
  img.src = photo.url;
  img.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsTotal.textContent = photo.comments.length;
  commentsShown.textContent = photo.comments.length;
  caption.textContent = photo.description;

  // Очистить и заполнить список комментариев
  commentsList.innerHTML = '';
  photo.comments.forEach((comment) => {
    const li = document.createElement('li');
    li.classList.add('social__comment');

    const avatar = document.createElement('img');
    avatar.classList.add('social__picture');
    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    avatar.width = 35;
    avatar.height = 35;

    const text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = comment.message;

    li.appendChild(avatar);
    li.appendChild(text);
    commentsList.appendChild(li);
  });
};

// - ЗАКРЫТИЕ ОКНА -
const closeBigPicture = () => {
  // Скрыть окно и разблокировать скролл
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// - ОБРАБОТЧИКИ СОБЫТИЙ -
// Закрытие по клику на крестик
cancelButton.addEventListener('click', closeBigPicture);

// Закрытие по нажатию Escape
document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
});

const COMMENTS_STEP = 5;
const bigPicture = document.querySelector('.big-picture');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const img = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsShown = bigPicture.querySelector('.social__comment-shown-count');
const commentsTotal = bigPicture.querySelector('.social__comment-total-count');
const caption = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let currentComments = [];
let commentsShownCount = 0;

// -------------------- Вспомогательные функции --------------------
const isEscapeKey = (evt) => evt.key === 'Escape';

// -------------------- Функция отрисовки комментариев --------------------
const renderComments = () => {
  commentsList.innerHTML = '';
  const visibleComments = currentComments.slice(0, commentsShownCount);

  visibleComments.forEach((comment) => {
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

  commentsShown.textContent = commentsShownCount;
  commentsTotal.textContent = currentComments.length;

  if (commentsShownCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

// -------------------- Загрузка следующих комментариев --------------------
const loadMoreComments = () => {
  const remaining = currentComments.length - commentsShownCount;
  const toLoad = Math.min(COMMENTS_STEP, remaining);
  commentsShownCount += toLoad;
  renderComments();
};

// -------------------- ОТКРЫТИЕ ОКНА (экспортируем) --------------------
export const openBigPicture = (photo) => {
  // Показать окно и заблокировать скролл
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Заполнить данные
  img.src = photo.url;
  img.alt = photo.description;
  likesCount.textContent = photo.likes;
  caption.textContent = photo.description;

  // Инициализация комментариев
  currentComments = photo.comments;
  commentsShownCount = Math.min(COMMENTS_STEP, currentComments.length);
  renderComments();

  // Показать блоки
  const commentCount = bigPicture.querySelector('.social__comment-count');
  if (commentCount) {
    commentCount.classList.remove('hidden');
  }
  if (commentsLoader) {
    commentsLoader.classList.remove('hidden');
  }
};

// -------------------- ЗАКРЫТИЕ ОКНА --------------------
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  currentComments = [];
  commentsShownCount = 0;
  commentsList.innerHTML = '';
};

// -------------------- ОБРАБОТЧИКИ СОБЫТИЙ --------------------
cancelButton.addEventListener('click', closeBigPicture);

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
});

commentsLoader.addEventListener('click', loadMoreComments);

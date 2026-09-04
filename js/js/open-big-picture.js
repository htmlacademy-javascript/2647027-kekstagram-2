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

const isEscapeKey = (evt) => evt.key === 'Escape';

const renderComments = () => {

  const visibleComments = currentComments.splice(0, COMMENTS_STEP);

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

    commentsShownCount++;

  });

  commentsShown.textContent = commentsShownCount;


  if (currentComments.length > 0) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }
};

const loadMoreComments = () => {
  renderComments();
};

export const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  img.src = photo.url;
  img.alt = photo.description;
  likesCount.textContent = photo.likes;
  caption.textContent = photo.description;

  commentsList.innerHTML = '';
  commentsShownCount = 0;
  currentComments = [...photo.comments];
  commentsTotal.textContent = currentComments.length;
  renderComments();


  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  currentComments = [];
  commentsShownCount = 0;
  commentsList.innerHTML = '';

  document.removeEventListener('keydown', onDocumentKeydown);
};

cancelButton.addEventListener('click', closeBigPicture);

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

commentsLoader.addEventListener('click', loadMoreComments);

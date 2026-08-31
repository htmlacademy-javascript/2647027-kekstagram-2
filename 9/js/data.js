import {getRandomElement, getRandomInteger} from './util.js';

const MASSAGE = [
  'Всё отлично!',
  'Красивый кадр, прямо загляденье!',
  'Интересный ракурс, необычно и свежо!',
  'Здорово получилось, очень живо!',
  'Отличная работа, прям вдохновляет!',
  'Чудесный момент, поймала настроение!',
  'Красиво и душевно, глаз не оторвать!',
  'Супер! Прямо как с обложки журнала!'
];

const NAMES = [
  'Сергей',
  'Алла',
  'Мария',
  'Дмитрий',
  'Екатерина',
  'Елизавета',
  'Алексей'
];

const DESCRIPTIONS = [
  'Красивый кадр с атмосферой уюта и тепла',
  'Момент, который хочется запомнить навсегда',
  'Солнечный свет создаёт особое настроение',
  'Глубокий и эмоциональный снимок',
  'Лёгкость и свобода в каждой детали',
  'Тёплая и уютная атмосфера, согревающая сердце',
  'Яркие краски и живая натура',
  'Загадочный свет и тени создают тайну',
  'Простота и гармония в каждом элементе',
  'Особенный взгляд на привычные вещи'
];

const COUNT_PHOTOS = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_ID = 100;
const MAX_ID = 3000;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

const getComment = () => ({
  id: getRandomInteger(MIN_ID, MAX_ID),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR, MAX_AVATAR)}.svg`,
  message: getRandomElement(MASSAGE),
  name: getRandomElement(NAMES),
});

const getComments = () => {
  const commentsCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  const comments = [];
  for(let j = 1; j <= commentsCount; j++) {
    comments.push(getComment());
  }
  return comments;
};

const getPhoto = (t) => ({
  id: t,
  url: `./photos/${t}.jpg`,// используем шаблонную строку и ставик косые кавычки, чтобы номера фото менялись. ставим переменную ${t}
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: getComments()
});

const getPhotos = (count) => {
  const photos = [];

  for (let i = 1; i <= count; i++) {
    photos.push(getPhoto(i));
  }

  return photos;
};

export {getPhotos, COUNT_PHOTOS};

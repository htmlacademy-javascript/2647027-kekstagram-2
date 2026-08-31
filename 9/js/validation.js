const MAX_DESCRIPTION = 140;
const HASHTAG_FORMULA = /^#[a-zа-я0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;

const formNode = document.querySelector('#upload-select-image');
const descriptionNode = formNode.querySelector('.text__description');
const hashtagsNode = formNode.querySelector('.text__hashtags');

const validation = new Pristine(formNode, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const checkDescription = (value) => value.length <= MAX_DESCRIPTION;

const getHashtags = (text) => text.toLowerCase().split(' ').filter((item) => item.length);

const checkHashtags = (value) => {
  if (!value.trim().length) {
    return true;
  }

  const hashtags = getHashtags(value);
  return hashtags.every((word) => HASHTAG_FORMULA.test(word));
};

const checkHashtagsNumber = (value) => {
  if (!value.trim().length) {
    return true;
  }

  const hashtags = getHashtags(value);

  return hashtags.length <= MAX_HASHTAGS;
};

const checkUniqueHashtags = (value) => {
  if (!value.trim().length) {
    return true;
  }

  const hashtags = getHashtags(value);

  const uniques = [...new Set(hashtags)];
  return hashtags.length === uniques.length;
};

validation.addValidator(
  descriptionNode,
  checkDescription,
  `Описание не должно превышать ${MAX_DESCRIPTION} символов.`,
  3,
  true
);

validation.addValidator(
  hashtagsNode,
  checkHashtags,
  'Хештег должен начинаться с решетки, включать буквы и цифры и не превышать 20 символов',
  2,
  true
);

validation.addValidator(
  hashtagsNode,
  checkHashtagsNumber,
  `Количество хештегов не должно превышать ${MAX_HASHTAGS}`,
  1,
  true
);

validation.addValidator(
  hashtagsNode,
  checkUniqueHashtags,
  'Хештеги должны быть уникальны'
);


export const isValid = () => validation.validate();

export const resetValidation = () => {
  validation.reset();
};

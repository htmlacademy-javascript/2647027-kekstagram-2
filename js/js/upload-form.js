import { isValid, resetValidation } from './validation.js';
import { resetEffects } from './effect.js';
import { resetScale } from './scale.js';
import { sendFormData } from './api.js';
import { Messages, showMessage } from './message.js';

const formNode = document.querySelector('#upload-select-image');
const modalNode = formNode.querySelector('.img-upload__overlay');
const uploadInputNode = formNode.querySelector('#upload-file');
const cancelButtonNode = modalNode.querySelector('#upload-cancel');
const bodyNode = document.body;
const hashtagsNode = formNode.querySelector('.text__hashtags');
const descriptionNode = formNode.querySelector('.text__description');
const submitButtonNode = formNode.querySelector('.img-upload__submit');
const previewNode = formNode.querySelector('.img-upload__preview img');
const radiosPreviewNode = formNode.querySelectorAll('.effects__preview');

const renderPreview = () => {
  const file = uploadInputNode.files[0];
  const url = URL.createObjectURL(file);
  previewNode.src = url;
  radiosPreviewNode.forEach((item) => {
    item.style.backgroundImage = `url(${url})`;
  });
};

const openUploadModal = () => {
  modalNode.classList.remove('hidden');
  bodyNode.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  renderPreview();
};

const closeUploadModal = () => {
  modalNode.classList.add('hidden');
  bodyNode.classList.remove('modal-open');
  formNode.reset();
  resetValidation();
  resetScale();
  resetEffects();
  document.removeEventListener('keydown', onDocumentKeydown);
};

uploadInputNode.addEventListener('change', openUploadModal);

cancelButtonNode.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploadModal();
});

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape'
    && document.activeElement !== hashtagsNode
    && document.activeElement !== descriptionNode
    && !document.querySelector('.error')) {
    closeUploadModal();
  }
}

formNode.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!isValid()) {
    return;
  }

  const formData = new FormData(formNode);
  submitButtonNode.disabled = true;

  sendFormData(formData)
    .then(() => {
      closeUploadModal();
      showMessage(Messages.SUCCESS);
    })
    .catch(() => {
      showMessage(Messages.ERROR);
    })
    .finally(() => {
      submitButtonNode.disabled = false;
    });
});

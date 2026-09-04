const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const Messages = {
  SUCCESS: 'success',
  ERROR: 'error'
};

const templates = {
  [Messages.SUCCESS]: successTemplate,
  [Messages.ERROR]: errorTemplate
};

const showMessage = (type) => {

  const elementNode = templates[type].cloneNode(true);
  document.body.append(elementNode);

  const onButtonClick = () => {
    closeMessage();
  };

  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };

  const onOverlayClick = (evt) => {
    if (evt.target.classList.contains(type)) {
      closeMessage();
    }
  };

  function closeMessage() {
    elementNode.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  elementNode.querySelector(`.${type}__button`).addEventListener('click', onButtonClick);
  elementNode.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onDocumentKeydown);

};
export {Messages, showMessage};

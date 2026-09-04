const ERROR_MESSAGE_TIME = 5000;
const DEBOUNCE_DELAY = 500;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showDataError = () => {
  const dataErrorNode = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorNode);

  setTimeout(() => {
    dataErrorNode.remove();
  }, ERROR_MESSAGE_TIME);
};

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {showDataError, debounce};

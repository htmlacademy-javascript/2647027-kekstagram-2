const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const FIVE = 5000;

const showDataError = () => {
  const dataErrorNode = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorNode);

  setTimeout(() => {
    dataErrorNode.remove();
  }, FIVE);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;
  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

export {showDataError, debounce, throttle};

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const FIVE = 5000;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElement = (items) => items[getRandomInteger(0, items.length - 1)];

const showDataError = () => {
  const dataErrorNode = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorNode);

  setTimeout(() => {
    dataErrorNode.remove();
  }, FIVE);
};

export {getRandomElement, getRandomInteger, showDataError};

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const SCALE_FACTOR = 0.01;

const SCALE_TYPE = {
  PLUS: 'plus',
  MINUS: 'minus'
};

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

let currentScale = DEFAULT_SCALE;

const applyScaleToImage = () => {
  previewImage.style.transform = `scale(${currentScale * SCALE_FACTOR})`;
  scaleControlValue.value = `${currentScale}%`;
};

const renderScale = (type) => {
  currentScale = (type === SCALE_TYPE.PLUS)
    ? Math.min(currentScale + SCALE_STEP, MAX_SCALE)
    : Math.max(currentScale - SCALE_STEP, MIN_SCALE);
  applyScaleToImage();
};

const resetScale = () => {
  currentScale = DEFAULT_SCALE;
  applyScaleToImage();
};

scaleControlSmaller.addEventListener('click', () => {
  renderScale(SCALE_TYPE.MINUS);
});

scaleControlBigger.addEventListener('click', () => {
  renderScale(SCALE_TYPE.PLUS);
});

resetScale();

export { resetScale };

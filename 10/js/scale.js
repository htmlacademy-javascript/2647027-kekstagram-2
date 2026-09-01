const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  previewImage.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

const resetScale = () => {
  scaleImage(DEFAULT_SCALE);
};

scaleControlSmaller.addEventListener('click', () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  const nextValue = Math.max(currentValue - SCALE_STEP, MIN_SCALE);
  scaleImage(nextValue);
});

scaleControlBigger.addEventListener('click', () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  const nextValue = Math.min(currentValue + SCALE_STEP, MAX_SCALE);
  scaleImage(nextValue);
});

export { resetScale };

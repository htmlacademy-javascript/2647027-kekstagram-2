const URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const getPhotos = () => fetch(`${URL}/data`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Не удалось загрузить фотографии');
    }
    return response.json();
  });

const sendFormData = (formData) => fetch(`${URL}/`, {
  method: 'POST',
  body: formData,
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Не удалось отправить форму');
    }
  });

export {getPhotos, sendFormData};

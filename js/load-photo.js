const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const formElement = document.querySelector('.ad-form');
const photoChooser = formElement.querySelector('#images');
const photoElement = formElement.querySelector('.ad-form__photo');
const photoContainer = formElement.querySelector('.ad-form__photo-container');

photoChooser.addEventListener('change', () => {
  photoElement.remove();

  Array.from(photoChooser.files).forEach((file) => {
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const divContainer = document.createElement('div');
      const photoPreview = document.createElement('img');
      divContainer.classList.add('ad-form__photo');
      photoPreview.style.width = '70px';
      photoPreview.style.height = '70px';
      photoPreview.style.borderRadius = '5px';
      photoPreview.src = URL.createObjectURL(file);
      divContainer.append(photoPreview);
      photoContainer.append(divContainer);
    }
  });
});

formElement.addEventListener('reset', () => {
  const photos = photoContainer.querySelectorAll('.ad-form__photo');
  photos.forEach((photo) => photo.remove());
  const divContainer = document.createElement('div');
  divContainer.classList.add('ad-form__photo');
  photoContainer.append(divContainer);
});


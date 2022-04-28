const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const formElement = document.querySelector('.ad-form');
const avatarChooser = formElement.querySelector('#avatar');
const avatarPreview = formElement.querySelector('.ad-form-header__preview img');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

formElement.addEventListener('reset', () => {
  avatarPreview.src = DEFAULT_AVATAR;
});

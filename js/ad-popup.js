import { HousingType } from './form-properties.js';

const cardPopup = document.querySelector('#card').content.querySelector('article');

const getFeaturesTemplate = (features) => {
  const featureFragment = document.createDocumentFragment();
  features.forEach((feature) => {
    const listItem = document.createElement('li');
    listItem.classList.add('popup__feature', `popup__feature--${feature}`);

    if (listItem) {
      featureFragment.appendChild(listItem);
    }
  });
  return featureFragment;
};

const getPhotosTemplate = (photos) => {
  const photoTemplate = document.createDocumentFragment();
  photos.forEach((photo) => {
    const img = document.createElement('img');
    img.classList.add('popup__photo');
    img.src = photo;
    img.height = 40;
    img.width = 45;
    img.alt = 'Фотография жилья';
    photoTemplate.appendChild(img);
  });
  return photoTemplate;
};

const renderPopup = (offer) => {
  const cardPopupClone = cardPopup.cloneNode(true);
  const listContainer = cardPopupClone.querySelector('.popup__features');
  const photoContainer = cardPopupClone.querySelector('.popup__photos');
  const avatar = cardPopupClone.querySelector('.popup__avatar');

  cardPopupClone.querySelector('.popup__title').textContent = offer.offer.title;
  cardPopupClone.querySelector('.popup__text--address').textContent = offer.offer.address;
  cardPopupClone.querySelector('.popup__text--price').textContent = `${offer.offer.price} ₽/ночь`;
  cardPopupClone.querySelector('.popup__type').textContent = HousingType[offer.offer.type] || offer.offer.type;
  cardPopupClone.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  cardPopupClone.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  cardPopupClone.querySelector('.popup__description').textContent = offer.offer.description;
  avatar.src = offer.author.avatar;

  listContainer.innerHTML = '';
  photoContainer.innerHTML = '';

  if (offer.offer.features) {
    listContainer.appendChild(getFeaturesTemplate(offer.offer.features));
  }

  if (offer.offer.photos && offer.offer.photos.length !== 0) {
    photoContainer.appendChild(getPhotosTemplate(offer.offer.photos));
  }

  return cardPopupClone;
};

export { renderPopup };

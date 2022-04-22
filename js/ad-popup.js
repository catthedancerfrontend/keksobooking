import { offers } from './data.js';

const cardPopup = document.querySelector('#card').content.querySelector('article');

const popupFragment = document.createDocumentFragment();

const renderPopup = (offers) => {
  offers.forEach((offer) => {
    const cardPopupClone = cardPopup.cloneNode(true);
    cardPopupClone.querySelector('.popup__title').textContent = offer.offer.title;
    cardPopupClone.querySelector('.popup__text--price').textContent = `${offer.offer.price} ₽/ночь`;
    cardPopupClone.querySelector('.popup__type').textContent = offer.offer.type;
    cardPopupClone.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
    cardPopupClone.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
    cardPopupClone.querySelector('.popup__description').textContent = offer.offer.description;

    const listContainer = cardPopupClone.querySelector('.popup__features');
    const listFragment = document.createDocumentFragment();

    offer.offer.features.forEach((feature) => {
      const listItem = document.createElement('li');
      listItem.classList.add('popup__feature', `popup__feature--${feature}`);

      if (listItem) {
        listFragment.appendChild(listItem);
      }
    });

    listContainer.innerHTML = '';
    listContainer.appendChild(listFragment);

    const photoContainer = cardPopupClone.querySelector('.popup__photos');
    const photoFragment = document.createDocumentFragment();

    offer.offer.photos.forEach((photo) => {
      const img = document.createElement('img');
      img.classList.add('popup__photo');
      img.src = photo;
      img.height = 40;
      img.width = 45;
      img.alt = 'Фотография жилья';
      photoFragment.appendChild(img);
    });

    photoContainer.innerHTML = '';
    photoContainer.appendChild(photoFragment);

    const avatar = cardPopupClone.querySelector('.popup__avatar');
    avatar.src = offer.author.avatar;

    popupFragment.appendChild(cardPopupClone);
  });
};

const canvas = document.querySelector('#map-canvas');
canvas.appendChild(popupFragment);

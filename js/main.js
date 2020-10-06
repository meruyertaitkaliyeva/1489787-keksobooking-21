'use strict';

const TITLE = [`Fusce`, `Quisque`, `Maecenas`, `Donec`, `Proin`, `Phasellus`, `Nulla`, `Mauris`];
const TYPE = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTION = [`Fusce in nisi mattis`, `Donec eros lacus`, `Quisque ultricies egestas ligula`, `Maecenas dictum vel dui id luctus`, `In a vehicula metus`, `Sed sed ornare nisi`, `Nunc aliquet risus ut nisi`, `Donec facilisis vel tortor vel mollis`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const PINWIDTH = 156;
const PINHEIGHT = 156;

const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createCardsArray = function (count) {
  const array = [];
  for (let i = 0; i < count; i++) {
    const locationX = getRandomNumber(0, 1000);
    const locationY = getRandomNumber(130, 630);
    array[i] = {
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },
      offer: {
        title: TITLE[getRandomNumber(0, TITLE.length - 1)],
        address: `${locationX}, ${locationY}`,
        price: getRandomNumber(1000, 100000),
        type: TYPE[Object.keys(TYPE)[Math.floor(Math.random() * Object.keys(TYPE).length)]],
        rooms: getRandomNumber(1, 10),
        guests: getRandomNumber(1, 20),
        checkin: CHECKIN[getRandomNumber(0, CHECKIN.length - 1)],
        checkout: CHECKOUT[getRandomNumber(0, CHECKOUT.length - 1)],
        features: FEATURES.slice(0, getRandomNumber(0, FEATURES.length - 1)),
        description: DESCRIPTION[getRandomNumber(0, DESCRIPTION.length - 1)],
        photos: PHOTOS.slice(0, getRandomNumber(0, PHOTOS.length - 1))
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }
  return array;
};

const DATA = createCardsArray(8);

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const mapPins = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const createPin = function (data) {
  const pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = `${data.location.x}px`;
  pinElement.style.top = `${data.location.y}px`;
  pinElement.querySelector(`img`).src = data.author.avatar;
  pinElement.querySelector(`img`).alt = data.offer.title;
  return pinElement;
};

const renderPins = function (container, data) {
  data.forEach((element) => {
    container.appendChild(createPin(element));
  });
};


// const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);


// const renderFeatures = function (container, data) {
//   container.innerHTML = ``;
//   data.forEach((feature) => {
//     const featureCreateElement = document.createElement(`li`);
//     featureCreateElement.classList.add(`popup__feature`);
//     featureCreateElement.classList.add(`popup__feature--` + feature);
//     container.appendChild(featureCreateElement);
//   });
// };

// const renderPhotos = function (container, data) {
//   container.innerHTML = ``;
//   data.forEach((src) => {
//     const photoCreateElement = document.createElement(`img`);
//     photoCreateElement.classList.add(`popup__photo`);
//     photoCreateElement.setAttribute(`width`, `45`);
//     photoCreateElement.setAttribute(`height`, `45`);
//     photoCreateElement.src = src;
//     container.appendChild(photoCreateElement);
//   });
// };


// const createCard = function (data) {
//   const cardElement = cardTemplate.cloneNode(true);
//   cardElement.querySelector(`.popup__title`).textContent = data.offer.title;
//   cardElement.querySelector(`.popup__text--address`).textContent = data.offer.address;
//   cardElement.querySelector(`.popup__text--price`).textContent = `${data.offer.price}P/ночь`;
//   cardElement.querySelector(`.popup__type`).textContent = data.offer.type;
//   cardElement.querySelector(`.popup__text--capacity`).textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
//   cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
//   renderFeatures(cardElement.querySelector(`.popup__features`), data.offer.features);
//   cardElement.querySelector(`.popup__description`).textContent = data.offer.description;
//   renderPhotos(cardElement.querySelector(`.popup__photos`), data.offer.photos);
//   cardElement.querySelector(`.popup__avatar`).src = data.author.avatar;
//   return cardElement;
// };

// const renderCard = function (container) {
//   container.appendChild(createCard(DATA[0]));
// };

// renderCard(mapPins);

const formFieldsets = document.querySelectorAll(`fieldset`);

formFieldsets.forEach((el) => {
  el.setAttribute(`disabled`, `disabled`);
});

const mapFilters = document.querySelectorAll(`.map__filter`);

mapFilters.forEach((el) => {
  el.setAttribute(`disabled`, `disabled`);
});


const activatePage = function (event) {
  if (event.button === 0 || event.keyCode === 13) {
    formFieldsets.forEach((el) => {
      el.removeAttribute(`disabled`, `disabled`);
    });
    mapFilters.forEach((el) => {
      el.removeAttribute(`disabled`, `disabled`);
    });
    renderPins(mapPins, DATA);
  }
};


const mainMapPin = document.querySelector(`.map__pin--main`);
const posY = mainMapPin.offsetTop;
const posX = mainMapPin.offsetLeft;
const pinAddress = document.querySelector(`#address`);
pinAddress.value = `${posX}, ${posY}`;

mainMapPin.addEventListener(`mousedown`, activatePage);
mainMapPin.addEventListener(`keydown`, activatePage);

mainMapPin.addEventListener(`mousedown`, function (event) {
  if (event.button === 0) {
    pinAddress.value = `${posX + PINWIDTH / 2}, ${posY + PINHEIGHT}`;
  }
});


const roomOptions = Array.from(document.querySelector(`#room_number`).options);
const guestsOptions = Array.from(document.querySelector(`#capacity`).options);

const disableOption = function (el) {
  el.setAttribute(`disabled`, `disabled`);
};

const enableOption = function (el) {
  el.removeAttribute(`disabled`);
};

roomOptions.forEach((el) => {
  if (el.value === `1` && el.hasAttribute(`selected`)) {
    guestsOptions.forEach((element) => {
      enableOption(element);
      if (element.value !== `1`) {
        disableOption(element);
      }
    });
  } else if (el.value === `2` && el.hasAttribute(`selected`)) {
    guestsOptions.forEach((element) => {
      enableOption(element);
      if (element.value === `3` && element.value === `0`) {
        disableOption(element);
      }
    });
  } else if (el.value === `3` && el.hasAttribute(`selected`)) {
    guestsOptions.forEach((element) => {
      enableOption(element);
      if (element.value === `0`) {
        disableOption(element);
      }
    });
  } else if (el.value === `4` && el.hasAttribute(`selected`)) {
    guestsOptions.forEach((element) => {
      enableOption(element);
      if (element.value !== `0`) {
        disableOption(element);
      }
    });
  }
});

'use strict';

(function () {
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

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.data = {
    createCardsArray: (count) => {
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
    }
  };
})();
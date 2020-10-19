'use strict';

(function () {
  const pinAddress = document.querySelector(`#address`);
  const mainMapPin = document.querySelector(`.map__pin--main`);
  const posY = mainMapPin.offsetTop;
  const posX = mainMapPin.offsetLeft;
  pinAddress.value = `${posX}, ${posY}`;
  const roomsAmountSelect = document.querySelector(`#room_number`);

  const roomValues = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  const checkRooms = (guestsAmount) => {
    const guestsOptions = Array.from(document.querySelector(`#capacity`).options);
    guestsOptions.forEach((option) => {
      option.disabled = true;
    });
    roomValues[guestsAmount].forEach((roomsAmount) => {
      guestsOptions.forEach((option) => {
        if (Number(option.value) === roomsAmount) {
          option.disabled = false;
          option.selected = true;
        }
      });
    });
  };

  roomsAmountSelect.addEventListener(`change`, (evt) => {
    checkRooms(evt.target.value);
  });

  const housingTypeSelect = document.querySelector(`#type`);
  const housingPrice = document.querySelector(`#price`);

  const mapTypeOfPrice = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  housingTypeSelect.addEventListener(`change`, (evt) => {
    housingPrice.min = mapTypeOfPrice[evt.target.value];
    housingPrice.placeholder = mapTypeOfPrice[evt.target.value];
  });

  const timeinOptions = document.querySelector(`#timein`);
  const timeoutOptions = document.querySelector(`#timeout`);

  timeinOptions.addEventListener(`change`, () => {
    timeoutOptions.value = timeinOptions.value;
  });

  timeoutOptions.addEventListener(`change`, () => {
    timeinOptions.value = timeoutOptions.value;
  });
})();

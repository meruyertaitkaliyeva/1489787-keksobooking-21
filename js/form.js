'use strict';

(function () {
  const mainPin = document.querySelector(`.map__pin--main`);
  const pinAddress = document.querySelector(`#address`);
  pinAddress.value = `${mainPin.offsetLeft}, ${mainPin.offsetTop}`;
  const roomsAmountSelect = document.querySelector(`#room_number`);

  const setPinAddress = (event) => {
    if (event.button === 0) {
      pinAddress.value = `${Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2)}, ${mainPin.offsetTop - 130 + mainPin.offsetHeight}`;
    }
  };

  mainPin.addEventListener(`mousedown`, setPinAddress);

  mainPin.addEventListener(`mouseup`, setPinAddress);

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

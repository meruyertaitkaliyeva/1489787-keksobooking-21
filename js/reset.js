'use strict';

const MAIN_PIN_DEFAULT_TOP = 375;
const MAIN_PIN_DEFAULT_LEFT = 570;
const pinAddress = document.querySelector(`#address`);
const mainPin = document.querySelector(`.map__pin--main`);
const form = document.querySelector(`.ad-form`);
const filter = document.querySelector(`.map__filters`);
const filters = filter.querySelectorAll(`select, fieldset`);
const map = document.querySelector(`.map`);

const resetMainPin = () => {
  mainPin.style.top = MAIN_PIN_DEFAULT_TOP + `px`;
  mainPin.style.left = MAIN_PIN_DEFAULT_LEFT + `px`;
  pinAddress.value = `${mainPin.offsetLeft}, ${mainPin.offsetTop}`;
};

window.reset = {
  removePins: () => {
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((pin) => {
      pin.remove();
    });
  },

  disactivatePage: () => {
    form.reset();
    resetMainPin();
    window.reset.removePins();
    map.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    filters.forEach((el) => {
      el.setAttribute(`disabled`, `disabled`);
    });
  }
};

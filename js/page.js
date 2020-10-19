'use strict';

(function () {
  const form = document.querySelector(`.ad-form`);
  const formFieldsets = document.querySelectorAll(`fieldset`);
  const mapFilters = document.querySelectorAll(`.map__filter`);
  const DATA = window.data.createCardsArray(8);
  const mapPins = window.selectors.map.querySelector(`.map__pins`);

  const disableElement = (arr) => {
    arr.forEach((el) => {
      el.setAttribute(`disabled`, `disabled`);
    });
  };

  const enableElement = (arr) => {
    arr.forEach((el) => {
      el.removeAttribute(`disabled`, `disabled`);
    });
  };

  disableElement(formFieldsets);
  disableElement(mapFilters);

  const activatePage = () => {
    window.selectors.map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
    enableElement(formFieldsets);
    enableElement(mapFilters);
    window.pin.renderPins(mapPins, DATA);
  };

  const onMainPinMouseDown = (event) => {
    if (event.button === 0) {
      activatePage();
    }
    window.selectors.mainPin.removeEventListener(`mousedown`, onMainPinMouseDown);
  };

  const onMainPinKeyDown = (event) => {
    if (event.keyCode === 13) {
      activatePage();
    }
    window.selectors.mainPin.removeEventListener(`keydown`, onMainPinKeyDown);
  };

  window.selectors.mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
  window.selectors.mainPin.addEventListener(`keydown`, onMainPinKeyDown);
})();

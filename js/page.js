'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const form = document.querySelector(`.ad-form`);
  const formFieldsets = document.querySelectorAll(`fieldset`);
  const mapFilters = document.querySelectorAll(`.map__filter`);
  const mapPins = map.querySelector(`.map__pins`);

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

  const onSuccessLoad = (data) => {
    window.pin.renderPins(mapPins, data);
  };

  const onErrorLoad = (errorMessage) => {
    const errorLoadTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorLoadPopup = errorLoadTemplate.cloneNode(true);
    errorLoadPopup.querySelector(`.error__message`).value = `${errorMessage}`;
    document.body.insertAdjacentElement(`afterbegin`, errorLoadPopup);
  };

  const activatePage = () => {
    map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
    enableElement(formFieldsets);
    enableElement(mapFilters);
    window.server.load(onSuccessLoad, onErrorLoad);
  };

  const onMainPinMouseDown = (event) => {
    if (event.button === 0) {
      activatePage();
    }
    mainPin.removeEventListener(`mousedown`, onMainPinMouseDown);
  };

  const onMainPinKeyDown = (event) => {
    if (event.keyCode === 13) {
      activatePage();
    }
    mainPin.removeEventListener(`keydown`, onMainPinKeyDown);
  };

  mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
  mainPin.addEventListener(`keydown`, onMainPinKeyDown);

  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const successPopup = successTemplate.cloneNode(true);
  const errorPopup = errorTemplate.cloneNode(true);
  const errorCloseButton = errorPopup.querySelector(`.error__button`);

  const showPopup = (popup) => {
    document.body.insertAdjacentElement(`afterbegin`, popup);
  };

  const removePopup = (popup) => {
    popup.style = `display: none`;
  };

  const escPopup = (event, popup) => {
    if (event.keyCode === 13) {
      removePopup(popup);
    }
  };

  const closePopup = (event, popup) => {
    if (event.target === document) {
      removePopup(popup);
    }
  };

  const onSuccessUpload = () => {
    showPopup(successPopup);
    adForm.reset();
    adForm.classList.add(`ad-form--disabled`);
  };

  const onErrorUpload = () => {
    showPopup(errorPopup);
  };

  document.addEventListener(`keydown`, escPopup(successPopup));
  document.addEventListener(`keydown`, escPopup(errorPopup));
  document.addEventListener(`click`, closePopup(successPopup));
  document.addEventListener(`click`, closePopup(errorPopup));
  errorCloseButton.addEventListener(`click`, closePopup(errorPopup));


  const adForm = document.querySelector(`.ad-form`);
  const submitHandler = (evt) => {
    window.server.upload(new FormData(adForm), onSuccessUpload, onErrorUpload);
    evt.preventDefault();
  };

  adForm.addEventListener(`submit`, submitHandler);
})();

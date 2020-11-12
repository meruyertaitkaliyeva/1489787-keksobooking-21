'use strict';

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

let pins = [];

const onSuccessLoad = (data) => {
  pins = data;
  window.pin.renderPins(mapPins, data);
};

const updatePins = () => {
  window.card.deleteCard();
  window.reset.removePins();
  window.debounce(window.pin.renderPins(mapPins, window.filter.applyFilter(pins)));
};

const filters = document.querySelector(`.map__filters`);

filters.addEventListener(`change`, updatePins);


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
  window.checkRooms(document.querySelector(`#room_number`).value);
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

const removePopup = () => {
  successPopup.remove();
  errorPopup.remove();
};

const escPopup = (event) => {
  if (event.keyCode === 27) {
    removePopup();
  }
};

const showPopup = (popup) => {
  document.body.insertAdjacentElement(`afterbegin`, popup);
  document.addEventListener(`keydown`, escPopup);
  document.addEventListener(`click`, removePopup);
  errorCloseButton.addEventListener(`click`, removePopup);
};

const onSuccessUpload = () => {
  showPopup(successPopup);
  window.reset.disactivatePage();
};

const onErrorUpload = () => {
  showPopup(errorPopup);
};

const resetButton = document.querySelector(`.ad-form__reset`);

const onResetClick = () => {
  window.reset.disactivatePage();
};

const onResetKeydown = (event) => {
  if (event.keyCode === 13) {
    window.reset.disactivatePage();
  }
};

resetButton.addEventListener(`click`, onResetClick);
resetButton.addEventListener(`keydown`, onResetKeydown);

const submitHandler = (evt) => {
  window.server.upload(new FormData(form), onSuccessUpload, onErrorUpload);
  evt.preventDefault();
};

form.addEventListener(`submit`, submitHandler);

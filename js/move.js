'use strict';

const POSITION_MIN_X = 0 - (document.querySelector(`.map__pin--main`).offsetWidth / 2);
const POSITION_MAX_X = document.querySelector(`.map`).clientWidth - (document.querySelector(`.map__pin--main`).offsetWidth / 2);
const POSITION_MIN_Y = 130 - document.querySelector(`.map__pin--main`).offsetHeight;
const POSITION_MAX_Y = 630;
const mainPin = document.querySelector(`.map__pin--main`);

mainPin.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const checkPosition = (coords) => {
    if (coords.x <= POSITION_MIN_X) {
      coords.x = POSITION_MIN_X;
    }
    if (coords.x >= POSITION_MAX_X) {
      coords.x = POSITION_MAX_X;
    }
    if (coords.y <= POSITION_MIN_Y) {
      coords.y = POSITION_MIN_Y;
    }
    if (coords.y >= POSITION_MAX_Y) {
      coords.y = POSITION_MAX_Y;
    }
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    let newCoords = {
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y
    };

    checkPosition(newCoords);

    mainPin.style.top = newCoords.y + `px`;
    mainPin.style.left = newCoords.x + `px`;
  };
  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

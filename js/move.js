'use strict';

(function () {
  const map = window.selectors.map;
  const pin = window.selectors.mainPin;
  const mapCoords = map.getBoundingClientRect();
  const mapLimits = {
    top: 130,
    right: mapCoords.right,
    bottom: 630,
    left: mapCoords.left
  };
  pin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pin.style.top = (pin.offsetTop - shift.y) + `px`;
      pin.style.left = (pin.offsetLeft - shift.x) + `px`;

      if ((pin.offsetTop - shift.y) < mapLimits.top) {
        pin.style.top = mapLimits.top + `px`;
      } else if ((pin.offsetTop - shift.y) > mapLimits.bottom) {
        pin.style.top = mapLimits.bottom + `px`;
      }

      if ((pin.offsetLeft - shift.x) < mapLimits.left) {
        pin.style.left = mapLimits.left + `px`;
      } else if ((pin.offsetLeft - shift.x) > mapLimits.right) {
        pin.style.right = mapLimits.right + `px`;
      }
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();

'use strict';

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const createPin = (data) => {
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = `${data.location.x}px`;
    pinElement.style.top = `${data.location.y}px`;
    pinElement.querySelector(`img`).src = data.author.avatar;
    pinElement.querySelector(`img`).alt = data.offer.title;

    pinElement.addEventListener(`click`, () => {
      if (document.querySelector(`.map__pin--active`)) {
        document.querySelector(`.map__pin--active`).remove();
      }
      pinElement.classList.add(`map__pin--active`);
      window.card.renderCard(data);
    });

    return pinElement;
  };

  window.pin = {
    renderPins: (container, pins) => {
      pins.forEach((pin) => {
        container.appendChild(createPin(pin));
      });
    }
  };
})();

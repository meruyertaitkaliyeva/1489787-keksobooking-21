'use strict';

(function () {
  const MAX_PIN_COUNT = 8;
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const createPin = (data) => {
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = `${data.location.x}px`;
    pinElement.style.top = `${data.location.y}px`;
    pinElement.querySelector(`img`).src = data.author.avatar;
    pinElement.querySelector(`img`).alt = data.offer.title;

    pinElement.addEventListener(`click`, () => {
      window.card.renderCard(data);
    });
    return pinElement;
  };

  window.pin = {
    renderPins: (container, pin) => {
      for (let i = 0; i < MAX_PIN_COUNT; i++) {
        container.appendChild(createPin(pin[i]));
      }
    }
  };
})();

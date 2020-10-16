'use strict';

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  window.createPin = (data) => {
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = `${data.location.x}px`;
    pinElement.style.top = `${data.location.y}px`;
    pinElement.querySelector(`img`).src = data.author.avatar;
    pinElement.querySelector(`img`).alt = data.offer.title;

    pinElement.addEventListener(`click`, () => {
      window.renderCard(data);
    });
    return pinElement;
  };
})();

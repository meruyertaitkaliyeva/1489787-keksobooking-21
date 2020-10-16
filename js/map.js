'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const deleteCard = (el) => {
    el.remove();
  };

  window.renderCard = (data) => {
    const card = document.querySelector(`.map__card`);
    if (card) {
      deleteCard(card);
    }
    map.appendChild(window.createCard(data));
  };

  window.renderPins = (container, data) => {
    data.forEach((element) => {
      container.appendChild(window.createPin(element));
    });
  };
})();

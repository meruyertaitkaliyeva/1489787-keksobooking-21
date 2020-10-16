'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const renderFeatures = (container, data) => {
    container.innerHTML = ``;
    data.forEach((feature) => {
      const featureCreateElement = document.createElement(`li`);
      featureCreateElement.classList.add(`popup__feature`);
      featureCreateElement.classList.add(`popup__feature--` + feature);
      container.appendChild(featureCreateElement);
    });
  };

  const renderPhotos = (container, data) => {
    container.innerHTML = ``;
    data.forEach((src) => {
      const photoCreateElement = document.createElement(`img`);
      photoCreateElement.classList.add(`popup__photo`);
      photoCreateElement.setAttribute(`width`, `45`);
      photoCreateElement.setAttribute(`height`, `45`);
      photoCreateElement.src = src;
      container.appendChild(photoCreateElement);
    });
  };

  const deleteCard = (el) => {
    el.remove();
  };


  window.createCard = (data) => {
    const cardElement = cardTemplate.cloneNode(true);
    const closeCard = cardElement.querySelector(`.popup__close`);
    cardElement.querySelector(`.popup__title`).textContent = data.offer.title;
    cardElement.querySelector(`.popup__text--address`).textContent = data.offer.address;
    cardElement.querySelector(`.popup__text--price`).textContent = `${data.offer.price}P/ночь`;
    cardElement.querySelector(`.popup__type`).textContent = data.offer.type;
    cardElement.querySelector(`.popup__text--capacity`).textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
    renderFeatures(cardElement.querySelector(`.popup__features`), data.offer.features);
    cardElement.querySelector(`.popup__description`).textContent = data.offer.description;
    renderPhotos(cardElement.querySelector(`.popup__photos`), data.offer.photos);
    cardElement.querySelector(`.popup__avatar`).src = data.author.avatar;

    closeCard.addEventListener(`click`, () => {
      deleteCard(cardElement);
    });
    map.addEventListener(`keydown`, (event) => {
      if (event.keyCode === 27) {
        deleteCard(cardElement);
      }
    });

    return cardElement;
  };
})();

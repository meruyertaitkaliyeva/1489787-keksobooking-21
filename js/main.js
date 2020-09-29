'use strict';

const TITLE = [`Fusce`, `Quisque`, `Maecenas`, `Donec`, `Proin`, `Phasellus`, `Nulla`, `Mauris`];
const TYPE = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTION = [`Fusce in nisi mattis`, `Donec eros lacus`, `Quisque ultricies egestas ligula`, `Maecenas dictum vel dui id luctus`, `In a vehicula metus`, `Sed sed ornare nisi`, `Nunc aliquet risus ut nisi`, `Donec facilisis vel tortor vel mollis`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

let avatarNumber = [1, 2, 3, 4, 5, 6, 7, 8];
let avatar = [];
let address = [];
let price = [];
let rooms = [];
let guests = [];
let x = [];
let y = [];
let card = [];

const shuffle = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

avatarNumber = shuffle(avatarNumber);

const createRandomArray = function (array, min, max) {
  for (let i = 0; i < 8; i++) {
    let randomNamber = 0;
    let newRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (newRandomNumber === randomNamber) {
      newRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      array.push(newRandomNumber);
      randomNamber = newRandomNumber;
    }
  }
  return array;
};

price = createRandomArray(price, 1000, 100000);
rooms = createRandomArray(rooms, 1, 8);
guests = createRandomArray(guests, 1, 16);
x = createRandomArray(x, 10, 1200);
y = createRandomArray(y, 130, 630);

const createRandomAddress = function (array) {
  for (let i = 0; i < 8; i++) {
    array.push(`${x[i]}, ${y[i]}`);
  }
  return array;
};

address = createRandomAddress(address);

const createRandomAvatar = function (array) {
  for (let i = 0; i < 8; i++) {
    array.push(`img/avatars/user0` + avatarNumber[i] + `.png`);
  }
  return array;
};

avatar = createRandomAvatar(avatar);

const createCardsArray = function (array) {
  for (let i = 0; i < 8; i++) {
    let cardObject = {
      author: {
        avatar: avatar[i]
      },
      offer: {
        title: TITLE[i],
        address: address[i],
        price: price[i],
        type: TYPE[i],
        rooms: rooms[i],
        guests: guests[i],
        checkin: CHECKIN[i],
        checkout: CHECKOUT[i],
        features: FEATURES[i],
        description: DESCRIPTION[i],
        photos: PHOTOS[i]
      },
      location: {
        x: x[i],
        y: y[i]
      }
    };
    array.push(cardObject);
  }
  return array;
};

card = createCardsArray(card);


const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const mapPins = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const renderPin = function () {
  const pinElement = pinTemplate.cloneNode(true);
  for (let i = 0; i < card.length; i++) {
    pinElement.style = `left: ${card[i].location.x + 200}px; top: ${card[i].location.y + 400}px;`;
    pinElement.querySelector(`img`).src = card[i].author.avatar;
    pinElement.querySelector(`img`).alt = `${card[i].offer.title}`;
  }
  return pinElement;
};


const fragment = document.createDocumentFragment();
for (let i = 0; i < card.length; i++) {
  fragment.appendChild(renderPin(card[i]));
}
mapPins.appendChild(fragment);

'use strict';

(function () {
  const housingType = document.querySelector(`#housing-type`);
  const housingPrice = document.querySelector(`#housing-price`);
  const housingRooms = document.querySelector(`#housing-rooms`);
  const housingGuests = document.querySelector(`#housing-guests`);
  const housingFeatures = document.querySelector(`#housing-features`);

  const getTypeFilter = (data) => {
    return housingType.value !== `any` ? housingType.value === data.offer.type : true;
  };

  const getPriceFilter = (data) => {
    if (housingPrice.value !== `any`) {
      if (housingPrice.value === `low`) {
        return data.offer.price <= 10000;
      } else if (housingPrice.value === `middle`) {
        return data.offer.price >= 10000 && data.offer.price <= 50000;
      } else if (housingPrice.value === `high`) {
        return data.offer.price >= 50000;
      }
    } return true;
  };

  const getRoomsFilter = (data) => {
    return housingRooms.value !== `any` ? Number(housingRooms.value) === data.offer.rooms : true;
  };

  const getGuestsFilter = (data) => {
    return housingGuests.value !== `any` ? Number(housingGuests.value) === data.offer.guests : true;
  };

  const getHousingFeatures = (data) => {
    const checkedFilterFeatures = housingFeatures.querySelectorAll(`.map__checkbox:checked`);
    return [...checkedFilterFeatures].every((feature) => {
      return data.offer.features.includes(feature.value);
    });
  };

  window.filter = {
    applyFilter: (data) => {
      return data.filter((el) => {
        return getTypeFilter(el) &&
          getPriceFilter(el) &&
          getRoomsFilter(el) &&
          getGuestsFilter(el) &&
          getHousingFeatures(el);
      }).slice(0, 5);
    }
  };
}());

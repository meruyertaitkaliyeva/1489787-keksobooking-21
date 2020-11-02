'use strict';

(function () {
  const housingType = document.querySelector(`#housing-type`);

  const getTypeFilter = (data) => {
    return housingType.value !== `any` ? housingType.value === data.offer.type : true;
  };

  window.filter = {
    applyFilter: (data) => {
      return data.filter((el) => {
        return getTypeFilter(el);
      }).slice(0, 5);
    }
  };
}());

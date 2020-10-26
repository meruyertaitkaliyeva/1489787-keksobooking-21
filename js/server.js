'use strict';
(function () {
  const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;
  let StatusCode = {
    OK: 200
  };
  let TIMEOUT_IN_MS = 10000;

  window.server = {
    load: (onSuccess, onError) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, () => {
        onSuccess(xhr.response);
      });

      xhr.addEventListener(`load`, () => {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError(`Статус ответа: ` + TIMEOUT_IN_MS + ` ` + xhr.statusText);
        }
      });

      xhr.addEventListener(`error`, () => {
        onError(`Произошла ошибка соединения`);
      });

      xhr.addEventListener(`timeout`, () => {
        onError(`Запрос не успел выполниться за ` + TIMEOUT_IN_MS + `мс`);
      });

      xhr.open(`GET`, LOAD_URL);
      xhr.send();
    },

    upload: (data, onSuccess, onError) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, () => {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError(`Статус ответа: ` + TIMEOUT_IN_MS + ` ` + xhr.statusText);
        }
      });

      xhr.addEventListener(`error`, () => {
        onError(`Произошла ошибка соединения`);
      });

      xhr.addEventListener(`timeout`, () => {
        onError(`Запрос не успел выполниться за ` + TIMEOUT_IN_MS + `мс`);
      });

      xhr.open(`POST`, UPLOAD_URL);
      xhr.send(data);
    }
  };
})();

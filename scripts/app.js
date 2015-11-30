'use strict';

var Page = require('./page');

var xhr = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL 'phones.json'
xhr.open('GET', 'phones/phones.json', true);

xhr.addEventListener('load', function() {
  if (xhr.status != 200) {
    // обработать ошибку
    alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
  } else {
    let menuItems = JSON.parse(xhr.responseText);

    let page = new Page({
      el: document.querySelector('[data-component=page]'),
      menuItems: menuItems
    });
  }
});

xhr.send();


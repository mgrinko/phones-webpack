'use strict';

function customFetch(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.addEventListener('load', function() {
      resolve(JSON.parse(xhr.responseText));
    });

    xhr.addEventListener('error', function(error) {
      reject(error);
    });

    xhr.send();
  });
}

var Page = require('./page');

var phonesRequest = customFetch('phones/phones.json');
phonesRequest.then(function(data) {
  let menuItems = data;

  let page = new Page({
    el: document.querySelector('[data-component=page]'),
    menuItems: menuItems
  });
});


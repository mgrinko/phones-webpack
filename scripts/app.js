'use strict';

require("babel-polyfill");

co(function* app() {
  var Page = require('./page');

  var response = yield fetch('phones/phones.json');
  var phones = yield response.json();

  new Page({
    el: document.querySelector('[data-component=page]'),
    menuItems: phones
  });
});

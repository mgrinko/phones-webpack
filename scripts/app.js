'use strict';

require("babel-polyfill");

function* app() {
  var Page = require('./page');

  var response = yield fetch('phones/phones.json');
  var phones = yield response.json();

  new Page({
    el: document.querySelector('[data-component=page]'),
    menuItems: phones
  });
}

var generator = app();
var result = generator.next();

result.value
  .then(function(data) {
    return generator.next(data);
  })
  .then(function(data) {
    return generator.next(data);
  });


//phonesRequest
//  .then(function(response) {
//    return response.json();
//  })
//  .then(function(menuItems) {
//    new Page({
//      el: document.querySelector('[data-component=page]'),
//      menuItems: menuItems
//    });
//  });



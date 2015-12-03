'use strict';

let Menu = require('./menu');
let Search = require('./search');

module.exports = class Page {
  constructor(options) {
    this._el = options.el;

    this._mainContent = this._el.querySelector('.main-content');

    this._menu = new Menu({
      el: this._el.querySelector('[data-component=menu]'),
      items: options.menuItems
    });

    this._search = new Search({
      el: this._el.querySelector('[data-component=search]')
    });

    this._menu.getElement().addEventListener('itemClick', this._onMenuItemClick.bind(this))
    this._search.getElement().addEventListener('search', this._onSearch.bind(this));
  }

  _onMenuItemClick(event) {
    var phoneRequest = this._getPhone(event.detail.phoneId);
    var mouseOutPromise = this._getMouseOutPromise();

    Promise.all([phoneRequest, mouseOutPromise])
      .then(function(data) {
        this._renderPhone(data[0]);
      }.bind(this));
      //.catch(function(error) {
      //  alert(error.message)
      //});
  }

  _getMouseOutPromise() {
    return new Promise(
      function(resolve, reject) {
        this._menu.getElement().addEventListener('mouseout', function(event) {
          resolve();
        });
      }.bind(this)
    );
  }

  _getPhone(phoneId) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();

      xhr.open('GET', 'phones/' + phoneId + '.json', true);

      xhr.addEventListener('load', function() {
        setTimeout(function() {
          resolve(JSON.parse(xhr.responseText));
        }, 5000);
      }.bind(this));

      xhr.addEventListener('error', function() {
        reject(new Error(xhr.statusText));
      });

      xhr.send();
    });
  }

  _renderPhone(data) {
    this._mainContent.innerHTML = '<img src="' + data.images[0] + '">';
  }

  _onSearch(event) {
    var field = event.target.closest('[data-component=search]');

    if (!field) {
      return;
    }

    this._menu.filterItems(event.detail.searchValue);
  }
}
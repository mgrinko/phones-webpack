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
    this._loadPhone(event.detail.phoneId);
  }

  _loadPhone(phoneId) {
    this._xhr = new XMLHttpRequest();

    this._xhr.open('GET', 'phones/' + phoneId + '.json', true);

    this._xhr.addEventListener('load', this._phoneLoaded.bind(this));

    this._xhr.send();
  }

  _phoneLoaded() {
    var data = JSON.parse(this._xhr.responseText);

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
'use strict';

let _templateFunction = require('./../templates/menu.hbs');
let _itemTemplateFunction = require('./../templates/menu-item.hbs');

module.exports = class Menu {
  constructor(options) {
    this._el = options.el;
    this._items = options.items;

    this._templateFunction = _templateFunction;
    this._itemTemplateFunction = _itemTemplateFunction;

    this._el.addEventListener('click', this._onItemClick.bind(this));

    this._render(this._items);
  }

  getElement() {
    return this._el;
  }

  filterItems(filteringValue) {
    var normalizedValues = filteringValue.toLowerCase();

    var filteredItems = this._items.filter(function(item) {
      return item.name.toLowerCase().indexOf(normalizedValues) !== -1;
    });

    this._renderItems(filteredItems);
  }

  _render() {
    this._el.innerHTML = this._templateFunction({});

    this._renderItems(this._items);
  }

  _renderItems(currentItems) {
    var list = this._el.querySelector('[data-component=menu-list]');

    list.innerHTML = '';

    currentItems.forEach(function(item) {
      list.insertAdjacentHTML('beforeEnd', this._itemTemplateFunction(item));
    }.bind(this));
  }

  _onItemClick(event) {
    var item = event.target.closest('[data-component=menu-item]');

    if (!item) {
      return ;
    }

    var eventData = {
      phoneId: item.dataset.id
    };
    var event = new CustomEvent('itemClick', { detail: eventData });

    this._el.dispatchEvent(event);
  }


}
'use strict';

let template = require('./../templates/search.hbs');

module.exports = class Search {
  constructor(options) {
    this._el = options.el;
    this._el.innerHTML = template({});

    this._el.addEventListener('input', this._onFilterInput.bind(this));
  }

  getElement() {
    return this._el;
  }

  _onFilterInput(event) {
    var field = event.target.closest('[data-component=search-field]');

    if (!field) {
      return;
    }

    this._el.dispatchEvent(new CustomEvent('search', { detail: { searchValue: field.value }} ));
  }


}
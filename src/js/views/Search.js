var templates = require('../../templates'),
	util = require('util'),
	BaseView = require('./Base'),
	SearchModel = require('../models/Search');

function SearchView() {

	var searchModel = new SearchModel(),
		options = {
			el: document.getElementById('search'),
			template: templates['search'],
			data: searchModel,
			magic: true
		};

	BaseView.call(this, options);

	this.on('create', function() {
		this._ractive.observe({
			name: searchModel.fetchConfig,
			appName: searchModel.fetchConfig,
			appVersion: searchModel.fetchConfig,
			envName: searchModel.fetchConfig,
			config: function() {
				$('.optionsPopup').popup();
			}
		}, { defer: true });
		
	});

}

util.inherits(SearchView, BaseView);

module.exports = SearchView;
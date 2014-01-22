var templates = require('../../templates'),
	util = require('util'),
	BaseView = require('./Base'),
	FindModel = require('../models/Find');

function FindView() {

	var findModel = new FindModel(),
		options = {
			el: document.getElementById('find'),
			template: templates['find'],
			data: findModel,
			magic: true
		};

	BaseView.call(this, options);

	this.on('create', function() {
		this._ractive.observe({
			name: findModel.fetchConfig,
			appName: findModel.pick,
			appVersion: findModel.pick,
			envName: findModel.pick,
			config: function() {
				$('.optionsPopup').popup();
			}
		}, { defer: true });
		
	});

}

util.inherits(FindView, BaseView);

module.exports = FindView;
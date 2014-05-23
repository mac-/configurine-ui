var templates = require('../../templates'),
	util = require('util'),
	BaseView = require('./Base'),
	FindModel = require('../models/Find');

function FindView(router) {

	var findModel = new FindModel(),
		self = this,
		options = {
			el: document.getElementById('find'),
			template: templates['find'],
			data: findModel
		};

	BaseView.call(this, options);

	this.on('create', function() {
		$('.ui.accordion').accordion({
			onOpen: function() {
				findModel.pick();
			},
			onClose: function() {
				findModel.resetPick();
			}
		});
		
		var modalElement = $('#notAuthedModal');

		this._ractive.observe({
			name: findModel.fetchConfig,
			appName: findModel.pick,
			appVersion: findModel.pick,
			envName: findModel.pick,
			config: function() {
				$('.optionsPopup').popup();
			}
		}, { defer: true });

		self._ractive.on('edit', function(event) {
			if (findModel.canWrite()) {
				router.go('/add', { data: event.context });
			}
			else {
				modalElement.modal('show');
			}
			
		});
		
		self._ractive.on('remove', function(event) {
			if (findModel.canWrite()) {
				findModel.remove(event.context.id);
			}
			else {
				modalElement.modal('show');
			}
		});

	});

}

util.inherits(FindView, BaseView);

module.exports = FindView;

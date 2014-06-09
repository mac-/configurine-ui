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
				console.log('here');
				findModel.pick();
			},
			onClose: function() {
				console.log('here2');
				findModel.resetPick();
			}
		});
		
		var modalElement = $('#notAuthedModal'),
			confirmModalElement = $('#areYouSureModal');

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
				confirmModalElement.modal('setting', 'onApprove', function() {
					findModel.remove(event.context.id);
				}).modal('show');
			}
			else {
				modalElement.modal('show');
			}
		});

	});

}

util.inherits(FindView, BaseView);

module.exports = FindView;

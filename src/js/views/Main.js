var templates = require('../../templates'),
	util = require('util'),
	BaseView = require('./Base'),
	sessionHelper = require('../helpers/Session').getInstance();

function MainView(router) {

	var self = this,
		options = {
			el: document.getElementById('application'),
			template: templates['main'],
			partials: {
				headerBar: templates['partials.headerBar'],
				mainContent: templates['partials.mainContent'],
				noAuthModal: templates['partials.unauthenticatedModal']
			},
			data: {
				isAuthenticated: sessionHelper.isAuthenticated()
			}
		};

	BaseView.call(this, options);

	this.on('create', function() {

		self._ractive.on('changeView', function(event) {
			router.go('/' + event.node.getAttribute('data-item'));
		});
	});

	sessionHelper.on('token-change', function() {
		self._ractive.set({
			isAuthenticated: sessionHelper.isAuthenticated()
		});
	});

}

util.inherits(MainView, BaseView);

module.exports = MainView;

var templates = require('../../templates'),
	util = require('util'),
	BaseView = require('./Base'),
	sessionHelper = require('../helpers/Session').getInstance();

function AuthenticateView(router) {

	var self = this,
		options = {
			el: document.getElementById('authenticate'),
			template: templates['authenticate'],
			data: {
				isAuthenticating: false
			},
			magic: true
		};

	BaseView.call(this, options);

	this.on('create', function() {

		self._ractive.on('authenticate', function(event) {

			event.context.isAuthenticating = true;
			sessionHelper.initialize($('#clientIdInput').val(), $('#clientKey').val());

			sessionHelper.getToken(function(err, token) {
				event.context.isAuthenticating = false;
				if (!err && token) {
					router.go('/add');
				}
			});
		});
	});


}

util.inherits(AuthenticateView, BaseView);

module.exports = AuthenticateView;
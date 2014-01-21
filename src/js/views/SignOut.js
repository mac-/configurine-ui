var templates = require('../../templates'),
	util = require('util'),
	BaseView = require('./Base'),
	sessionHelper = require('../helpers/Session').getInstance();

function SignOutView() {

	var options = {
			el: document.getElementById('signout'),
			template: templates['signout']
		};

	BaseView.call(this, options);

	this.on('create', function() {

		sessionHelper.clearToken();
	});


}

util.inherits(SignOutView, BaseView);

module.exports = SignOutView;
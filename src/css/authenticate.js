var _ = require('underscore');

module.exports = function(api) {
	var authenticateBox = {
		'#authenticate': {
			'margin-top': '40px'
		},
		'#authenticate div.authenticate': {
			margin: '0px auto 0px auto',
			width: '400px'
		},
		'#authenticate div.submit.button i.icon': {
			margin: '0px 0px 0px 10px'
		}
	};
	api.add(authenticateBox);
};

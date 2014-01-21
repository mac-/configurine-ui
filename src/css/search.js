var _ = require('underscore');

module.exports = function(api) {
	var search = {
		'div.search': {
			'margin-left': '20px',
			'margin-right': '20px',
			'margin-top': '20px'
		}
	};
	api.add(search);
};

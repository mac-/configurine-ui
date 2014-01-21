var _ = require('underscore');

module.exports = function(api) {
	var header = {
		'div.top.menu i.icon.search': {
			'margin': '0 .25em 0 0'
		}
	};
	api.add(header);
};

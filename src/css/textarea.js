var _ = require('underscore');

module.exports = function(api) {
	var textarea = {
		'.textarea': {
			border: '1px solid #ddd',
			'border-radius': '5px'
		}
	};
	api.add(textarea);
};

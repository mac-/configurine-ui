var _ = require('underscore');

module.exports = function(api) {
	var main = {
			'div.pushed': {
				position: 'absolute',
				top: '40px',
				bottom: '0px',
				left: '0px',
				right: '0px'
			},
			'.green': {
				color: '#A1CF64'
			},
			'.red': {
				color: '#D95C5C'
			}
		};
	api.add(main);
};

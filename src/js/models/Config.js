//var qs = require('querystring');

var Config = function(options) {
	options = options || {};

	var self = this;

	this.config = null;

	this.get = function(id) {
		if (!id) {
			return;
		}
		
		jQuery.ajax({
			type: 'GET',
			url: options.baseUrl + '/config/' + id,
			success: function(data) {
				self.config = data;
			},
			dataType: 'json',
			crossDomain: true
		});
	};

	this.create = function(entry) {
		if (!entry) {
			return;
		}
		self.config = entry;

		jQuery.ajax({
			type: 'POST',
			url: options.baseUrl + '/config',
			success: function() {
				//self.config.id = data;
			},
			dataType: 'json',
			crossDomain: true
		});
	};

	
};

module.exports = Config;

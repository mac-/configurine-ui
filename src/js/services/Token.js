var crypto = require('crypto');

var Token = function(options) {
	options = options || {};

	var self = this;

	this.get = function(clientId, key, callback) {
		if (!clientId || !key) {
			return;
		}
		var timestamp = new Date().getTime();
		
		jQuery.ajax({
			type: 'POST',
			url: options.baseUrl + '/token',
			success: function(data) {
				self.token = data['access_token'];
				if (callback) {
					callback(null, data['access_token']);
				}
			},
			error: function(jqXHR, status, error) {
				if (callback) {
					callback(error);
				}
			},
			dataType: 'json',
			data: {
				'grant_type': 'client_credentials',
				'client_id': clientId,
				timestamp: timestamp,
				signature: crypto.createHmac('sha1', key).update(clientId + ':' + timestamp).digest('hex')
			},
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			crossDomain: true
		});
	};
	
};

module.exports = Token;
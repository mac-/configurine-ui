var qs = require('querystring'),
	sessionHelper = require('../helpers/Session').getInstance();

var Config = function(options) {
	options = options || {};

	//var self = this;

	this.getById = function(id, callback) {
		if (!id) {
			return;
		}
		
		jQuery.ajax({
			type: 'GET',
			url: options.baseUrl + '/config/' + id,
			success: function(data) {
				if (callback) {
					callback(null, data);
				}
			},
			error: function(jqXHR, status, error) {
				if (callback) {
					callback(error);
				}
			},
			dataType: 'json',
			crossDomain: true
		});
	};

	this.get = function(name, appName, appVersion, envName, callback) {
		if (!name) {
			return;
		}
		var appAssociation = (appName && appVersion) ? 'application|' + appName + '|' + appVersion : '',
			envAssociation = (envName) ? 'environment|' + envName : '',
			query = {
				names: name
			};
			
		if (appAssociation) {
			query.associations = query.associations || [];
			query.associations.push(appAssociation);
		}
		if (envAssociation) {
			query.associations = query.associations || [];
			query.associations.push(envAssociation);
		}

		jQuery.ajax({
			type: 'GET',
			url: options.baseUrl + '/config?' + qs.stringify(query),
			success: function(data) {
				if (callback) {
					callback(null, data);
				}
			},
			error: function(jqXHR, status, error) {
				if (callback) {
					callback(error);
				}
			},
			dataType: 'json',
			crossDomain: true
		});
	};

	this.create = function(entry, callback) {
		if (!entry) {
			return;
		}
		sessionHelper.getToken(function(err, token) {
			jQuery.ajax({
				type: 'POST',
				url: options.baseUrl + '/config',
				success: function(data, status, jqXHR) {
					if (callback) {
						callback(null, jqXHR.getResponseHeader('location'));
					}
				},
				error: function(jqXHR, status, error) {
					if (callback) {
						callback(error);
					}
				},
				dataType: 'json',
				processData: false,
				data: JSON.stringify(entry),
				headers: {
					'Authorization': token
				},
				contentType: 'application/json; charset=UTF-8',
				crossDomain: true
			});
		});
	};

	
};

module.exports = Config;

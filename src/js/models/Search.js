var ConfigService = require('../services/Config');

var SearchModel = function(options) {
	options = options || {};
	
	var self = this,
		configService = new ConfigService({
			baseUrl: window.context.config.configurine.baseUrl
		});

	this.name = '';
	this.appName = '';
	this.appVersion = '';
	this.envName = '';
	this.config = [];

	this.count = function(arr) {
		return arr.length;
	};

	this.fetchConfig = function() {
		configService.get(self.name, self.appName, self.appVersion, self.envName, function(err, data) {
			if (err || !data  || data.length < 1) {
				if (self.config.length > 0) {
					self.config = [];
				}
				return;
			}
			self.config = data;
		});
	};

	this.formatValue = function(value) {
		if (typeof value === 'object') {
			return JSON.stringify(value);
		}
		return value;
	};

	this.formatAppAssociations = function(associations) {
		var text = '';
		for (var i = 0; i < associations.applications.length; i++) {
			text += associations.applications[i].name + '(' + associations.applications[i].versions + ')';
			if (i < associations.applications.length - 1) {
				text += ' - ';
			}
		}
		return text;
	};

	this.formatEnvAssociations = function(associations) {
		return associations.environments.toString();
	};
};

module.exports = SearchModel;

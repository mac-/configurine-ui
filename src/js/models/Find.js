var ConfigService = require('../services/Config'),
	picker = require('configurine-picker');

var FindModel = function(options) {
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
		configService.get(self.name, '', '', '', function(err, data) {
			if (err || !data  || data.length < 1) {
				if (self.config.length > 0) {
					self.config = [];
				}
				return;
			}
			self.config = data;
			self.pick();
		});
	};

	this.pick = function() {
		var i;
		if (self.appName && self.appVersion && self.envName) {
			var configObj = picker({
				names: [self.name],
				appName: self.appName,
				appVersion: self.appVersion,
				environmentName: self.envName,
				associationPriority: 'app',
				entries: self.config,
				pickField: 'id'
			});
			var pickedEntryId = configObj[self.name];
			for (i = 0; i < self.config.length; i++) {
				if (self.config[i].id === pickedEntryId) {
					self.config[i].rowClass = 'positive';
				}
				else {
					self.config[i].rowClass = '';
				}
			}
		}
		else {
			for (i = 0; i < self.config.length; i++) {
				self.config[i].rowClass = '';
			}
		}
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

module.exports = FindModel;

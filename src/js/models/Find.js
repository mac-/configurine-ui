var ConfigService = require('../services/Config'),
	_ = require('underscore'),
	picker = require('configurine-picker'),
	util = require('util'),
	EventEmitter = require('events').EventEmitter;

function FindModel(options) {
	options = options || {};
	
	var self = this,
		configService = new ConfigService({
			baseUrl: window.context.config.configurine.baseUrl
		}),
		packLater = function() {
			setTimeout(function() {
				self.pick();
			}, 100);
		};

	this.name = '';
	this.appName = '';
	this.appVersion = '';
	this.envName = '';
	this.config = [];

	this.canWrite = function() {
		return configService.canWrite();
	};
	
	this.count = function(arr) {
		return arr.length;
	};

	this.fetchConfig = function() {
		configService.get(self.name, '', '', '', function(err, data) {
			if (err || !data  || data.length < 1) {
				self.config = [];
			}
			else {
				self.config = data;
				packLater();
			}
			self.emit('property-change', 'config', data);
		});
	};

	this.remove = function(id) {
		configService.remove(id, function(err) {
			if (err) {
				return;
			}
			self.config = _.filter(self.config, function(item) {
				return item.id !== id;
			});

			packLater();
			
			self.emit('property-change', 'config', self.config);
			
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

	this.resetPick = function() {
		var i;
		for (i = 0; i < self.config.length; i++) {
			self.config[i].rowClass = '';
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
}

util.inherits(FindModel, EventEmitter);

module.exports = FindModel;

var TokenSvc = require('../services/Token'),
	util = require('util'),
	EventEmitter = require('events').EventEmitter,
	store = require('../libs/store'),
	instance;

function SessionHelper() {
	
	var self = this,
		tokenSvc = new TokenSvc({ baseUrl: window.context.config.configurine.baseUrl }),
		token = store.get('configurine_token'),
		clientId, key,
		isExpired = function(_token) {
			if (!_token) {
				return true;
			}
			var tokenParts = _token.split(':'),
				expires = 1 * tokenParts[2];

			return (new Date().getTime() >= (expires - 60000));
		};

	

	this.initialize = function(_clientId, _key) {
		clientId = _clientId;
		key = _key;
		if (clientId && key) {
			return true;
		}
		return false;
	};

	this.clearToken = function() {
		token = null;
		store.remove('configurine_token');
		self.emit('token-change', token);
	};

	this.isAuthenticated = function() {
		return !isExpired(token);
	};

	this.getToken = function(callback) {
		if (isExpired(token)) {
			if (!clientId || !key) {
				throw new Error('Session helper has not been initialized!');
			}
			tokenSvc.get(clientId, key, function(err, newToken) {
				if (err) {
					return callback(err);
				}
				token = newToken;
				store.set('configurine_token', token);
				self.emit('token-change', token);
				callback(null, token);
			});
		}
		else {
			process.nextTick(function() {
				callback(null, token);
			});
		}
	};
}

util.inherits(SessionHelper, EventEmitter);

module.exports = {

	getInstance: function() {
		if (!instance) {
			instance = new SessionHelper();
		}
		return instance;
	}
};


var http = require('http'),
	https = require('https'),
	Hapi = require('hapi'),
	Joi = require('joi'),
	_ = require('underscore'),
	//AuthenticationHelper = require('./lib/helpers/authentication.js'),
	StatsdClient = require('statsd-client'),
	startTimesFromRequestId = {},
	version = require('./package.json').version,
	controllers = require('./lib/controllers'),
	commandLineOpts = require('./options'),
	opter = require('opter'),
	parsedOpts = opter(commandLineOpts, version),
	statsdClient, server, routes, serverOptions;


var initRoutes = function(server) {
		var i, Controller, controller,
			controllerOptions = _.extend({}, parsedOpts);

		// register auth mechanism (before registering routes)
		//var authenticationHelper = new AuthenticationHelper({ loggingFunction: log });
		//server.auth(authenticationHelper.name, { implementation: authenticationHelper });
		//controllerOptions.authenticationProvider = authenticationHelper.name;

		for (var prop in controllers) {
			if (controllers.hasOwnProperty(prop)) {
				controller = new controllers[prop](controllerOptions);
				server.route(controller.getRoutes());
			}
		}
	},
	registerPlugins = function(server) {

		// keys are plugin names, values are options for that plugin
		var plugins = {
			'hapi-statsd': {
				statsdHost: parsedOpts.statsdHost,
				prefix: parsedOpts.statsdPrefix
			}
		};
		server.pack.require(plugins, function(err) {
			if (err) {
				console.log('error', 'Error loading hapi plugins', err);
			}
			console.log('info', 'Successfully loaded all plugins');
		});
	},
	getAppStatus = function() {
		//TODO: return info about the app
		return {};
	},
	
	appStartUp = function() {
		http.globalAgent.maxSockets = parsedOpts.maxSockets;
		https.globalAgent.maxSockets = parsedOpts.maxSockets;

		//set secureProtocol globally at the app startup for now... but this should probably be managed by individual modules that make outbound http calls.
		https.globalAgent.options.secureProtocol = 'SSLv3_method';

		serverOptions = {
			router: {
				isCaseSensitive: false
			},
			files: {
				relativeTo: 'cwd'
			},
			views: {
				engines: { html: 'handlebars' },
				path: __dirname + '/dist'
			},
			debug: (parsedOpts.debug) ? {request:['error','uncaught']} : undefined
		};

		server = new Hapi.Server('0.0.0.0', parsedOpts.port, serverOptions);

		registerPlugins(server);
		initRoutes(server);
		
		return server;
	},
	
	appShutDown = function(evt, err) {
		if (err) {
			statsdClient.increment('uncaught-exception');
			console.log('error', 'Event: ' + evt + ' Error: ' + err.stack);
		}
		else {
			statsdClient.increment('system-event');
			console.log('error', 'Event: ' + evt);
		}
		//TODO: shutdown code...  additional clean up, etc.
	};

var app = appStartUp();
app.start();


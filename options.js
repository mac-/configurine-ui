module.exports = {
	debug: {
		argument: 'boolean',
		defaultValue: false,
		description: 'If set to true, the app will run in debug mode, which will log exceptions caught by hapi, and run the app as a single process.',
		type: Boolean
	},
	port: {
		argument: 'number',
		defaultValue: 8080,
		description: 'The port that the application listens on',
		type: Number
	},
	maxSockets: {
		argument: 'number',
		defaultValue: 100,
		description: 'The number of simultanious outbound connections the application is allow to make',
		type: Number
	},
	'statsd.host': {
		argument: 'host',
		defaultValue: '127.0.0.1:8125',
		description: 'The statsd host (hostname and port) where metrics can be sent'
	},
	'statsd.prefix': {
		argument: 'string',
		defaultValue: 'configurine-ui',
		description: 'The prefix to add to each metric sent to statsd'
	},
	'configurine.baseUrl': {
		argument: 'string',
		description: 'The base URL that hosts an instance of Configurine'
	},
	'configurine.clientId': {
		argument: 'id',
		description: 'The client ID to authenticate with Configurine with'
	},
	'configurine.sharedKey': {
		argument: 'key',
		description: 'The shared key used to authenticate with Configurine'
	}
};
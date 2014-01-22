

module.exports = function ClientRoutesController(config) {

	var handler = function(request, reply) {
			var context = {
				path: request.path,
				config: {
					configurine: {
						baseUrl: config.configurine.baseUrl
					}
				}
			};
			reply.view('index', { debug: true, context: JSON.stringify(context) })
		},
		paths = [
			'/',
			'/find',
			'/add',
			'/authenticate',
			'/signout'
		],
		routes = [];

	paths.forEach(function(path) {
		routes.push({ path: path, method: 'GET', handler: handler });
	});

	this.getRoutes = function() {
		return routes;
	};
};
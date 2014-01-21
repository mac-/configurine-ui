

module.exports = function StaticFileController(config) {

	routes = [{
		path: '/static/{param*}',
		method: 'GET',
		handler: {
			directory: {
				path: 'dist'
			}
		}
	}];

	this.getRoutes = function() {
		return routes;
	};
};
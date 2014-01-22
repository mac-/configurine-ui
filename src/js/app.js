var Router = require('./Router'),
	router = new Router(),
	MainView = require('./views/Main'),
	FindView = require('./views/Find'),
	AddView = require('./views/Add'),
	AuthenticateView = require('./views/Authenticate'),
	SignOutView = require('./views/SignOut'),
	startingPath = window.context.path || '/';

router.addRoute('/', MainView);
router.addRoute('/find', FindView);
router.addRoute('/add', AddView);
router.addRoute('/authenticate', AuthenticateView);
router.addRoute('/signout', SignOutView);


router.go(startingPath);
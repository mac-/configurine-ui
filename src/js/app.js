var Router = require('./Router'),
	router = new Router(),
	MainView = require('./views/Main'),
	SearchView = require('./views/Search'),
	AddView = require('./views/Add'),
	AuthenticateView = require('./views/Authenticate'),
	SignOutView = require('./views/SignOut'),
	startingPath = window.context.path || '/';

router.addRoute('/', MainView);
router.addRoute('/search', SearchView);
router.addRoute('/add', AddView);
router.addRoute('/authenticate', AuthenticateView);
router.addRoute('/signout', SignOutView);


router.go(startingPath);
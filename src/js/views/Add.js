var templates = require('../../templates'),
	util = require('util'),
	BaseView = require('./Base'),
	ConfigSvc = require('../services/Config');

function AddView() {

	var self = this,
		codeMirror = null,
		configSvc = new ConfigSvc({
			baseUrl: window.context.config.configurine.baseUrl
		}),
		options = {
			el: document.getElementById('add'),
			template: templates['add']
		};

	BaseView.call(this, options);

	this.on('create', function() {

		self._ractive.on('submit', function() {
			var entry = JSON.parse(codeMirror.getValue());
			configSvc.create(entry);
		});

		codeMirror = CodeMirror(document.getElementById('codeMirror'), {
			value: '{\n\t"name": "name",\n\t"value": "value",\n\t"associations": {\n\t\t"applications": [],\n\t\t"environments": []\n\t},\n\t"isSensitive": false,\n\t"isActive": true\n}\n',
			mode:  {name: 'javascript', json: true},
			indentWithTabs: true,
			smartIndent: false
		});
	});


}

util.inherits(AddView, BaseView);

module.exports = AddView;
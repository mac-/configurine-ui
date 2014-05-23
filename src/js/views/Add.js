var templates = require('../../templates'),
	util = require('util'),
	BaseView = require('./Base'),
	ConfigSvc = require('../services/Config');

function AddView(router, context) {

	var self = this,
		codeMirror = null,
		configSvc = new ConfigSvc({
			baseUrl: window.context.config.configurine.baseUrl
		}),
		options = {
			el: document.getElementById('add'),
			template: templates['add'],
			model: {
				entryId: context.entryId
			}
		};

	BaseView.call(this, options);

	this.on('create', function() {

		var modalElement = $('#notAuthedModal');
		
		self._ractive.on('submit', function() {
			
			if (!configSvc.canWrite()) {
				return modalElement.modal('show');
			}
			
			
			var entryId = self._ractive.get('entryId');
			var entry = JSON.parse(codeMirror.getValue());
			if (entryId) {
				configSvc.update(entryId, entry);
			}
			else {
				configSvc.create(entry);
			}
		});

		codeMirror = CodeMirror(document.getElementById('codeMirror'), {
			value: '{\n\t"name": "name",\n\t"value": "value",\n\t"associations": {\n\t\t"applications": [],\n\t\t"environments": []\n\t},\n\t"isSensitive": false,\n\t"isActive": true\n}\n',
			mode:  {name: 'javascript', json: true},
			indentWithTabs: true,
			smartIndent: false
		});
	});
	
	this.on('show', function(context) {
		self._ractive.set({
			entryId: context.data.id
		});
		var clone = JSON.parse(JSON.stringify(context.data));
		delete clone.id;
		delete clone.created;
		delete clone.modified;
		delete clone.rowClass;
		codeMirror.setValue(JSON.stringify(clone, true, '\t'));
	});


}

util.inherits(AddView, BaseView);

module.exports = AddView;

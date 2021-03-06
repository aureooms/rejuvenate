import updateScripts from '../recipes/update-scripts-definition.js';

const description = 'Enable linting with xo.';

const commit = {
	type: 'config',
	scope: 'package.json',
	subject: description,
};

const scripts = {
	lint: {
		oldDefinition: 'true',
		newDefinition: 'xo',
	},
};

const dependencies = ['package.json:scripts-add-lint', 'deps:add-xo'];

const {postcondition, precondition, apply} = updateScripts({scripts});

export {description, commit, postcondition, precondition, apply, dependencies};

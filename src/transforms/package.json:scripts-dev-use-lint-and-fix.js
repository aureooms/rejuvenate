import updateScripts from '../recipes/update-scripts-definition.js';

const description = 'Lint sources in dev script using lint-and-fix script.';

const commit = {
	type: 'config',
	scope: 'package.json',
	subject: description,
};

const scripts = {
	dev: {
		oldDefinition:
			'npm run lint -- --fix && npm run cover -- -- -st --fail-fast',
		newDefinition:
			'npm run lint-and-fix && npm run cover -- -- -st --fail-fast',
	},
};

const dependencies = [
	'config:lint-setup',
	'package.json:configure-source-linting',
];

const {postcondition, precondition, apply} = updateScripts({scripts});

export {description, commit, postcondition, precondition, apply, dependencies};

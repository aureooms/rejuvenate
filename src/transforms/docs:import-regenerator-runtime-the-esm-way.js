import replace from '../lib/replace.js';
import find from '../lib/find.js';

export const description =
	'This is needed because the new ESM import syntax requires full paths.';

export const commit = {
	emoji: ':books:',
	type: 'docs',
	subject: 'Correctly import regenerator/runtime.',
};

const docs = 'doc/manual/*.md';
const needle = "import 'regenerator-runtime/runtime'";
const replacement = "import 'regenerator-runtime/runtime.js'";

export async function postcondition({read, assert, glob}) {
	const found = await find([needle], glob(docs), {read, method: find.exact});
	assert(!found);
}

export async function precondition({read, assert, glob}) {
	const found = await find([needle], glob(docs), {read, method: find.exact});
	assert(found);
}

export async function apply({read, write, glob}) {
	const operations = [[needle, () => replacement]];
	await replace(operations, glob(docs), {read, write, method: replace.all});
}

export const dependencies = [
	'replace-scoped-babel-polyfill-with-regenerator-runtime',
];

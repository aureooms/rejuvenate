import {parse, visit, print, types} from 'recast';
// Const n = types.namedTypes;
const b = types.builders;

/**
 * CodemodOne.
 *
 * @param {Iterable} visitors
 * @param {String} path
 * @param {Object} options
 */
async function codemodOne(visitors, path, {read, write}) {
	const original = await read(path);

	const ast = parse(original);
	for (const visitor of visitors) visit(ast, visitor);
	const replaced = print(ast).code;

	if (replaced !== original && write) {
		await write(path, replaced);
	}
}

/**
 * Codemod.
 *
 * @param {Array<Object>} visitors
 * @param {Iterable} paths
 * @param {Object} options
 */
async function codemod(visitors, paths, options) {
	for await (const path of paths) {
		await codemodOne(visitors, path, options);
	}
}

export default function replace(operations, paths, options) {
	const visitors = operations
		.map((options) => ({recurse: () => true, ...options}))
		.map(({filter, map, recurse}) => ({
			visitNode(path) {
				if (filter(path.node)) path.replace(map(b, path.node));
				if (!recurse(path.node)) return false;
				this.traverse(path);
			},
		}));
	return codemod(visitors, paths, options);
}
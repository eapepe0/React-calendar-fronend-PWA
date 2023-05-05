module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,ico,html,png,txt,css,js}'
	],
	swDest: 'build/sw.js',
	swSrc : 'src/sw-template.js', //* generateSW no funciona con esta propiedad
	/* ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	] */
};
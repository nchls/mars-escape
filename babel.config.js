const presets = [
	['@babel/preset-react'],
	['@babel/env', {
		targets: {
			browsers: [
				'Chrome >= 76',
				'Safari >= 12',
				'iOS >= 12',
				'Firefox >= 68',
			],
		},
		useBuiltIns: 'usage',
	}],
];

module.exports = { presets };

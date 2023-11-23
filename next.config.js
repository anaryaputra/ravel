/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development',
	runtimeCaching,
});

module.exports = withPWA({
	env: {
		API_HOST: process.env.API_HOST,
		API_ENDPOINT: process.env.API_ENDPOINT,
	},
	reactStrictMode: true,
});

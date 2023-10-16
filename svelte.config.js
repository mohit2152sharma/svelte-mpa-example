import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			strict: false,
			fallback: '404.html'
		}),
		appDir: 'appDir'
	}
};

config.paths = { base: process.argv.includes('dev') ? '' : '/svelte-mpa-example' }
export default config;

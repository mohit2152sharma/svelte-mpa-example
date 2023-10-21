# svelte-mpa-example

This repo illustrates, how to host a multi page svelte application on github pages. The crux of implementation is to do rendering on client side rather than server side.


## Introduction

To understand, how it works, let me first explain few terminologies with the help of _chatGPT_.

***Server side rendering (`ssr`)***
In SSR, the server generates the full HTML for a web page and sends it to the client. This means that when a user requests a page, the server processes the request, fetches the necessary data, and dynamically generates the HTML on the server side. The fully rendered HTML is then sent to the client's browser, where it's displayed to the user. This approach is often associated with traditional web applications.

This is how github pages work, it serves fully rendered html pages, which with dynamic routing is difficult to do. As in dynamic routing, you could have a template for blog posts, and based on the data (like different blog post titles), the application can dynamically generate URLs for each blog post. So, instead of creating individual HTML files for each post, you have a single template that's populated with content based on the requested URL.

***Client side rendering (`csr`)***
In CSR, the server sends a minimal HTML document to the client, along with JavaScript. The client's browser then executes the JavaScript to dynamically generate and render the content. This approach is common in single-page applications (SPAs) where most of the rendering and navigation happens on the client side.

## How to

1. Setup your svelte project, how you would normally do or you can follow the steps outlined [here](https://kit.svelte.dev/docs/creating-a-project)
2. Add dynamic routes to your project, as you mentioned [here](https://kit.svelte.dev/docs/creating-a-project). Since we are doing client side rendering, we will do that using `onMount` function. This runs as soon as the component has been mounted to the DOM. We will add this function to our `+page.svelte`, so as soon as the page is hit, the function renders the page. For example: 
    ```svelte

    <script>
	    import { onMount } from 'svelte';
	    import { page } from '$app/stores';

	    let data = {};
	    onMount(() => {
		    console.log('page is mounted');
		    console.log(`url is ${$page.url}`);
		    let paramstr = JSON.stringify($page.params);
		    console.log(`params are ${paramstr}`);
		    data = {
			    title: $page.params.slug,
			    content: $page.params.slug
		    };
	    });
    </script>

    ```
3. We will also set `ssr=false` and `prerender=false` in `+page.js`
4. Before building the site, we will need to install `static-adapter` as shown [here](https://kit.svelte.dev/docs/adapter-static) and update the `svelte.config.js` as follows:
    ```javascript

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
		    appDir: 'appDir',
		    paths: {
			    assets: 'https://mohit2152sharma.github.io/svelte-mpa-example',
			    base: '/svelte-mpa-example',
		    }
	    }
    };

    export default config;
    ```
5. You can read more about these config parameters [here](https://kit.svelte.dev/docs/configuration), but for some of the config parameters, I will add more detail:
    - `fallback`: This is the page, the app will redirect to incase of error. The error is bound to happen, as github will look for a dynamic page to serve and since it doesn't exist, it will redirect to `fallback`. In github's case, the error page lives `404.html`. Read more [here](https://kit.svelte.dev/docs/single-page-apps#usage).
    - The `paths.assets` is `https://{github-username}.github.io/{repo-name}`. If not set, the app would throw a `TypeError: Failed to fetch dynamically imported module: https://mohit2152sharma.github.io/_app/immutable/entry/start.a84ced15.js` error. As you can see in the error, it is not using the right path to look for `.js` file, setting `paths.assets` enforces that.
    - The `paths.base` is your github repo name. The name must not end with a forward slash.
6. You can configure a `github-action` to deploy your site, to github pages, for reference you can use this repo's [github-action](https://github.com/mohit2152sharma/svelte-mpa-example/blob/main/.github/workflows/deploy.yml). You may also need to change few settings, if you are using github action.
    - Go to **Settings** tab, then **Pages** tab, and under, **Build and Deployment** section, change the **Source** to **GitHub Actions** from _Deploy from branch_. 


## Demo 

This is a light weight application, to see how it is working, you can navigate to the [homepage](https://mohit2152sharma.github.io/svelte-mpa-example) and from there, to the following links:

- `/blog/[blog-name]`: Any value you pass as a blog name will be shown on the web page. For example: [hello-world](https://mohit2152sharma.github.io/svelte-mpa-example/blog/hello-world) 
- `/qna?id={id}`: This endpoint demonstrates, how to handle query parameters. For example: [id=1](https://mohit2152sharma.github.io/svelte-mpa-example/qna?id=1)

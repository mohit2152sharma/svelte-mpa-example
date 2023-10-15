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

<h1>This is the blogs page</h1>
<h2>Title: {data.title}</h2>
<p>{data.content}</p>

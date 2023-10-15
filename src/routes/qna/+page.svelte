<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	let id;
	onMount(() => {
		console.log('page is mounted');
		console.log(`url is ${$page.url}`);
		id = $page.url.searchParams.get('id');
	});
</script>

<p>You are at the question id:{id}</p>

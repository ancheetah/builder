<script>
    import { isPreviewing, RenderContent } from '@builder.io/sdk-svelte';
    import { BUILDER_PUBLIC_API_KEY } from '../apiKey';

    export let data;
    const canShowContent = data.content || isPreviewing();
</script>

<header>
    {#if canShowContent}
		<!-- Render builder content with all required props -->
		<RenderContent
			model="header"
			content={data.content}
			apiKey={BUILDER_PUBLIC_API_KEY}
		/>
	{:else}
		Content Not Found
	{/if}
</header>
  
<slot></slot>

<div>
    <h1>SOME FOOTER</h1>
</div>
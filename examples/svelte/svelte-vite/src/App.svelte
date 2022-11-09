<script>
  import Counter from './lib/Counter.svelte';
  import Filters from './lib/Filters.svelte';
  import { getContent, isPreviewing, RenderContent } from '@builder.io/sdk-svelte';

  // Create an array of your custom components and their properties
  const CUSTOM_COMPONENTS = [
    {
      component: Counter,
      name: 'Counter',
      inputs: [
        {
          name: 'name',
          type: 'string',
          defaultValue: 'hello'
        },
        {
          name: 'count',
          type: 'number',
          defaultValue: 0
        }
      ]
    },
    {
      component: Filters,
      name: 'Filters',
      inputs: [
        {
          name: 'filters',
          type: 'list',
          defaultValue: [{ label: 'filter1' }, { label: 'filter2'}],
          onChange: (options) => {
            if (options.get('filters').length > 4) {
              options.set('filters', options.get('filters').slice(0, 4))
              alert('maximum items is 4, delete items to continue')
            }
          },
          subFields: [
            {
              name: 'label',
              type: 'text',
              defaultValue: 'Default Text'
            }
          ]
          }
        ]
    }
  ];
  // TODO: enter your public API key
  const BUILDER_PUBLIC_API_KEY = '5bcff3ed11574285aa9ac648aa7b9d87'; // ggignore

  let content = undefined;
  let canShowContent = false;
  const fetch = async () => {
    // fetch your Builder content
    content = await getContent({
      model: 'page',
      apiKey: BUILDER_PUBLIC_API_KEY,
      userAttributes: {
        urlPath: window.location.pathname || '/'
      }
    });
    // handle preview mode
    canShowContent = content || isPreviewing();
  };

  fetch();
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<main>
  <h1>
    Welcome to your new<br />Svelte app
  </h1>

  <div>Below is your Builder Content:</div>
  {#if canShowContent}
    <div>page Title: {content?.data?.title || 'Unpublished'}</div>
    <!-- Render builder content with all required props -->
    <RenderContent
      model="page"
      {content}
      apiKey={BUILDER_PUBLIC_API_KEY}
      customComponents={CUSTOM_COMPONENTS}
    />
  {:else}
    Content Not Found
  {/if}
</main>

<footer>
  <p>visit <a href="https://svelte.dev">svelte.dev</a> to learn Svelte</p>
</footer>

<style>
  h1 {
    width: 100%;
    font-size: 2rem;
    text-align: center;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
  }

  @media (min-width: 480px) {
    footer {
      padding: 40px 0;
    }
  }
</style>

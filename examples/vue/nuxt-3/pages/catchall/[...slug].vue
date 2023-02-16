<template>
  <p>Test - {{ $route.params.slug }}</p>
  <!-- <div id="home">
    <div>Hello world from your Vue project. Below is Builder Content:</div>

    <div v-if="content || isPreviewing()">
      <div>
        page title:
        {{ content?.data?.title || 'Unpublished' }}
      </div>
      <RenderContent
        model="page"
        :content="content"
        :api-key="BUILDER_PUBLIC_API_KEY"
        :customComponents="REGISTERED_COMPONENTS"
      />
    </div>
    <div v-else>Content not Found</div>
  </div> -->
</template>

<script>
  const route = useRoute();
  // import { RenderContent, getContent, isPreviewing } from '@builder.io/sdk-vue/vue3';

// import HelloWorldComponent from './components/HelloWorld.vue';

// // Register your Builder components
// const REGISTERED_COMPONENTS = [
//   {
//     component: HelloWorldComponent,
//     name: 'MyFunComponent',
//     canHaveChildren: true,
//     inputs: [
//       {
//         name: 'text',
//         type: 'string',
//         defaultValue: 'World',
//       },
//     ],
//   },
// ];

// // TODO: enter your public API key
// const BUILDER_PUBLIC_API_KEY = 'db493603bddc4c398817564aed8eef58'; // ggignore

// const route = useRoute();

// // fetch builder content data
// const { data: content } = await useAsyncData('builderData', () =>
//   getContent({
//     model: 'page',
//     apiKey: BUILDER_PUBLIC_API_KEY,
//     userAttributes: {
//       urlPath: route.path,
//     },
//   })
// );
</script>

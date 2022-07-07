import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { BuilderComponent, builder, Builder, useIsPreviewing } from '@builder.io/react'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import builderConfig from '@config/builder'
import '@builder.io/widgets'
import {MenuComponent} from '../components/MenuComponent'

builder.init(builderConfig.apiKey)

// Builder.registerComponent (MenuComponent, {
//   name: 'Menu',
//   inputs: [
//     {
//       name: 'reviews',
//       type: 'list',
//       defaultValue: [ 
//             { reviewText: 'hello' 
//      }],
//       subFields: [
// 	{
//           name: 'reviewText',
//           type: 'string',
//           defaultValue: '"You are the best"',
//         },
//         {
//           name: 'reviewAuthor',
//           type: 'string',
//           defaultValue: 'Jane Smith',
//         },
//         {
//           name: 'image',
//           type: 'file',
//           allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
//           required: true,
//           defaultValue:
//          'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
//         },
//       ],
//     }
//   ]
// })

Builder.registerComponent( MenuComponent, {
  name: "Menu",
  inputs: [
    {
      name: "menuItems",
      type: "list",
      helperText: "Main Navigation Menu Items",
      defaultValue: [{ navigationTitle: 'Navigation Title' }],
      subFields: [
        // {
        //   name: 'blocks',
        //   type: 'blocks',
        //   hideFromUI: true,
        //   helperText: 'This is an editable region where you can drag and drop blocks.',
        //   defaultValue: [
        //     {
        //       '@type': '@builder.io/sdk:Element',
        //       component: {
        //         name: 'Text',
        //         options: {
        //           text: 'Enter some text...',
        //         },
        //       },
        //     },
        //   ],
        // },
        {
          name: "navigationTitle",
          type: "string",
          required: true,
          helperText: "Main Navigation Title",
        },
        {
          name: "navigationLink",
          type: "url",
          helperText: "Main Navigation Title URL",
        }
      ],
    },
  ],
});

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ page: string[] }>) {
  const page =
    (await builder
      .get('page', {
        userAttributes: {
          urlPath: '/' + (params?.page?.join('/') || ''),
        },
      })
      .toPromise()) || null

  return {
    props: {
      page,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5,
  }
}

export async function getStaticPaths() {
  const pages = await builder.getAll('page', {
    options: { noTargeting: true },
    omit: 'data.blocks',
  })

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  }
}

export default function Page({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const isPreviewingInBuilder = useIsPreviewing()
  const show404 = !page && !isPreviewingInBuilder

  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {!page && <meta name="robots" content="noindex" />}
      </Head>
      {show404 ? (
        <DefaultErrorPage statusCode={404} />
      ) : (
        <BuilderComponent model="page" content={page} />
      )}
    </>
  )
}

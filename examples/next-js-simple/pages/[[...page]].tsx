import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { BuilderComponent, Builder, builder } from '@builder.io/react'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import '../components/SvgComponent'
import '../components/Heading'

const BUILDER_API_KEY = '79c606108cdf4936815f4736565ac6ee'
builder.init(BUILDER_API_KEY)

Builder.register('insertMenu', {
  name: 'Custom Components',
  items: [{ name: 'Heading' }, { name: 'Custom SVG' }],
})

// tells you what paths are being built
export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ page: string[] }>) {
  const page =
    (await builder
      .get('development', {
        cachebust: true,
        url: '/' + (params?.page?.join('/') || ''), //'/locales-demo',
        // userAttributes: {
        //   urlPath: '/' + (params?.page?.join('/') || ''),
        // },
      })
      .toPromise()) || null

  console.log('url ', params)

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

// returns a list
export async function getStaticPaths() {
  const pages = await builder.getAll('development', {
    options: { noTargeting: true },
    omit: 'data.blocks',
  })
  console.log(
    'PATHS: ',
    pages.map((page) => `${page.data?.url}`)
  )

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  }
}

// React Component
export default function Page({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // Use the content API to inspect how custom targeting attribute values are formatted/encoded
  // https://cdn.builder.io/api/v2/content/development?apiKey=79c606108cdf4936815f4736565ac6ee&limit=10
  builder.setUserAttributes({
    codeTarget: 'console.log("Hello World!");',
    tagTarget: 'react',
    blockTarget: {  // seems to target custom components
                    "@type": "@builder.io/sdk:Element",
                    "@version": 2,
                    "component": {
                        "name": "Heading",
                        "options": {
                            "image": "https://cdn.builder.io/api/v1/image/assets%2F79c606108cdf4936815f4736565ac6ee%2F496b67ac5f904632a51e42f8a69b42f7",
                            "title": "I am a heading!"
                        }
                    },
                    "id": "builder-394972c8ab944ee38b32f5335ec918e2"
                  },
    // DOM targeting is currently not in a working state. Can't set a value in visual editor
    locale: 'en-CA',
  })
  const router = useRouter()
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }
  const isLive = !Builder.isEditing && !Builder.isPreviewing
  if (!page && isLive) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta name="title"></meta>
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <BuilderComponent model="development" content={page} />
      {/* <BuilderComponent model="development" content={page} context={{locale: 'en-US'}}/> */}
    </>
  )
}

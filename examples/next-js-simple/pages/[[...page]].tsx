import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { BuilderComponent, Builder, builder } from '@builder.io/react'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import "../components/Heading";
import "../components/Heading_RTE"

const BUILDER_API_KEY = '79c606108cdf4936815f4736565ac6ee'
builder.init(BUILDER_API_KEY)

Builder.register('insertMenu', {
  name: 'Custom Components',
  items: [
    { name: 'Heading' },
    { name: 'Heading RTE' },
  ],
})

// tells you what paths are being built
export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ page: string[] }>) {
  builder.setUserAttributes({ locale: 'en-CA'});
  const page =
    (await builder
      .get('development', {
        cachebust: true,
        url: '/' + (params?.page?.join('/') || ''),
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

// returns a list
export async function getStaticPaths() {
  const pages = await builder.getAll('development', {
    options: { noTargeting: true },
    omit: 'data.blocks',
  })

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  }
}

// React Component
export default function Page({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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

      {/* <BuilderComponent model="development" content={page} context={{locale: 'en-US'}}/> */}
      <BuilderComponent model="development" content={page} />
    </>
  )
}

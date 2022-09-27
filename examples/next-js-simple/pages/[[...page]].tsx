import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { BuilderComponent, builder, Builder, useIsPreviewing } from '@builder.io/react/lite'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import builderConfig from '@config/builder'
import dynamic from 'next/dynamic'
// loading widgets dynamically to reduce bundle size, will only be included in bundle when is used in the content
import '@builder.io/widgets/dist/lib/builder-widgets-async'

// import Image from "../components/Image"
import "../components/Heading"

// const BUILDER_API_KEY = '79c606108cdf4936815f4736565ac6ee'
builder.init(builderConfig.apiKey)
Builder.registerComponent(
  dynamic(() => import('../components/Image')), 
  // Image,
  {
    name: 'Image',
    override: true,
    noWrap: true,
    inputs: [
      {
        friendlyName: 'Image',
        name: 'source',
        type: 'file',
        helperText: 'Select the image to display.',
        allowedFileTypes: ['jpeg', 'png', 'svg'],
    },
    {
        friendlyName: 'Alternative text',
        name: 'alt',
        type: 'string',
        helperText: 'Alternative text attribute for image',
    },
    {
        friendlyName: 'Aspect Ratio',
        name: 'aspectRatio',
        type: 'string',
        helperText: 'Image ratio expressed as width/height: insert only valid values and follow the pattern.',
        defaultValue: '16/9',
        regex: {
            // eslint-disable-next-line no-useless-escape
            pattern: '^[1-9][0-9]*\/[1-9][0-9]*$', // prettier-ignore
            options: 'i',
            message: 'Invalid value: please follow the pattern number/number',
        },
    },
    ],
})

Builder.register('insertMenu', {
  name: 'My Components',
  items: [
    { name: 'Heading' },
    { name: 'Image'}
  ],
})

// MyImage.jsx


const locale = 'en-US'

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ page: string[] }>) {
  const page =
    (await builder
      .get('development', {
        options: { locale },
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
  const pages = await builder.getAll('development', {
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
        <BuilderComponent model="development" content={page} locale={locale} />
      )}
    </>
  )
}

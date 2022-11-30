import React, { useEffect, useState } from 'react'
import { BuilderComponent, builder } from '@builder.io/react'

// builder.init('d6ace353ab30467a800672fad8b593a1')

const Test = () => {
  const [hero, setHero] = useState(null)

  useEffect(() => {
    builder
      .get('homepage-hero', {
        // userAttributes: {
        //   urlPath: window.location.pathname,
        // },
      })
      .toPromise()
      .then((section) => {
        console.log(section)
        setHero(section)
      })
  }, [])

  return <>{hero && <BuilderComponent model='homepage-hero' content={hero} />}</>
}

export default Test

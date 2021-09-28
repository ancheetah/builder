import { useState, useEffect } from 'react'
import { builder, BuilderComponent } from '@builder.io/react'
import builderConfig from '@config/builder'
builder.init(builderConfig.apiKey)

function About() {
  const [announcement, setAnnouncement] = useState()

  useEffect(() => {
    async function fetchContent() {
      const anouncementContent = await builder
        .get('announcement-bar', {
          cacheSeconds: 120,
        })
        .toPromise()
      setAnnouncement(anouncementContent)
    }
    fetchContent()
  }, [])

  return (
    <div>
      <BuilderComponent
        content={announcement}
        model="announcement-bar" />
      <div>About Page</div>
    </div>
  )
}
  
export default About
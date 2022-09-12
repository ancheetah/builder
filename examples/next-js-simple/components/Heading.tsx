import { Builder } from "@builder.io/react";
import React from 'react';
export const Heading = (props: { title: string; }) => {
  console.log(props.title);
  // --> returns a localized object:
  // {
  //   Default: "Default Heading"
  //   en-CA: "CA Heading"
  //   en-UK: "UK Heading"
  //   en-US: "US Heading"
  // }

  const locale = 'en-US';
  return(
    <div style={{'width': '50vw'}}>
      <h1>{props.title}</h1>
    </div>
  )
}

Builder.registerComponent(Heading, {
  name: "Heading",
  inputs: [
    {
      localized: true,
      name: "title",
      type: "text", 
      defaultValue: 'I am a heading!'
    },
  ],
});

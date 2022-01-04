import { Builder } from "@builder.io/react";
import React from 'react';

export const Heading = (props: { image: string; title: string; }) => {
console.log(props.image);
return(
<div style={{'width': '50vw'}}>
  <h1>{props.image}</h1>
  <img src={props.image} width='100'></img>
</div>
)
}

Builder.registerComponent(Heading, {
  name: "Heading",
  inputs: [
    {
      name: "title",
      type: "text",
      defaultValue: 'I am a heading!'
    },
    {
      name: "image",
      type: "file",
      allowedFileTypes: ['png', 'jpeg']
    },
  ],
});

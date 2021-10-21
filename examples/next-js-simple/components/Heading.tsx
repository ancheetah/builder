import { Builder } from "@builder.io/react";
import React from 'react';

export const Heading = (props: { color: any; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => <h1 style={{ color: props.color }}>{props.title}</h1>;

Builder.registerComponent(Heading, {
  name: "Heading",
  inputs: [
    {
      name: "title",
      type: "text",
      defaultValue: 'I am a heading!'
    },
    {
      name: "color",
      type: "color",
      defaultValue: 'black'
    },
  ],
});

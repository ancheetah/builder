import { Builder } from "@builder.io/react";
import React from 'react';
export const Heading = (props: { title: string; icon: string; }) => {
  console.log(JSON.stringify(props.icon));
  return(
    <span style={{display: "flex", alignItems: "center"}}>
      <img src={props.icon} width="50" height="50"/>
      <h1 style={{padding: '0.5em'}}>{props.title}</h1>
    </span>
  )
}

Builder.registerComponent(Heading, {
  name: "Heading",
  inputs: [
    {
      name: "title",
      type: "text", 
      defaultValue: 'I am a heading!',
      localized: true,
    },
    {
      name: "icon",
      type: "file",
      defaultValue: 'https://cdn.builder.io/api/v1/image/assets%2F89d6bbb44070475d9580fd22f21ef8f1%2F1ab2f86b7c5447ad9b99cb039165c15e?width=799',
      localized: true,
    }
  ],
});

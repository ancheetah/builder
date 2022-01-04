import { Builder } from "@builder.io/react";
import React from 'react';

export const SvgComponent = (props: { svgFile: string } ) => {
    console.log(props.svgFile);
    return (
        <div>
            <p>{props.svgFile}</p>
            <object data={props.svgFile} type="image/svg+xml"></object>
        </div>
    )
}

Builder.registerComponent(SvgComponent, {
  name: "Custom SVG",
  inputs: [
    {
      name: "svgFile",
      type: "file",
      allowedFileTypes: ['jpeg', 'png', 'svg']
    },
  ],
});

import {BuilderBlocks} from '@builder.io/react'
import React from 'react';

export const MenuComponent = (props) => { // needs props for parent element ID

    return <div className="my-blocks">
  
      {props.menuItems.map((menuItem, index) => {
        // console.log(props.builderBlock.id)
        return (
          <a
            key={index}
            href={menuItem?.navigationLink}
            id={menuItem?.navigationTitle}
          >
            {menuItem.navigationTitle}
            <BuilderBlocks
              key={index}
              child
              parentElementId={props.builderBlock && props.builderBlock.id}
              blocks={menuItem.blocks}
              dataPath={`component.options.menuItems.${index}.blocks`}
            />
          </a>
        );
      })}
    
    </div>
  }



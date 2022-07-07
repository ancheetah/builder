import {BuilderBlocks} from '@builder.io/react'
import React from 'react';

export const MenuComponent = (props) => {
  console.log('props = ', props.menuItems);
  // const menuItems = props.menuItems;

  // return props.menuItems.map( item => <h1>{item.navigationTitle}</h1>)  

  // return props.reviews.map(review => <h1>{review.reviewText}</h1>);

    return <div className="my-blocks">
  
      {props.menuItems.map((menuItem, index) => {
        console.log(props.menuItems.builderBlock, menuItem.blocks) //, props.menuItems.builderBlock.id)
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
              parentElementId={props.menuItems.builderBlock && props.menuItems.builderBlock.id}
              blocks={menuItem.blocks}
              dataPath={`component.options.menuItems.${index}.blocks`}
            />
          </a>
        );
      })}
    
    </div>
  }



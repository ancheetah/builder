import React from 'react';
import NextImage from 'next/image';

function Image (props: any) {
    // return <img src={props.source} width="100" height="100" {...props.attributes}/>
    return <NextImage 
        src={props.source}  
        alt={props.alt}
        layout="fill"
        objectFit="cover"
        loading="lazy"
        {...props.attributes}
    />
} 

export default Image;
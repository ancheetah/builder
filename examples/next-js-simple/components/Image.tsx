import React from 'react';

function Image (props: any) {
    return <img src={props.source} width="100" height="100" {...props.attributes}/>
} 

export default Image;
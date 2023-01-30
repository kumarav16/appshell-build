import React from 'react';
import MainComponent from './MainComponent';

const Container=(props)=>(
    <div className={props.classname} style={props.style}>
      {props.children}
    </div>
)
export default Container;

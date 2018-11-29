import React from 'react';

import classes from './Button.css';

const button = (props) => (
    <div>
        <button
            className={[classes.Button, classes[props.btnType]].join(' ')}
            disabled={props.disabled} onClick={props.clicked}>{props.children}</button>
            <p>{props.disabled}</p>
    </div>
);

export default button;
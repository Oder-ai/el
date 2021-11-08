import React from 'react';
import classes from './Button.module.css'

const Button = ({children, formValid, marginTop, ...props}) => {

    let style = {}
    if (formValid) {
        style = classes.button
    } else {
        style = classes.disabledButton
    }

    return (
        <button className={style} style={marginTop} {...props}>
            {children}
        </button>
    );
};

export default Button;
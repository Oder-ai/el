import React from 'react';
import cl from './ActionButton.module.css'

const ActionButton = ({children, ...props}) => {
    return (
        <button {...props} className={cl.button}>
            {children}
        </button>
    );
};

export default ActionButton;
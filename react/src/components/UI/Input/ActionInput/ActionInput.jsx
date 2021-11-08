import React from 'react';
import cl from './ActionInput.module.css'

const ActionInput = (props) => {
    return (
        <>
            <input className={cl.input} {...props}/>
        </>
    );
};

export default ActionInput;
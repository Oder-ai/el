import React, {useState} from 'react';
import classes from './AuthInput.module.css'

const AuthInput = ({onChange, onBlur, isDirty, marginTop, fontSize, fontWeight, header, errors, ...props}) => {

    if (!onBlur) {
        onBlur = () => {}
    }

    return (
        <div className={classes.container}>
            <span className={classes.header} style={{marginTop, fontSize, fontWeight}}>
                {header}
            </span>
            <input onBlur={() => onBlur()} onChange={e => onChange(e)} className={classes.input} {...props}>

            </input>

            <div className={classes.error_wrapper}>
                {isDirty ? errors.map(error => {
                    return Object.values(error)[0] ?
                        <span key={error.index} className={classes.error}>
                            {error.error}
                        </span>
                        :
                        ''
                })
                :
                ''}
            </div>
        </div>
    );
};

export default AuthInput;
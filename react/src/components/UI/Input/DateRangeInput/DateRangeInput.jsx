import React from 'react';
import cl from './DateRangeInput.module.css'
import DateSvg from "../../Svg/DateSvg";

const DateRangeInput = (props) => {
    return (
        <div className={cl.input_wrapper}>
            <div className={cl.icon_wrapper}>
                <DateSvg className={cl.icon}/>
            </div>
            <input type="text" className={cl.input} {...props}/>
        </div>
    );
};

export default DateRangeInput;
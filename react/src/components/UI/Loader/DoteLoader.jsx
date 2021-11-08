import React from 'react';
import cl from './DoteLoader.module.css'
const DoteLoader = (props) => {
    return (
        <div className={cl.ldsEllipsis} {...props}>
            <div className={cl.div1}></div>
            <div className={cl.div2}></div>
            <div className={cl.div3}></div>
            <div className={cl.div4}></div>
        </div>
    );
};

export default DoteLoader;
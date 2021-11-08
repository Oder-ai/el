import React, {useContext, useState} from 'react';
import classes from "../AuthInput/AuthInput.module.css";
import cl from './ProductSelect.module.css'
import ActionInput from "../ActionInput/ActionInput";
import Select from "../../Svg/Select";
import {Context} from "../../../../index";

const AuthInputSelect = ({onChange, onSelect, onBlur, isDirty, errors, header, products, value, ...props}) => {

    const [optionsActive, setOptionsActive] = useState(false)

    return (
        <div className={classes.container}>
            <span className={classes.header}>
                {header}
            </span>
            <div style={{display: 'flex', position: 'relative'}}>
                <div className={cl.order_select}>
                    <ActionInput
                        type='text'
                        style={{borderRadius: '6px', width: 250}}
                        {...props}
                        placeholder='Выберите цвет'
                        value={
                            value ?
                                value.text
                                :
                                ''
                        }
                        onClick={() => setOptionsActive(true)}
                        // onChange={(e) => {
                        //     onChange(e)
                        // }}
                    />
                    <Select
                        onClick={() => setOptionsActive(true)}
                        className={cl.select}
                    />
                    {optionsActive ?
                        <div className={cl.order_items}
                             tabIndex={ 0 }
                             onMouseLeave={() => {
                                 onBlur()
                                 setOptionsActive(false)
                             }}
                        >
                            {products.map((product, index, list) =>
                                <div
                                    key={product.id}
                                    onClick={() => {
                                        onSelect({
                                            text: `${product.product_article} (${product.product_color})`,
                                            id: product.id
                                        })
                                        setOptionsActive(false)
                                    }}
                                    className={(() => {
                                        if (index === 0) {
                                            return cl.order_item_first
                                        } else if (index === list.length - 1) {
                                            return (cl.order_item_last)
                                        } else {
                                            return (cl.order_item)
                                        }
                                    })()
                                    }
                                >
                                    {product.product_article} ({product.product_color})
                                </div>
                            )}
                        </div>
                        :
                        ''
                    }
                </div>
            </div>

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

export default AuthInputSelect;
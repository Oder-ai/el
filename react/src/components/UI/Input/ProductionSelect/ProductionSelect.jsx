import React, {useContext, useState} from 'react';
import classes from "../AuthInput/AuthInput.module.css";
import cl from './ProductionSelect.module.css'
import ActionInput from "../ActionInput/ActionInput";
import Select from "../../Svg/Select";
import {Context} from "../../../../index";

const ProductionSelect = ({value,onChange, onSelect, onBlur, isDirty, marginTop, fontSize, fontWeight, header, errors, ...props}) => {

    const {Products} = useContext(Context);
    const {ProductionItems} = useContext(Context);

    const [categoryActive, setCategoryActive] = useState(false)

    return (
        <div className={classes.container}>
            <span className={classes.header} style={{marginTop, fontSize, fontWeight}}>
                {header}
            </span>
            {/*<input onBlur={() => onBlur()} onChange={e => onChange(e)} className={classes.input} {...props}>*/}

            {/*</input>*/}
            <div style={{display: 'flex', position: 'relative'}}>
                <div className={cl.order_select}>
                    <ActionInput
                        type='text'
                        style={{borderRadius: '6px', width: '100%'}}
                        placeholder='Выберите цвет'
                        value={value.color}
                        onClick={() => setCategoryActive(true)}
                        // onBlur={() => setCategoryActive(false)}
                        // className=cl.category
                        // value={Realizations.params.search}
                        // onChange={(e) => Realizations.setSearch(e.target.value)}
                    />
                    <Select
                        onClick={() => setCategoryActive(true)}
                        className={cl.select}
                    />
                    {categoryActive ?
                        <div className={cl.order_items}
                             tabIndex={ 0 }
                            // onFocus={() => setCategoryActive(false)}
                             onMouseLeave={() => {
                                 onBlur()
                                 setCategoryActive(false)
                             }}
                        >
                            {ProductionItems.current_item.product_colors.map((color, index, list) =>
                                <div
                                    key={color.pk}
                                    onClick={() => {
                                        onSelect({color: color.color, id: color.pk})
                                        setCategoryActive(false)
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
                                    {color.color}
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

export default ProductionSelect;
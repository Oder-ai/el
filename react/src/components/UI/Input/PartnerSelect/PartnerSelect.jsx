import React, {useContext, useState} from 'react';
import classes from "../AuthInput/AuthInput.module.css";
import cl from './PartnerSelect.module.css'
import ActionInput from "../ActionInput/ActionInput";
import Select from "../../Svg/Select";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";

const AuthInputSelect = ({onChange, onSelect, onBlur, isDirty, errors, header, partners, value}) => {

    const [optionsActive, setOptionsActive] = useState(false)
    const {Partners} = useContext(Context);

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
                        placeholder='Выберите конрагента'
                        value={
                            value ?
                                value.text
                                :
                                ''
                        }
                        onClick={() => setOptionsActive(true)}
                        onChange={(e) => {
                            onSelect({
                                text: e.target.value,
                                id: ''
                            })
                            Partners.setSearch(e.target.value)
                        }}
                        onBlur={() => {
                            onBlur()
                        }}
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
                            {partners.map((partner, index, list) =>
                                <div
                                    key={partner.id}
                                    onClick={() => {
                                        onSelect({
                                            text: partner.name,
                                            id: partner.id
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
                                    {partner.name}
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

export default observer(AuthInputSelect);
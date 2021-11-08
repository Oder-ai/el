import React, {useContext, useEffect, useState} from 'react';
import ActionInput from "../../UI/Input/ActionInput/ActionInput";
import DateRangeInput from "../../UI/Input/DateRangeInput/DateRangeInput";
import cl from './RealizationContent.module.css'
import ActionButton from "../../UI/Button/ActionButton/ActionButton";
import TableRealizations from "../../UI/Tables/RealizationsTable/TableRealizations";
import PaginationButtons from "../../UI/PaginationButtons/PaginationButtons";

import { formatRelative, subDays } from 'date-fns'
import { es, ru } from 'date-fns/locale'
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import DoteLoader from "../../UI/Loader/DoteLoader";
import {Link} from "react-router-dom";


const RealizationContent = () => {

    const {Realizations} = useContext(Context);

    useEffect(()=>{
    }, [Realizations.params])

    useEffect(() => {
        setTimeout(async () => {
            await Realizations.getPage()
        }, 500)
    },[])


    return (
        <div className={cl.content}>
            <div className={cl.options}>
                <div className={cl.options_filter}>
                    <ActionInput
                        type='text'
                        style={{width: '100%'}}
                        placeholder='Поиск по имени или id'
                        value={Realizations.params.search}
                        onChange={(e) => Realizations.setSearch(e.target.value)}
                    />
                    <div className={cl.options_date_from}>
                        <span className={cl.date_from} style={{paddingRigth: 10}}>С</span>
                        <ActionInput
                            type='date'
                            style={{borderRadius: '0 6px 6px 0', width: '100%'}}
                            value={Realizations.params.created_at_after}
                            onChange={(e) => Realizations.setDateAfter(e.target.value)}
                        />
                    </div>
                    <div className={cl.options_date_to}>
                        <span className={cl.date_to}>ПО</span>
                        <ActionInput
                            type='date'
                            style={{borderRadius: '0 6px 6px 0', width: '100%'}}
                            value={Realizations.params.created_at_before}
                            onChange={(e) => Realizations.setDateBefor(e.target.value)}
                        />
                    </div>
                    <div className={cl.options_create}>
                        <Link to='/add-realization' style={{display: 'block', width: '100%', textDecoration: 'none'}}>
                            <ActionButton
                                style={{width: '100%'}}
                            >
                                Добавить реализацию
                            </ActionButton>
                        </Link>
                    </div>
                </div>

            </div>
            <div className={cl.table_wrapper}>
                {Realizations.items.length ?
                    <TableRealizations
                        Store={Realizations}
                        items={Realizations.items}
                    />
                    :
                    <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                        <DoteLoader/>
                    </div>
                }
            </div>
            <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end', padding: '5px 10px 10px 0'}}>
                {Realizations.items.length ?
                    <PaginationButtons
                        State={Realizations}
                    />
                    :
                    ''
                }
            </div>
        </div>
    );
};

export default observer(RealizationContent);
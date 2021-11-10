import React, {useContext, useEffect, useState} from 'react';
import ActionInput from "../../UI/Input/ActionInput/ActionInput";
import DateRangeInput from "../../UI/Input/DateRangeInput/DateRangeInput";
import cl from './ProductionsContent.module.css'
import ActionButton from "../../UI/Button/ActionButton/ActionButton";
import TableRealizations from "../../UI/Tables/RealizationsTable/TableRealizations";
import PaginationButtons from "../../UI/PaginationButtons/PaginationButtons";

import { formatRelative, subDays } from 'date-fns'
import { es, ru } from 'date-fns/locale'
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import DoteLoader from "../../UI/Loader/DoteLoader";
import {Link} from "react-router-dom";
import ProductionsTable from "../../UI/Tables/ProductionsTable/ProductionsTable";


const RealizationContent = ({setModalActive}) => {

    const {Productions} = useContext(Context);

    useEffect(() => {
        setTimeout(async () => {
            await Productions.getPage()
        }, 500)
    },[])


    return (
        <div className={cl.content}>
            <div className={cl.options}>
                <div className={cl.options_filter}>
                    <div className={cl.options_date_from}>
                        <span className={cl.date_from} style={{paddingRigth: 10}}>С</span>
                        <ActionInput
                            type='date'
                            style={{borderRadius: '0 6px 6px 0', width: '100%'}}
                            value={Productions.params.created_at_after}
                            onChange={(e) => Productions.setDateAfter(e.target.value)}
                        />
                    </div>
                    <div className={cl.options_date_to}>
                        <span className={cl.date_to}>ПО</span>
                        <ActionInput
                            type='date'
                            style={{borderRadius: '0 6px 6px 0', width: '100%'}}
                            value={Productions.params.created_at_before}
                            onChange={(e) => Productions.setDateBefor(e.target.value)}
                        />
                    </div>
                    <Link to='/add-production' style={{display: 'inline-block', textDecoration: 'none'}}>
                        <ActionButton
                            style={{width: '100%'}}
                        >
                            Добавить выработку
                        </ActionButton>
                    </Link>
                </div>

            </div>
            <div className={cl.table_wrapper}>
                {Productions.items.length ?
                    <ProductionsTable
                        Store={Productions}
                        items={Productions.items}
                        setModalActive={setModalActive}
                    />
                    :
                    <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                        <DoteLoader/>
                    </div>
                }
            </div>
            <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end', padding: '5px 10px 10px 0'}}>
                {Productions.items.length ?
                    <PaginationButtons
                        State={Productions}
                    />
                    :
                    ''
                }
            </div>
        </div>
    );
};

export default observer(RealizationContent);
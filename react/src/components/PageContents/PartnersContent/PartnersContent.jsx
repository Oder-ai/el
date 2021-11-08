import React, {useContext, useEffect, useState} from 'react';
import ActionInput from "../../UI/Input/ActionInput/ActionInput";
import DateRangeInput from "../../UI/Input/DateRangeInput/DateRangeInput";
import cl from './PartnersContent.module.css'
import ActionButton from "../../UI/Button/ActionButton/ActionButton";
import TableRealizations from "../../UI/Tables/RealizationsTable/TableRealizations";
import PaginationButtons from "../../UI/PaginationButtons/PaginationButtons";

import { formatRelative, subDays } from 'date-fns'
import { es, ru } from 'date-fns/locale'
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import DoteLoader from "../../UI/Loader/DoteLoader";
import {Link} from "react-router-dom";
import PartnersTable from "../../UI/Tables/PartnersTable/PartnersTable";


const PartnersContent = ({setModalState}) => {

    const {PartnersPage} = useContext(Context);

    useEffect(() => {
        setTimeout(async () => {
            await PartnersPage.getPage()
        }, 500)
    },[])


    return (
        <div className={cl.content}>
            <div className={cl.options}>
                    <ActionInput
                        type='text'
                        placeholder='Поиск по имени или id'
                        style={{width: '100%'}}
                        value={PartnersPage.params.search}
                        onChange={(e) => PartnersPage.setSearch(e.target.value)}
                    />
                    <ActionButton onClick={() => setModalState(true)}>
                        Добавить контрагента
                    </ActionButton>
            </div>
            <div className={cl.table_wrapper}>
                {PartnersPage.items.length ?
                    <PartnersTable
                        Store={PartnersPage}
                        items={PartnersPage.items}
                    />
                    :
                    <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                        <DoteLoader/>
                    </div>
                }
            </div>
            <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end', padding: '5px 10px 10px 0'}}>
                {PartnersPage.items.length ?
                    <PaginationButtons
                        State={PartnersPage}
                    />
                    :
                    ''
                }
            </div>
        </div>
    );
};

export default observer(PartnersContent);
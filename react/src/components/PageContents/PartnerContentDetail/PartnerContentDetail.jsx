import React, {useContext, useEffect, useState} from 'react';
import cl from './PartnerContentDetail.module.css'
import {Context} from "../../../index";
import ActionButton from "../../UI/Button/ActionButton/ActionButton";
import {observer} from "mobx-react-lite";
import ProductsTable from "../../UI/Tables/RealizationDetailTable/ProductsTable/ProductsTable";
import AuthInput from "../../UI/Input/AuthInput/AuthInput";
import Button from "../../UI/Button/AuthButton/Button";
import AuthInputSelect from "../../UI/Input/AuthInputSelect/AuthInputSelect";
import ProductSelect from "../../UI/Input/ProductSelect/ProductSelect";
import RealizationService from "../../../services/RealizationService";
import {Redirect, useHistory} from "react-router-dom";
import PayoutsTable from "../../UI/Tables/RealizationDetailTable/PayoutsTable/PayoutsTable";
import ReturnsTable from "../../UI/Tables/RealizationDetailTable/ReturnsTable/ReturnsTable";
import DoteLoader from "../../UI/Loader/DoteLoader";
import TableRealizations from "../../UI/Tables/RealizationsTable/TableRealizations";
import PaginationButtons from "../../UI/PaginationButtons/PaginationButtons";
import ActionInput from "../../UI/Input/ActionInput/ActionInput";

const PartnerContentDetail = ({isLoading}) => {

    const history = useHistory()

    const {RealizationDetail} = useContext(Context)
    const {PartnersPage} = useContext(Context)
    const {PartnerDetailRealizations} = useContext(Context)

    const [editorActive, setEditorActive] = useState(false)

    const useValidation = (value, validations) => {
        const [isEmpty, setEmpty] = useState({isEmpty: true, error: '| Заполните поле'})
        // const [minLength, setMinLength] = useState({minLength: true, error: '| Поле должно содержать не менее 3 символов'})
        const [inputValid, setInputValid] = useState(false)

        useEffect(() => {
            for (const validation in validations) {
                switch (validation) {
                    // case 'minLength':
                    //     value.length < validations[validation]
                    //         ?
                    //         setMinLength({...minLength, minLength: true})
                    //         :
                    //         setMinLength({...minLength, minLength: false})
                    //     break
                    case 'isEmpty':
                        value
                            ?
                            setEmpty({...isEmpty, isEmpty: false})
                            :
                            setEmpty({...isEmpty, isEmpty: true})
                        break
                }
            }
        }, [value])

        useEffect(() => {
            if (isEmpty.isEmpty) {
                setInputValid(false)
            } else {
                setInputValid(true)
            }
        }, [isEmpty])

        return {
            isEmpty,
            inputValid
        }

    }

    const useInput = (initialValue, validations) => {
        const [value, setValue] = useState(initialValue)
        const [isDirty, setDirty] = useState(false)
        const valid = useValidation(value, validations)

        const onChange = (e) => {
            setValue(e.target.value)
        }
        const onSelect = (value) => {
            setValue({text: value.text, id: value.id})
        }

        const onBlur = () => {
            setDirty(true)
        }

        return {
            value,
            setValue,
            onChange,
            onSelect,
            onBlur,
            isDirty,
            setDirty,
            errors: [valid.isEmpty],
            inputValid: valid.inputValid
        }

    }

    const date = useInput('', {isEmpty: true})
    const product = useInput('', {isEmpty: true})
    const sum = useInput('', {isEmpty: true})

    const formValid = date.inputValid && product.inputValid && sum.inputValid

    const formNotValid = () => {
        date.onBlur()
        product.onBlur()
        sum.onBlur()
    }

    const date_refund = useInput('', {isEmpty: true})
    const product_refund = useInput('', {isEmpty: true})
    const product_qty_refund = useInput('', {isEmpty: true})
    const sum_refund = useInput('', {isEmpty: true})


    const formValid_refund = date_refund.inputValid && product_refund.inputValid
        && product_qty_refund.inputValid && sum_refund.inputValid

    const formNotValid_refund = () => {
        date_refund.onBlur()
        product_refund.onBlur()
        product_qty_refund.onBlur()
        sum_refund.onBlur()
    }

    return (
        <div className={cl.content}>
            {isLoading ?
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: 200,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <DoteLoader/>
                </div>
                :
                <>
                <div className={cl.options}>
                    <div className={cl.header}>
                        <div style={{display: 'flex'}}>
                            <span className={cl.header_text}>Контрагент: {PartnersPage.current_partner.name}</span>
                        </div>
                    </div>
                    {/*<div style={{display: 'flex', gap: 10}}>*/}
                    {/*    {editorActive ?*/}
                    {/*        <ActionButton*/}
                    {/*            style={{backgroundColor: '#C77F7F', width: 150}}*/}
                    {/*            onClick={async () => {*/}
                    {/*                await RealizationDetail.deleteRealization(RealizationDetail.item.id)*/}
                    {/*                history.push('/realizations')*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            Удалить*/}
                    {/*        </ActionButton>*/}
                    {/*        :*/}
                    {/*        ''*/}
                    {/*    }*/}
                    {/*    {editorActive ?*/}
                    {/*        <ActionButton*/}
                    {/*            style={{width: 150}}*/}
                    {/*            onClick={() => {*/}
                    {/*                RealizationDetail.clearAllChanges()*/}
                    {/*                setEditorActive(false)*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            Отменить*/}
                    {/*        </ActionButton>*/}
                    {/*        :*/}
                    {/*        ''*/}
                    {/*    }*/}
                    {/*    {editorActive ?*/}
                    {/*        <ActionButton*/}
                    {/*            style={{backgroundColor: '#E7BB7A', width: 150}}*/}
                    {/*            onClick={async () => {*/}
                    {/*                await RealizationDetail.sendChanges()*/}
                    {/*                setEditorActive(false)*/}
                    {/*                RealizationDetail.getItem(RealizationDetail.item.id)*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            Сохранить*/}
                    {/*        </ActionButton>*/}
                    {/*        :*/}
                    {/*        ''*/}
                    {/*    }*/}
                    {/*    {!editorActive ?*/}
                    {/*        <ActionButton*/}
                    {/*            onClick={() => setEditorActive(true)}*/}
                    {/*        >*/}
                    {/*            Редактировать*/}
                    {/*        </ActionButton>*/}
                    {/*        :*/}
                    {/*        ''*/}
                    {/*    }*/}

                    {/*</div>*/}
                </div>
                <div className={cl.detail_info}>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
                        <span className={cl.header_text}>Имя: {PartnersPage.current_partner.first_name}</span>
                        <span className={cl.header_text}>Фамилия: {PartnersPage.current_partner.last_name}</span>
                        <span className={cl.header_text}>Номер: {PartnersPage.current_partner.phone_number}</span>
                        <span className={cl.header_text}>Почта: {PartnersPage.current_partner.email}</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
                        <span className={cl.header_text}>Отпущено: {PartnersPage.current_partner.released}</span>
                        <span className={cl.header_text_returned}>Возвращено: {PartnersPage.current_partner.returned}</span>
                        <span className={cl.header_text_paid}>Оплачено: {PartnersPage.current_partner.paid}</span>
                        <span className={cl.header_text_debt}>Остаток: {PartnersPage.current_partner.debt}</span>
                    </div>
                </div>
                <div className={cl.table_header_first}>
                    <span className={cl.header_text}>Реализации контрагента: {PartnersPage.current_partner.name}</span>

                </div>
                    <div className={cl.options}>
                        <div className={cl.options_date_from}>
                            <span className={cl.date_from} style={{paddingRigth: 10}}>С</span>
                            <ActionInput
                                type='date'
                                style={{borderRadius: '0 6px 6px 0', width: '100%'}}
                                value={PartnerDetailRealizations.params.created_at_after}
                                onChange={(e) => PartnerDetailRealizations.setDateAfter(e.target.value)}
                            />
                        </div>
                        <div className={cl.options_date_to}>
                            <span className={cl.date_to}>ПО</span>
                            <ActionInput
                                type='date'
                                style={{borderRadius: '0 6px 6px 0', width: '100%'}}
                                value={PartnerDetailRealizations.params.created_at_before}
                                onChange={(e) => PartnerDetailRealizations.setDateBefor(e.target.value)}
                            />
                        </div>
                    </div>
                <div className={cl.table_wrapper}>
                    {PartnerDetailRealizations.items.length ?
                        <TableRealizations
                            Store={PartnerDetailRealizations}
                            items={PartnerDetailRealizations.items}
                        />
                        :
                        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                            <DoteLoader/>
                        </div>
                    }
                </div>
                <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end', padding: '5px 10px 10px 0'}}>
                    {PartnerDetailRealizations.items.length ?
                        <PaginationButtons
                            State={PartnerDetailRealizations}
                        />
                        :
                        ''
                    }
                </div>
                </>
            }



        </div>
    );
};

export default observer(PartnerContentDetail);
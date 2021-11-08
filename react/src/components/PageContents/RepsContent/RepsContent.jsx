import React, {useContext, useEffect, useState} from 'react';
import ActionInput from "../../UI/Input/ActionInput/ActionInput";
import DateRangeInput from "../../UI/Input/DateRangeInput/DateRangeInput";
import cl from './RepsContent.module.css'
import ActionButton from "../../UI/Button/ActionButton/ActionButton";
import TableRealizations from "../../UI/Tables/RealizationsTable/TableRealizations";
import PaginationButtons from "../../UI/PaginationButtons/PaginationButtons";

import { formatRelative, subDays } from 'date-fns'
import { es, ru } from 'date-fns/locale'
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import DoteLoader from "../../UI/Loader/DoteLoader";
import {Link} from "react-router-dom";
import Select from "../../UI/Svg/Select";
import ProductSelect from "../../UI/Input/ProductSelect/ProductSelect";
import PartnerSelect from "../../UI/Input/PartnerSelect/PartnerSelect";
import AuthInput from "../../UI/Input/AuthInput/AuthInput";
import RealizationService from "../../../services/RealizationService";
import Button from "../../UI/Button/AuthButton/Button";


const RepsContent = () => {

    const {Realizations} = useContext(Context);
    const {Partners} = useContext(Context);
    const {Reps} = useContext(Context);

    useEffect(()=>{
    }, [Realizations.params])

    useEffect(() => {
        setTimeout(async () => {
            await Realizations.getPage()
        }, 500)
    },[])

    const useValidation = (value, validations) => {
        const [isEmpty, setEmpty] = useState({isEmpty: true, error: '| Заполните поле'})
        const [isPartner, setIsPartner] = useState({isPartner: true, error: '| Выберите контрагента'})
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
                    case 'isPartner':
                        value.id
                            ?
                            setIsPartner({...isPartner, isPartner: false})
                            :
                            setIsPartner({...isPartner, isPartner: true})
                        break
                }
            }
        }, [value])

        useEffect(() => {
            if (isEmpty.isEmpty && isPartner.isPartner) {
                setInputValid(false)
            } else {
                setInputValid(true)
            }
        }, [isEmpty])

        return {
            isEmpty,
            isPartner,
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
        let errors = []

        if (validations.isPartner) {
            errors = [valid.isPartner]
        } else {
            errors = [valid.isEmpty]
        }

        return {
            value,
            setValue,
            onChange,
            onSelect,
            onBlur,
            isDirty,
            setDirty,
            errors: errors,
            inputValid: valid.inputValid
        }

    }

    const dateAfter = useInput('', {isEmpty: true})
    const dateBefore = useInput('', {isEmpty: true})
    const partnerSelect = useInput('', {isEmpty: true, isPartner: true})

    const formValid = dateAfter.inputValid && dateBefore.inputValid && partnerSelect.inputValid

    const formNotValid = () => {
        dateAfter.onBlur()
        dateBefore.onBlur()
        partnerSelect.onBlur()
    }


    return (
        <div className={cl.content}>
            <div className={cl.options}>
                <div className={cl.options_filter}>
                    <div className={cl.order_select}>
                        <PartnerSelect
                            header='Контрагент'
                            partners={Partners.search_items}
                            value={partnerSelect.value}
                            onBlur={partnerSelect.onBlur}
                            onChange={partnerSelect.onChange}
                            onSelect={partnerSelect.onSelect}
                            isDirty={partnerSelect.isDirty}
                            errors={partnerSelect.errors}
                        />
                    </div>
                    <div className={cl.options_date_from}>
                        <span className={cl.date_from}>С</span>
                        <AuthInput
                            value={dateAfter.value}
                            onChange={dateAfter.onChange}
                            onBlur={dateAfter.onBlur}
                            isDirty={dateAfter.isDirty}
                            style={{
                                height: 30,
                                fontSize: 14,
                                marginBottom: 0,
                                marginTop: 17,
                                borderLeft: 'none',
                                borderRadius: '0 6px 6px 0'
                            }}
                            fontSize={14}
                            fontWeight={500}
                            errors={dateAfter.errors}
                            type='date'
                            marginTop={{marginTop: 5}}
                        />
                    </div>
                    <div className={cl.options_date_to}>
                        <span className={cl.date_to}>ПО</span>
                        <AuthInput
                            value={dateBefore.value}
                            onChange={dateBefore.onChange}
                            onBlur={dateBefore.onBlur}
                            isDirty={dateBefore.isDirty}
                            style={{
                                height: 30,
                                fontSize: 14,
                                marginBottom: 0,
                                marginTop: 17,
                                borderLeft: 'none',
                                borderRadius: '0 6px 6px 0'
                            }}
                            fontSize={14}
                            fontWeight={500}
                            errors={dateBefore.errors}
                            type='date'
                            marginTop={{marginTop: 5}}
                        />
                    </div>
                    <Button
                        style={{height: 30, width: 200, marginTop: 22}}
                        formValid={formValid}
                        onClick={async () => {
                            formNotValid()
                            if (formValid) {
                                const params = {
                                    partner: partnerSelect.value.id,
                                    created_at_after: dateAfter.value,
                                    created_at_before: dateBefore.value,
                                }
                                await Reps.getPartnerSales(params)
                                partnerSelect.setValue('')
                                partnerSelect.setDirty(false)
                                dateAfter.setValue('')
                                dateAfter.setDirty(false)
                                dateBefore.setValue('')
                                dateBefore.setDirty(false)
                            }
                        }}
                    >
                        Получить
                    </Button>
                </div>
            </div>
            {/*<div className={cl.table_wrapper}>*/}
            {/*    {Reps.reps_partner_sales.length ?*/}
            {/*        <TableRealizations*/}
            {/*            Store={Realizations}*/}
            {/*            items={Realizations.items}*/}
            {/*        />*/}
            {/*        :*/}
            {/*        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>*/}
            {/*            <DoteLoader/>*/}
            {/*        </div>*/}
            {/*    }*/}
            {/*</div>*/}

        </div>
    );
};

export default observer(RepsContent);
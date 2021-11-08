import React, {useContext, useEffect, useState} from 'react';
import cl from './RealizationDetailContent.module.css'
import {Context} from "../../../index";
import ActionButton from "../../UI/Button/ActionButton/ActionButton";
import {observer} from "mobx-react-lite";
import ProductsTable from "../../UI/Tables/RealizationDetailTable/ProductsTable/ProductsTable";
import AuthInput from "../../UI/Input/AuthInput/AuthInput";
import Button from "../../UI/Button/AuthButton/Button";
import AuthInputSelect from "../../UI/Input/AuthInputSelect/AuthInputSelect";
import ProductSelect from "../../UI/Input/ProductSelect/ProductSelect";
import RealizationService from "../../../services/RealizationService";
import {Link, Redirect, useHistory} from "react-router-dom";
import PayoutsTable from "../../UI/Tables/RealizationDetailTable/PayoutsTable/PayoutsTable";
import ReturnsTable from "../../UI/Tables/RealizationDetailTable/ReturnsTable/ReturnsTable";
import DoteLoader from "../../UI/Loader/DoteLoader";

const RealizationDetailContent = ({isLoading}) => {

    const history = useHistory()

    const {RealizationDetail} = useContext(Context)
    const {PartnersPage} = useContext(Context)

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
                            <span className={cl.header_text}>ID: {RealizationDetail.item.id}</span>
                            <div className={cl.header_RStatus}>
                                {RealizationDetail.item.status ?
                                    <div className={cl.RStatus_disabled}>
                                        Закрыта
                                    </div>
                                    :
                                    <div className={cl.RStatus_active}>
                                        В процессе
                                    </div>
                                }
                            </div>
                        </div>
                            <span
                                onClick={async () => await PartnersPage.getPartner(RealizationDetail.item.partner)}
                            >
                                <Link to={`/partners/${RealizationDetail.item.partner}`} className={cl.header_text} style={{display: 'flex', alignItems: 'center', textDecoration: 'none', cursor: 'default'}}>
                                    Контрагент: {RealizationDetail.item.partner_name}
                                </Link>
                            </span>

                    </div>
                    <div style={{display: 'flex', gap: 10}}>
                        {editorActive ?
                            <ActionButton
                                style={{backgroundColor: '#C77F7F', width: 150}}
                                onClick={async () => {
                                    await RealizationDetail.deleteRealization(RealizationDetail.item.id)
                                    history.push('/realizations')
                                }}
                            >
                                Удалить
                            </ActionButton>
                            :
                            ''
                        }
                        {editorActive ?
                            <ActionButton
                                style={{width: 150}}
                                onClick={() => {
                                    RealizationDetail.clearAllChanges()
                                    setEditorActive(false)
                                }}
                            >
                                Отменить
                            </ActionButton>
                            :
                            ''
                        }
                        {editorActive ?
                            <ActionButton
                                style={{backgroundColor: '#E7BB7A', width: 150}}
                                onClick={async () => {
                                    await RealizationDetail.sendChanges()
                                    setEditorActive(false)
                                    RealizationDetail.getItem(RealizationDetail.item.id)
                                }}
                            >
                                Сохранить
                            </ActionButton>
                            :
                            ''
                        }
                        {!editorActive ?
                            <ActionButton
                                style={{width: 150}}
                                onClick={() => setEditorActive(true)}
                            >
                                Редактировать
                            </ActionButton>
                            :
                            ''
                        }

                    </div>
                </div>
                <div className={cl.detail_info}>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
                        <span className={cl.header_text_small}>Товаров в реализации: {RealizationDetail.item.product_qty}</span>
                        <span className={cl.header_text_small}>Количество пар: {RealizationDetail.item.pairs_qty}</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
                        <span className={cl.header_text}>На общую сумму: {RealizationDetail.item.released}</span>
                        <span className={cl.header_text_returned}>Возвращено: {RealizationDetail.item.returned}</span>
                        <span className={cl.header_text_paid}>Оплачено: {RealizationDetail.item.paid}</span>
                        <span className={cl.header_text_debt}>Остаток: {RealizationDetail.item.debt}</span>
                    </div>
                </div>
                <div className={cl.table_header_first}>
                    <span className={cl.header_text}>Товары</span>
                </div>
                <div className={cl.table_wrapper}>
                    <ProductsTable items={RealizationDetail.item.products_in_realization} editorActive={editorActive}/>
                </div>
                <div className={cl.table_headerbox_first}>
                    <span className={cl.header_text}>Выплаты</span>
                    {!editorActive ?
                        <div className={cl.actions_wrapper}>
                            <AuthInput
                                value={date.value}
                                onChange={date.onChange}
                                onBlur={date.onBlur}
                                isDirty={date.isDirty}
                                style={{height: 30, fontSize: 14}}
                                header='Дата'
                                fontSize={14}
                                fontWeight={500}
                                errors={date.errors}
                                type='date'
                                marginTop={{marginTop: 5}}
                            />
                            <ProductSelect
                                header='Продукт'
                                products={RealizationDetail.item.products_in_realization}
                                value={product.value}
                                onBlur={product.onBlur}
                                onChange={product.onChange}
                                onSelect={product.onSelect}
                                isDirty={product.isDirty}
                                errors={product.errors}
                                style={{width: '100%'}}
                            />
                            <AuthInput
                                value={sum.value}
                                onChange={sum.onChange}
                                onBlur={sum.onBlur}
                                isDirty={sum.isDirty}
                                style={{height: 30, fontSize: 14}}
                                header='Сумма'
                                fontSize={14}
                                fontWeight={500}
                                errors={sum.errors}
                                placeholder='Введите число'
                                type='number'
                                marginTop={{marginTop: 5}}
                            />
                            <Button
                                style={{height: 30, width: '100%'}}
                                formValid={formValid}
                                onClick={async () => {
                                    formNotValid()
                                    if (formValid) {
                                        const data = {
                                            payout: sum.value,
                                            created_at: date.value,
                                            product: product.value.id,
                                            realization: RealizationDetail.item.id
                                        }
                                        const response = await RealizationService.postPayout(data)
                                        RealizationDetail.getItem(RealizationDetail.item.id)
                                        sum.setValue('')
                                        sum.setDirty(false)
                                        date.setValue('')
                                        date.setDirty(false)
                                        product.setValue('')
                                        product.setDirty(false)
                                    }
                                }}
                            >
                                Добавить
                            </Button>

                        </div>
                        :
                        ''
                    }

                </div>


                {RealizationDetail.item.realizations_payout.length ?
                    <div className={cl.table_wrapper} style={{maxHeight: 300, minHeight: 100, overflowY: 'auto'}}>
                        <PayoutsTable items={RealizationDetail.item.realizations_payout} editorActive={editorActive}/>
                    </div>
                    :
                    ''
                }
                <div className={cl.table_header}>
                    <span className={cl.header_text}>Возвраты</span>
                    {!editorActive ?
                        <div className={cl.actions_wrapper}>
                            <AuthInput
                                value={date_refund.value}
                                onChange={date_refund.onChange}
                                onBlur={date_refund.onBlur}
                                isDirty={date_refund.isDirty}
                                style={{height: 30, fontSize: 14}}
                                header='Дата'
                                fontSize={14}
                                fontWeight={500}
                                errors={date_refund.errors}
                                type='date'
                                marginTop={{marginTop: 5}}
                            />
                            <ProductSelect
                                header='Продукт'
                                products={RealizationDetail.item.products_in_realization}
                                value={product_refund.value}
                                onBlur={product_refund.onBlur}
                                onChange={product_refund.onChange}
                                onSelect={product_refund.onSelect}
                                isDirty={product_refund.isDirty}
                                errors={product_refund.errors}
                                style={{width: '100%'}}
                            />
                            <AuthInput
                                value={product_qty_refund.value}
                                onChange={product_qty_refund.onChange}
                                onBlur={product_qty_refund.onBlur}
                                isDirty={product_qty_refund.isDirty}
                                style={{height: 30, fontSize: 14}}
                                header='Количество пар'
                                fontSize={14}
                                fontWeight={500}
                                errors={product_qty_refund.errors}
                                placeholder='Введите число'
                                type='number'
                                marginTop={{marginTop: 5}}
                            />
                            <AuthInput
                                value={sum_refund.value}
                                onChange={sum_refund.onChange}
                                onBlur={sum_refund.onBlur}
                                isDirty={sum_refund.isDirty}
                                style={{height: 30, fontSize: 14}}
                                header='Сумма'
                                fontSize={14}
                                fontWeight={500}
                                errors={sum_refund.errors}
                                placeholder='Введите число'
                                type='number'
                                marginTop={{marginTop: 5}}
                            />
                            <Button
                                style={{height: 30, width: '100%'}}
                                formValid={formValid_refund}
                                onClick={async () => {
                                    formNotValid_refund()
                                    if (formValid_refund) {
                                        const data = {
                                            refund: sum_refund.value,
                                            product_qty: product_qty_refund.value,
                                            created_at: date_refund.value,
                                            product: product_refund.value.id,
                                            realization: RealizationDetail.item.id
                                        }
                                        const response = await RealizationService.postRefund(data)
                                        RealizationDetail.getItem(RealizationDetail.item.id)
                                        sum_refund.setValue('')
                                        sum_refund.setDirty(false)
                                        product_qty_refund.setValue('')
                                        product_qty_refund.setDirty(false)
                                        date_refund.setValue('')
                                        date_refund.setDirty(false)
                                        product_refund.setValue('')
                                        product_refund.setDirty(false)
                                    }
                                }}
                            >
                                Добавить
                            </Button>
                        </div>
                        :
                        ''
                    }
                </div>

                {RealizationDetail.item.realizations_refund.length ?
                    <div className={cl.table_wrapper} style={{maxHeight: 300, minHeight: 100, overflowY: 'auto'}}>
                        <ReturnsTable items={RealizationDetail.item.realizations_refund} editorActive={editorActive}/>
                    </div>
                    :
                    ''
                }
                </>
            }



        </div>
    );
};

export default observer(RealizationDetailContent);
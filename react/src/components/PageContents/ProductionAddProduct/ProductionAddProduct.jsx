import React, {useContext, useEffect, useState} from 'react';
import cl from './ProductionAddProduct.module.css'
import ActionInput from "../../UI/Input/ActionInput/ActionInput";
import ActionButton from "../../UI/Button/ActionButton/ActionButton";
import img from './air-zoom-alphafly-next-flyknit-mens-road-racing-shoe-fNntgL.jpg'
import test from './mXImXANMgjM.jpg'
import test2 from './i2iBuUXgEuk.jpg'
import ModalItemChoiced from "../../Carts/RealizationCarts/ModalItemChoiced/ModalItemChoiced";
import {Context} from "../../../index";
import Select from "../../UI/Svg/Select";
import {observer} from "mobx-react-lite";
import CartChoiced from "../../Carts/ProductionCarts/ChoicedCart/CartChoiced";
import ProductionService from "../../../services/ProductionService";
import {toJS} from "mobx";


const ProductionAddProduct = ({changeModal, changeProduct}) => {

    const {ProductionItems} = useContext(Context);

    const [date, setDate] = useState('')

    const [dateValid, setDateValid] = useState(true)
    const [isDirty,setIsDirty] = useState(false)

    const [fromValid, setFormValid] = useState(true)

    useEffect(() => {
        if (!dateValid) {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [dateValid])


    return (
        <div className={cl.content}>
            <div>
                <div className={cl.options}>
                    <ActionInput
                        type='date'
                        style={{borderRadius: 6, width: '100%'}}
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value)
                            if (e.target.value) {
                                setDateValid(false)
                            } else {setDateValid(true)}
                        }}
                    />
                    <ActionButton onClick={() => changeModal(true)}>
                        Выбрать товары
                    </ActionButton>
                </div>
                <div
                    className={cl.summ_wrapper}
                >
                    <span className={cl.summ}>Товаров выбрано: {ProductionItems.items.length}</span>
                    <span className={cl.summ}>Количество пар: {ProductionItems.Pairs}</span>
                </div>
                <div className={cl.products_wrapper}>
                    {ProductionItems.items ?
                        ProductionItems.items.map(item =>
                            <CartChoiced item={item} key={item.product} changeProduct={changeProduct}/>
                        )
                        :
                        ""
                    }
                </div>
            </div>
            <div style={{padding: '10px 10px', backgroundColor: '#f8f8f8'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {dateValid && isDirty ? <span className={cl.error}>| Выберите дату</span> : ''}
                    {!ProductionItems.Status && isDirty ? <span className={cl.error}>| Выберите товары</span> : ''}
                </div>
                <ActionButton
                    onClick={async () => {
                        setIsDirty(true)
                        if (fromValid && ProductionItems.Status) {
                            for (const item of ProductionItems.items) {
                                try {
                                    item.created_at = date
                                    if (item.bags === '') {
                                        item.bags = 0
                                    }
                                    if (item.packages === '') {
                                        item.packages = 0
                                    }
                                    if (item.defect_worker === '') {
                                        item.defect_worker = 0
                                    }
                                    if (item.defect_worker_sum === '') {
                                        item.defect_worker_sum = 0
                                    }
                                    if (item.defect_machine === '') {
                                        item.defect_machine = 0
                                    }
                                    if (item.defect_machine_sum === '') {
                                        item.defect_machine_sum = 0
                                    }
                                    if (item.defect_mehmed === '') {
                                        item.defect_mehmed = 0
                                    }
                                    if (item.defect_mehmed_sum === '') {
                                        item.defect_mehmed_sum = 0
                                    }
                                    ProductionService.post(item)
                                } catch (e) {
                                    console.log(e)
                                }
                            }
                            ProductionItems.clearItems()
                            setDate('')
                            setDateValid(true)
                            setFormValid(false)
                            setIsDirty(false)
                        }
                    }}
                >
                    Добавить выработку
                </ActionButton>
            </div>
        </div>
    );
};

export default observer(ProductionAddProduct);
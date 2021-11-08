import React, {useContext, useEffect, useState} from 'react';
import cl from './ModalProductAdd.module.css'
import classes from "../../../UI/Text/Text.module.css";
import AuthInput from "../../../UI/Input/AuthInput/AuthInput";
import Button from "../../../UI/Button/AuthButton/Button";
import img from './mXImXANMgjM.jpg'
import AuthInputSelect from "../../../UI/Input/AuthInputSelect/AuthInputSelect";
import {Context} from "../../../../index";
import ProductionSelect from "../../../UI/Input/ProductionSelect/ProductionSelect";
import {toJS} from "mobx";
import SliderLeftSvg from "../../../UI/Svg/SliderLeftSvg";
import SliderRightSvg from "../../../UI/Svg/SliderRightSvg";
import NoImageSvg from "../../../UI/Svg/NoImageSvg";


const ModalProductAdd = ({changeModal}) => {

    const {Products} = useContext(Context);
    const {ProductionItems} = useContext(Context);

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
            if (!validations) {
                setInputValid(true)
            }
        }, [isEmpty,])

        return {
            isEmpty,
            // minLength,
            inputValid
        }

    }

    const useInput = (initialValue, validations) => {
        const [value, setValue] = useState(initialValue)
        const [isDirty, setDirty] = useState(false)
        const valid = useValidation(value, validations)

        const onChange = (e) => {
            // setDirty(false)
            setValue(e.target.value)
        }

        const onSelect = (value) => {
            // setDirty(false)
            setValue(value)
        }

        const onBlur = () => {
            setDirty(true)
        }

        return {
            value,
            onSelect,
            onChange,
            onBlur,
            isDirty,
            errors: [valid.isEmpty],
            inputValid: valid.inputValid
        }
    }

    const product_color = useInput('', {isEmpty: true})
    const product_qty = useInput('', {isEmpty: true})
    const package_qty = useInput('', {})
    const bag_qty = useInput('', {})
    const defect_worker = useInput('', {})
    const defect_worker_sum = useInput('', {})
    const defect_machine = useInput('', {})
    const defect_machine_sum = useInput('', {})
    const defect_mehmed = useInput('', {})
    const defect_mehmed_sum = useInput('', {})

    const formValid = product_color.inputValid && product_qty.inputValid

    const formNotValid = () => {
        product_color.onBlur()
        product_qty.onBlur()
        // package_qty.onBlur()
        // bag_qty.onBlur()
        // defect_worker.onBlur()
        // defect_worker_sum.onBlur()
        // defect_machine.onBlur()
        // defect_machine_sum.onBlur()
        // defect_mehmed.onBlur()
        // defect_mehmed_sum.onBlur()
    }

    const [currentImg, setCurrentImg] = useState(0)

    const item = ProductionItems.current_item
    const setNextImg = () => {
        let count = currentImg
        count += 1
        if (count > item.product_images.length -1) {
            count = 0
        }
        setCurrentImg(count)
    }
    const setPreviousImg = () => {
        let count = currentImg
        count -= 1
        if (count < 0) {
            count = item.product_images.length -1
        }
        setCurrentImg(count)
    }

    return (
        <div className={cl.modal_wrapper} onClick={() => changeModal(false)}>
            <div className={cl.modal} onClick={e => e.stopPropagation()}>
                <span
                    className={classes.h1_ibm_plexSansBold}
                    style={{margin: '4px 0 4px 10px', fontSize: 16}}
                >
                    Добавить товар
                </span>

                <div className={cl.img_wrapper}>
                    {item.product_images.length ?
                        <>
                            <img className={cl.product_img} src={item.product_images[currentImg].image} alt=""/>
                            <div className={cl.counter}>
                                {currentImg + 1} из {item.product_images.length}
                            </div>
                            <div className={cl.left_svg_wrapper} onClick={() => setPreviousImg()}>
                                <SliderLeftSvg style={{width: '5em', height: '2em', paddingLeft: 10}}/>
                            </div>
                            <div className={cl.right_svg_wrapper} onClick={() => setNextImg()}>
                                <SliderRightSvg style={{width: '5em', height: '2em', paddingRight: 10}}/>
                            </div>
                        </>
                        :
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#f6f6f6'
                            }}
                        >
                            <NoImageSvg style={{width: '50%', height: '50%'}}/>
                        </div>
                    }

                </div>
                <div className={cl.product_validations_wrapper}>
                    <div className={cl.valitation_wrapper} style={{marginLeft: 10}}>
                        <ProductionSelect
                            value={product_color.value}
                            onChange={product_color.onChange}
                            onBlur={product_color.onBlur}
                            isDirty={product_color.isDirty}
                            style={{height: 30, fontSize: 14}}
                            onSelect={product_color.onSelect}
                            header='Цвет'
                            fontSize={14}
                            fontWeight={500}
                            errors={product_color.errors}
                            placeholder='Выберите цвет'
                        />
                        <AuthInput
                            value={package_qty.value}
                            onChange={package_qty.onChange}
                            // onBlur={package_qty.onBlur}
                            // isDirty={package_qty.isDirty}
                            style={{height: 30, fontSize: 14}}
                            header='Количество упаковок'
                            errors={package_qty.errors}
                            placeholder='Введите число'
                            marginTop={{marginTop: 5}}
                            fontSize={14}
                            fontWeight={500}
                            type='number'
                        />
                        <AuthInput
                            value={defect_worker.value}
                            onChange={defect_worker.onChange}
                            // onBlur={defect_worker.onBlur}
                            // isDirty={defect_worker.isDirty}
                            style={{height: 30, fontSize: 14}}
                            header='Брак рабочих'
                            fontSize={14}
                            fontWeight={500}
                            errors={defect_worker.errors}
                            placeholder='Введите число'
                            type='number'
                            marginTop={{marginTop: 5}}
                        />
                        <AuthInput
                            value={defect_machine.value}
                            onChange={defect_machine.onChange}
                            // onBlur={defect_machine.onBlur}
                            // isDirty={defect_machine.isDirty}
                            style={{height: 30, fontSize: 14}}
                            header='Брак станка'
                            fontSize={14}
                            fontWeight={500}
                            errors={defect_machine.errors}
                            placeholder='Введите число'
                            type='number'
                            marginTop={{marginTop: 5}}
                        />
                        <AuthInput
                            value={defect_mehmed.value}
                            onChange={defect_mehmed.onChange}
                            // onBlur={defect_mehmed.onBlur}
                            // isDirty={defect_mehmed.isDirty}
                            style={{height: 30, fontSize: 14}}
                            header='Брак Мехмед'
                            fontSize={14}
                            fontWeight={500}
                            errors={defect_mehmed.errors}
                            placeholder='Введите число'
                            type='number'
                            marginTop={{marginTop: 5}}
                        />

                    </div>
                    <div className={cl.valitation_wrapper} style={{marginRight: 10}}>
                        <AuthInput
                            value={product_qty.value}
                            onChange={product_qty.onChange}
                            onBlur={product_qty.onBlur}
                            isDirty={product_qty.isDirty}
                            style={{height: 30, fontSize: 14}}
                            header='Количество пар'
                            fontSize={14}
                            fontWeight={500}
                            errors={product_qty.errors}
                            placeholder='Введите число'
                            type='number'
                            marginTop={{marginTop: 5}}
                        />
                        <AuthInput
                            value={bag_qty.value}
                            onChange={bag_qty.onChange}
                            // onBlur={bag_qty.onBlur}
                            // isDirty={bag_qty.isDirty}
                            style={{height: 30, fontSize: 14}}
                            header='Количество мешков'
                            fontSize={14}
                            fontWeight={500}
                            errors={bag_qty.errors}
                            placeholder='Введите число'
                            type='number'
                            marginTop={{marginTop: 5}}
                        />

                        <AuthInput
                            value={defect_worker_sum.value}
                            onChange={defect_worker_sum.onChange}
                            // onBlur={defect_worker_sum.onBlur}
                            // isDirty={defect_worker_sum.isDirty}
                            style={{height: 30, fontSize: 14}}
                            header='Сумма'
                            fontSize={14}
                            fontWeight={500}
                            errors={defect_worker_sum.errors}
                            placeholder='Введите число'
                            type='number'
                            marginTop={{marginTop: 5}}
                        />

                        <AuthInput
                            value={defect_machine_sum.value}
                            onChange={defect_machine_sum.onChange}
                            // onBlur={defect_machine_sum.onBlur}
                            // isDirty={defect_machine_sum.isDirty}
                            style={{height: 30, fontSize: 14}}
                            header='Сумма'
                            fontSize={14}
                            fontWeight={500}
                            errors={defect_machine_sum.errors}
                            placeholder='Введите число'
                            type='number'
                            marginTop={{marginTop: 5}}
                        />
                        <AuthInput
                            value={defect_mehmed_sum.value}
                            onChange={defect_mehmed_sum.onChange}
                            // onBlur={defect_mehmed_sum.onBlur}
                            // isDirty={defect_mehmed_sum.isDirty}
                            style={{height: 30, fontSize: 14}}
                            header='Сумма'
                            fontSize={14}
                            fontWeight={500}
                            errors={defect_mehmed_sum.errors}
                            placeholder='Введите число'
                            type='number'
                            marginTop={{marginTop: 5}}
                        />
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        style={{height: 30,margin: 10}}
                        formValid={formValid}
                        onClick={() => {
                            formNotValid()
                            if (formValid) {
                                ProductionItems.pushItem({
                                    product: ProductionItems.current_item.pk,
                                    color: product_color.value.id,
                                    product_article: ProductionItems.current_item.article_number,
                                    product_color: product_color.value,
                                    product_colors: ProductionItems.current_item.product_colors,
                                    product_images: ProductionItems.current_item.product_images,
                                    pairs: product_qty.value,
                                    packages: package_qty.value,
                                    bags: bag_qty.value,
                                    defect_worker: defect_worker.value,
                                    defect_worker_sum: defect_worker_sum.value,
                                    defect_machine: defect_machine.value,
                                    defect_machine_sum: defect_machine_sum.value,
                                    defect_mehmed: defect_mehmed.value,
                                    defect_mehmed_sum: defect_mehmed_sum.value,
                                })
                                changeModal(false)
                            }
                            }
                        }
                    >
                        Добавить
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ModalProductAdd;
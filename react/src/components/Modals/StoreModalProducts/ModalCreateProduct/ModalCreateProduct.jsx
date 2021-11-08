import React, {useContext, useEffect, useState} from 'react';
import cl from './ModalCreateProduct.module.css'
import classes from "../../../UI/Text/Text.module.css";
import AuthInputSelect from "../../../UI/Input/AuthInputSelect/AuthInputSelect";
import AuthInput from "../../../UI/Input/AuthInput/AuthInput";
import Button from "../../../UI/Button/AuthButton/Button";
import {Context} from "../../../../index";
import CloseSvg from "../../../UI/Svg/CloseSvg";
import axios from "axios";
import {API_URL} from "../../../../http";
import CategoryService from "../../../../services/CategoryService";
import ActionInput from "../../../UI/Input/ActionInput/ActionInput";
import Select from "../../../UI/Svg/Select";
import {observer} from "mobx-react-lite";
import ActionButton from "../../../UI/Button/ActionButton/ActionButton";
import ProductService from "../../../../services/ProductService";
import ImageService from "../../../../services/ImageService";

const ModalCreateProduct = ({modalChange}) => {

    const {ProductCreate} = useContext(Context);
    const {Products} = useContext(Context);

    useEffect(() => {
        ProductCreate.getCategories()
    }, [])

    const useValidation = (value, validations) => {
        const [isEmpty, setEmpty] = useState({isEmpty: true, error: '| Заполните поле'})
        const [isCategory, setIsCategory] = useState({isCategory: true, error: '| Выберите категорию'})
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
                    case 'isCategory':
                        value.id
                            ?
                            setIsCategory({...isCategory, isCategory: false})
                            :
                            setIsCategory({...isCategory, isCategory: true})
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
            if (validations.isCategory) {
                if (isCategory.isCategory) {
                    setInputValid(false)
                } else {
                    setInputValid(true)
                }
            }
        }, [isEmpty,])

        return {
            isEmpty,
            isCategory,
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
        const onWrite = (e) => {
            const text = e.target.value
            setValue({text: text, id: ''})
            setCategoryActive(true)
            ProductCreate.setSearchCategory(text)
        }

        const onSelect = (value) => {
            // setDirty(false)
            setValue(value)
        }

        const onBlur = () => {
            setDirty(true)
        }

        let errors = []
        if (validations.isCategory) {
            errors = valid.isCategory
        } else {
            errors = valid.isEmpty
        }

        return {
            value,
            onSelect,
            onWrite,
            onChange,
            onBlur,
            isDirty,
            errors: [errors],
            inputValid: valid.inputValid
        }
    }

    const [createCategoryActive, setCreateCategoryActive] = useState(false)
    const [categoryActive, setCategoryActive] = useState(false)


    const category = useInput('', {isCategory: true})
    const createCategory = useInput('', {isEmpty: true})
    const article = useInput('', {isEmpty: true})
    const price = useInput('', {isEmpty: true})

    const formValid = !category.inputValid && !article.inputValid
    const formValidCreateCategory = createCategory.inputValid

    const formNotValid = () => {
        category.onBlur()
        article.onBlur()
    }
    const formCreateCategoryNotValid = () => {
        createCategory.onBlur()
    }


    const [values, setValues] = useState({ val: []});

    function createInputs() {
        return values.val.map((el, i) =>
            <div
                key={i}
                style={{width: '100%', display: 'flex', marginBottom: 5}}
            >
                <ActionInput
                    type="text"
                    value={el||''}
                    onChange={handleChange.bind(i)}
                    style={{width: '90%', borderRadius: '6px 0 0 6px'}}
                    placeHolder={'Введите цвет'}
                />
                <ActionButton
                    type='button'
                    style={{width: '10%', borderRadius: '0 6px 6px 0', backgroundColor: '#ce7474'}}
                    onClick={removeClick.bind(i)}
                >
                    -
                </ActionButton>
            </div>
        );
    }

    function handleChange(event) {
        let vals = [...values.val];
        vals[this] = event.target.value;
        setValues({ val: vals });
    }

    const addClick = () => {
        setValues({ val: [...values.val, '']})
    }

    const removeClick = () => {
        let vals = [...values.val];
        vals.splice(this,1);
        setValues({ val: vals });
    }

    const [sizeValues, setSizeValues] = useState({ val: []});

    function createSizeInputs() {
        return sizeValues.val.map((el, i) =>
            <div
                key={i}
                style={{width: '100%', display: 'flex', marginBottom: 5}}
            >
                <ActionInput
                    type="text"
                    value={el||''}
                    onChange={handleSizeChange.bind(i)}
                    style={{width: '90%', borderRadius: '6px 0 0 6px'}}
                    placeholder={'Введите размер'}
                />
                <ActionButton
                    type='button'
                    style={{width: '10%', borderRadius: '0 6px 6px 0', backgroundColor: '#ce7474'}}
                    onClick={removeSizeClick.bind(i)}
                >
                    -
                </ActionButton>
            </div>
        );
    }

    function handleSizeChange(event) {
        let vals = [...sizeValues.val];
        vals[this] = event.target.value;
        setSizeValues({ val: vals });
    }

    const addSizeClick = () => {
        setSizeValues({ val: [...sizeValues.val, '']})
    }

    const removeSizeClick = () => {
        let vals = [...sizeValues.val];
        vals.splice(this,1);
        setSizeValues({ val: vals });
    }


    const [images, setImages] = useState(null)

    const onImageChange = (e) => {
        setImages(e.target.files)

    }


    return (
        <div className={cl.modal_wrapper} onClick={() => modalChange(false)}>
            {createCategoryActive ?
                <div className={cl.modal_wrapper} onClick={(e) => {
                    e.stopPropagation()
                    setCreateCategoryActive(false)
                }}>
                    <div className={cl.modal} onClick={e => e.stopPropagation()}>
                        <div style={{display: 'flex', width: '100%', position: 'relative'}}>
                            <span
                                className={classes.h1_ibm_plexSansBold}
                                style={{margin: '0 0 10px 0', fontSize: 16}}
                            >
                            Создать категорию
                            </span>
                            <CloseSvg  onClick={(e) => setCreateCategoryActive(false)} style={{position: 'absolute', right: 0, top: 0, width: '1em', height: '1em', fill: '#3f3f3f'}}/>
                        </div>
                        <div className={cl.product_validations_wrapper}>
                        </div>
                        <div className={cl.valitation_wrapper}>
                            <AuthInput
                                value={createCategory.value}
                                onChange={createCategory.onChange}
                                onBlur={createCategory.onBlur}
                                isDirty={createCategory.isDirty}
                                style={{height: 30, fontSize: 14}}
                                header='Название категории'
                                errors={createCategory.errors}
                                placeholder='Введите название категории'
                                marginTop={{marginTop: 5}}
                                fontSize={14}
                                fontWeight={500}
                                type='text'
                            />
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button
                                style={{height: 30, marginTop: 10}}
                                onClick={ async () => {
                                    formCreateCategoryNotValid()
                                    if (formValidCreateCategory) {
                                        const response = await CategoryService.post({category_name: createCategory.value})
                                        const data = await response.data
                                        if (response.status === 201) {
                                            category.onSelect({text: data.category_name, id: data.id})
                                            setCreateCategoryActive(false)
                                        }
                                    }
                                }}
                            >
                                Создать
                            </Button>
                        </div>
                    </div>
                </div>
                :
                ''
            }
            <div className={cl.modal} onClick={e => e.stopPropagation()}>
                <div style={{display: 'flex', width: '100%', position: 'relative'}}>
                    <span
                        className={classes.h1_ibm_plexSansBold}
                        style={{margin: '0 0 10px 0', fontSize: 16}}
                    >
                    Создать товар
                    </span>
                    <CloseSvg  onClick={(e) => modalChange(false)} style={{position: 'absolute', right: 0, top: 0, width: '1em', height: '1em', fill: '#3f3f3f'}}/>
                </div>

                <div className={cl.product_validations_wrapper}>
                    <div className={cl.valitation_wrapper}>
                        <div className={cl.order_select}>
                            <AuthInput
                                value={category.value.text}
                                onChange={category.onWrite}
                                isDirty={category.isDirty}
                                style={{height: 30, fontSize: 14}}
                                onClick={() => setCategoryActive(true)}
                                header='Категория'
                                errors={category.errors}
                                placeholder='Выберите категорию'
                                marginTop={{marginTop: 5}}
                                fontSize={14}
                                fontWeight={500}
                                type='text'
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
                                         category.onBlur()
                                         setCategoryActive(false)
                                     }}
                                >
                                    {ProductCreate.categories.map((category_item, index, list) =>
                                        <div
                                            key={category_item.id}
                                            onClick={() => {
                                                category.onSelect({text: category_item.category_name, id: category_item.id})
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
                                            {category_item.category_name}
                                        </div>
                                    )}
                                </div>
                                :
                                ''
                            }

                        </div>

                        <Button
                            style={{height: 30, marginBottom: 10, backgroundColor: '#7a7a7a'}}
                            onClick={() => setCreateCategoryActive(true)}
                        >
                            Создать категорию
                        </Button>
                        <AuthInput
                            value={article.value}
                            onChange={article.onChange}
                            onBlur={article.onBlur}
                            isDirty={article.isDirty}
                            style={{height: 30, fontSize: 14}}
                            header='Артикул'
                            errors={article.errors}
                            placeholder='Введите текст'
                            marginTop={{marginTop: 5}}
                            fontSize={14}
                            fontWeight={500}
                            type='text'
                        />
                        <AuthInput
                            value={price.value}
                            onChange={price.onChange}
                            onBlur={price.onBlur}
                            isDirty={price.isDirty}
                            style={{height: 30, fontSize: 14}}
                            header='Цена'
                            errors={price.errors}
                            placeholder='Введите число'
                            marginTop={{marginTop: 5}}
                            fontSize={14}
                            fontWeight={500}
                            type='number'
                        />
                        <span
                            style={{
                                display: 'block',
                                margin: '0 0 5px 0',
                                fontSize: 14,
                                fontWeight: 500,
                                color: '#756F86',
                                fontFamily: 'IBM PLEX SANS',
                            }}
                        >
                            Цвета
                        </span>
                        {createInputs()}
                        <Button
                            style={{height: 30, marginBottom: 10, backgroundColor: '#7a7a7a'}}
                            onClick={() => addClick()}
                        >
                            Добавить цвет
                        </Button>
                        <span
                            style={{
                                display: 'block',
                                margin: '0 0 5px 0',
                                fontSize: 14,
                                fontWeight: 500,
                                color: '#756F86',
                                fontFamily: 'IBM PLEX SANS',
                            }}
                        >
                            Размеры
                        </span>
                        {createSizeInputs()}
                        <Button
                            style={{height: 30, marginBottom: 10, backgroundColor: '#7a7a7a'}}
                            onClick={() => addSizeClick()}
                        >
                            Добавить размер
                        </Button>
                        <ActionInput
                            type='file'
                            multiple={true}
                            onChange={(e) => onImageChange(e)}
                            style={{width: '100%', height: 25}}
                        />
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        style={{height: 30, marginTop: 10}}
                        formValid={!formValid}
                        onClick={async (e) => {
                            formNotValid()
                            if (!formValid) {
                                let product_colors = []
                                let product_sizes = []
                                if (values.val.length) {
                                    for (const color of values.val) {
                                        if (color !== '') {
                                            product_colors.push({color: color})
                                        }
                                    }
                                }
                                if (sizeValues.val.length) {
                                    for (const size of sizeValues.val) {
                                        if (size !== '') {
                                            product_sizes.push({size: size})
                                        }
                                    }
                                }
                                let price_value = 0
                                if (price.value === '') {
                                    price_value = 0
                                } else {
                                    price_value = price.value
                                }
                                const data = {
                                    category: category.value.id,
                                    article_number: article.value,
                                    price: price_value,
                                    product_colors: product_colors,
                                    product_sizes: product_sizes,
                                }
                                let response = null
                                const images_files = images
                                try {
                                    response = await ProductService.post(data)
                                } catch (e) {
                                    console.log(e)
                                }
                                try {
                                    for (const image of images) {
                                        const formData = new FormData()
                                        formData.append("image", image, image.name);
                                        formData.append("product", response.data.pk);
                                        await ImageService.post(formData)
                                    }
                                } catch (e) {
                                    console.log(e)
                                }
                                await Products.getPage()
                                modalChange(false)
                            }
                        }}
                    >
                        Создать
                    </Button>
                </div>
            </div>
        </div>
    );
};



export default observer(ModalCreateProduct);
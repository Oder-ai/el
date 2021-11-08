import React, {useContext, useEffect, useState} from 'react';
import cl from './ModalProducts.module.css'
import CloseSvg from "../../../UI/Svg/CloseSvg";
import ActionInput from "../../../UI/Input/ActionInput/ActionInput";
import UpDown from "../../../UI/Svg/UpDown";
import Select from "../../../UI/Svg/Select";
import ModalItemSelect from "../../../Carts/RealizationCarts/ModalItemSelect/ModalItemSelect";
import ModalItemChoiced from "../../../Carts/RealizationCarts/ModalItemChoiced/ModalItemChoiced";
import ActionButton from "../../../UI/Button/ActionButton/ActionButton";
import PaginationButtons from "../../../UI/PaginationButtons/PaginationButtons";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import DownSvg from "../../../UI/Svg/DownSvg";
import UpSvg from "../../../UI/Svg/UpSvg";

const ModalProducts = ({changeModal, changeModalAddProduct, changeProduct}) => {

    const {Products} = useContext(Context);

    const [modalButtonsState, setModalButtonsState] = useState(true)
    const [headerListStyle, setHeaderListStyle] = useState([cl.header_list])
    const [headerChoicedStyle, setHeaderChoicedStyle] = useState([cl.header_choiced])
    const [optionStyle, setOptionStyle] = useState([cl.modal_options])
    const [modalContentStyle, setModalContent] = useState([cl.modal_content])
    const [modalChoicedContentStyle, setModalChoicedContent] = useState([cl.modal_content_choiced])

    const [categoryActive, setCategoryActive] = useState(false)
    const [orderActive, setOrderActive] = useState(false)

    useEffect(() => {
        if (modalButtonsState) {
            setHeaderListStyle([cl.header_list])
            setHeaderChoicedStyle([cl.header_choiced])
            setOptionStyle([cl.modal_options])
            setModalContent([cl.modal_content])
            setModalChoicedContent([...modalChoicedContentStyle, cl.modal_content_choiced_off])
        } else {
            setHeaderListStyle([...headerListStyle, cl.header_list_off])
            setHeaderChoicedStyle([...headerChoicedStyle, cl.header_choiced_on])
            setOptionStyle([...optionStyle, cl.modal_options_off])
            setModalContent([...modalContentStyle, cl.modal_content_off])
            setModalChoicedContent([cl.modal_content_choiced])
        }
    }, [modalButtonsState,])

    const [svg, setSvg] = useState({icon: UpDown})
    const [currentHeader, setCurrentHeader] = useState('')
    const [counter, setCounter] = useState(0)

    const setOrderType = async (header) => {
        let count = counter
        if (header !== currentHeader) {
            setCurrentHeader(header)
            count = 0
        }
        count += 1
        if (count > 2) {
            count = 1
        }
        switch (count) {
            case 2:
                Products.setOrder(`-${header}`)
                setSvg({icon: DownSvg})
                break
            case 1:
                Products.setOrder(header)
                setSvg({icon: UpSvg})
                break
            default:
                count = 0
                Products.setOrder(header)
                setSvg({icon: UpSvg})
                break
        }
        setCounter(count)
    }

    const toggle = () => {
        setModalButtonsState(!modalButtonsState)
    }

    const closeModal = (e) => {
        changeModal(false)
    }



    return (
        <div className={cl.modal_wrapper} onClick={(e) => closeModal(e)}>
            <div className={cl.modal} onClick={e => e.stopPropagation()}>
                <div className={cl.modal_header}>
                    <div className={cl.header_buttons}>
                        <div className={headerListStyle.join(' ')} onClick={() => toggle()}>
                            Список продукции
                        </div>
                        <div className={headerChoicedStyle.join(' ')}  onClick={() => toggle()}>
                            Выбранные: {Products.choiced_product_items.length}
                        </div>
                    </div>
                    <div className={cl.header_longer}>
                    </div>
                </div>
                <div className={optionStyle.join(' ')}>
                    <ActionInput
                        type='text'
                        placeholder='Поик по аркикулу'
                        style={{width: '100%'}}
                        value={Products.params.search}
                        onChange={(e) => Products.setSearch(e.target.value)}
                        // value={Realizations.params.search}
                        // onChange={(e) => Realizations.setSearch(e.target.value)}
                    />
                        <div className={cl.order_select}>
                            <div style={{ width: '100%', position: 'relative'}}>
                                <ActionInput
                                    type='text'
                                    style={{borderRadius: '6px 0 0 6px',  width: '100%'}}
                                    placeholder='Сортировка'
                                    value={Products.params_order.text}
                                    onClick={() => setOrderActive(true)}
                                    // className=cl.category
                                    // value={Realizations.params.search}
                                    // onChange={(e) => Realizations.setSearch(e.target.value)}
                                />
                                <Select className={cl.select}/>
                            </div>
                            {orderActive ?
                                <div className={cl.order_items}
                                     tabIndex={ 0 }
                                    // onFocus={() => setCategoryActive(false)}
                                     onMouseLeave={() => setOrderActive(false)}
                                >
                                    <div
                                        onClick={() => {
                                            setOrderType('total_quantity')
                                            Products.setOrderText('По количеству')
                                            setOrderActive(false)
                                        }}
                                        className={cl.order_item_first}
                                    >
                                        По количеству
                                    </div>
                                    <div
                                        onClick={() => {
                                            setOrderType('price')
                                            Products.setOrderText('По цене')
                                            setOrderActive(false)
                                        }}
                                        className={cl.order_item}
                                    >
                                        По цене
                                    </div>
                                    <div
                                        onClick={() => {
                                            setOrderType('created_at')
                                            Products.setOrderText('По дате создания')
                                            setOrderActive(false)
                                        }}
                                        className={cl.order_item_last}
                                    >
                                        По дате создания
                                    </div>
                                </div>
                                :
                                ''
                            }
                            <div className={cl.orderer} onClick={() => setOrderType(currentHeader)}>
                                <svg.icon className={cl.icon}/>
                            </div>
                        </div>

                        <div className={cl.order_select}>
                            <ActionInput
                                type='text'
                                style={{borderRadius: '6px', width: '100%'}}
                                placeholder='Категория'
                                value={Products.params_category.category_text}
                                onChange={e => Products.setSearchCategory(e.target.value)}
                                onClick={() => setCategoryActive(true)}
                                // onBlur={() => setCategoryActive(false)}
                                // className=cl.category
                                // value={Realizations.params.search}
                                // onChange={(e) => Realizations.setSearch(e.target.value)}
                            />
                            <Select
                                onClick={() => setCategoryActive(true)}
                                className={cl.select}
                            />
                            {categoryActive ?
                                <div className={cl.order_items}
                                     tabIndex={ 0 }
                                     onMouseLeave={() => setCategoryActive(false)}
                                >
                                    {Products.categories.map((category, index, list) =>
                                        <div
                                            key={category.id}
                                            onClick={() => {
                                                Products.setCategory(category.id, category.category_name)
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
                                            {category.category_name}
                                        </div>
                                    )}
                                </div>
                                :
                                ''
                            }

                        </div>
                    {/*<span className={cl.price_option}>ЦЕНА</span>*/}
                    <div className={cl.options_price_from}>
                        <span className={cl.price_from}>ОТ</span>
                        <ActionInput
                            type='text'
                            style={{borderRadius: '0 6px 6px 0', width: '100%'}}
                            value={Products.params.min_price}
                            onChange={(e) => Products.setPriceFrom(e.target.value)}
                        />
                    </div>
                    <div className={cl.options_price_to}>
                        <span className={cl.price_to}>ДО</span>
                        <ActionInput
                            type='text'
                            style={{borderRadius: '0 6px 6px 0', width: '100%'}}
                            value={Products.params.max_price}
                            onChange={(e) => Products.setPriceTo(e.target.value)}
                        />
                    </div>
                </div>
                    <div className={modalContentStyle.join(' ')}>
                        <div className={cl.modal_content_inner}>
                            {Products.items ?
                                Products.items.map(item =>
                                    <ModalItemSelect item={item} key={item.id} onClick={changeModalAddProduct}/>
                                )
                                :
                                ''
                            }
                        </div>
                    </div>
                    <div className={modalChoicedContentStyle.join(' ')}>
                        <div className={cl.modal_content_inner}>
                            {Products.choiced_product_items ?
                                Products.choiced_product_items.map(item =>
                                    <ModalItemChoiced item={item} key={item.product} changeProduct={changeProduct}/>
                                )
                                :
                                ''
                            }
                        </div>
                    </div>
                <div className={cl.modal_footer}>
                    <div>
                        <ActionButton style={{marginLeft: 10}} onClick={() => changeModal(false)}>
                            Закрыть
                        </ActionButton>
                    </div>
                    <div>
                        <PaginationButtons State={Products} style={{marginRight: 10}}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(ModalProducts);
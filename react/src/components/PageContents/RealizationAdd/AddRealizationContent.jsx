import React, {useContext, useEffect, useState} from 'react';
import cl from './AddRealizationContent.module.css'
import ActionInput from "../../UI/Input/ActionInput/ActionInput";
import ActionButton from "../../UI/Button/ActionButton/ActionButton";
import img from './air-zoom-alphafly-next-flyknit-mens-road-racing-shoe-fNntgL.jpg'
import test from './mXImXANMgjM.jpg'
import test2 from './i2iBuUXgEuk.jpg'
import ModalItemChoiced from "../../Carts/RealizationCarts/ModalItemChoiced/ModalItemChoiced";
import {Context} from "../../../index";
import Select from "../../UI/Svg/Select";
import {observer} from "mobx-react-lite";
import RealizationAddPage from "../../../store/RealizationAddPage";


const AddRealizationContent = ({changeModal, changeAddPartnerModal, changeProduct, createdPartner}) => {

    useEffect(() => {
        setPartner(createdPartner)
    }, [createdPartner])

    const {Products} = useContext(Context);
    const {RealizationAddPage} = useContext(Context);
    const {Realizations} = useContext(Context);

    const [partner, setPartner] = useState('')
    const [date, setDate] = useState('')


    const [dateValid, setDateValid] = useState(true)
    const [partnerValid, setPartnerValid] = useState(true)
    const [isDirty,setIsDirty] = useState(false)

    const [fromValid, setFormValid] = useState(true)

    const [partnerSelect, setPartnerSelect] = useState(false)

    useEffect(() => {
        if (!dateValid && !partnerValid) {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [dateValid, partnerValid,])


    useEffect(async () => {
        await RealizationAddPage.getPartners()
    }, [])


    return (
        <div className={cl.content}>
            <div>
                <div className={cl.options}>
                    <div className={cl.options_choice}>
                        <div className={cl.options_date}>
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
                                // value={Realizations.params.created_at_after}
                                // onChange={(e) => Realizations.setDateAfter(e.target.value)}
                            />
                        </div>
                        <div className={cl.order_select}>
                            <ActionInput
                                type='text'
                                value={partner.text}
                                placeholder='???????????????? ??????????????????????'
                                style={{width: '100%'}}
                                onClick={() => setPartnerSelect(true)}
                                onChange={(e) => {
                                    setPartner({text: e.target.value, id: ''})
                                    setPartnerValid(true)
                                    RealizationAddPage.setSearch(e.target.value)
                                }}
                                // value={Realizations.params.search}
                                // onChange={(e) => Realizations.setSearch(e.target.value)}
                            />
                            <Select
                                onClick={() => setPartnerSelect(true)}
                                className={cl.select}
                            />
                            {partnerSelect && RealizationAddPage.partners ?
                                <div className={cl.order_items}
                                     tabIndex={ 0 }
                                     onMouseLeave={() => setPartnerSelect(false)}
                                >
                                    {RealizationAddPage.partners.map((partner, index, list) =>
                                        <div
                                            key={partner.id}
                                            onClick={() => {
                                                setPartnerSelect(false)
                                                setPartnerValid(false)
                                                setPartner({text: partner.name, id: partner.id})
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
                                            {partner.name}
                                        </div>
                                    )}
                                </div>
                                :
                                ''
                            }
                        </div>

                        <ActionButton
                            onClick={() => changeAddPartnerModal(true)}
                        >
                            ?????????????? ???????????? ??????????????????????
                        </ActionButton>
                        <ActionButton onClick={() => changeModal(true)}>
                            ?????????????? ????????????
                        </ActionButton>
                    </div>
                </div>
                <div
                    className={cl.summ_wrapper}
                >
                    <span className={cl.summ}>?????????????? ??????????????: {Products.choiced_product_items.length}</span>
                    <span className={cl.summ}>???????????????????? ??????: {Products.Pairs}</span>
                    <span className={cl.summ}>???? ?????????? ??????????: {Products.Summ}</span>
                </div>
                <div className={cl.products_wrapper}>
                    {Products.choiced_product_items ?
                        Products.choiced_product_items.map(item =>
                            <ModalItemChoiced item={item} key={item.product} changeProduct={changeProduct}/>
                        )
                        :
                        ""
                        // <div
                        //     style={{display: 'flex',
                        //         justifyContent: 'center',
                        //         aligItems: 'center',
                        //         width: '100%'
                        //     }}
                        // >
                        //     <h1 style={{fontSize: 18}}>???????????????? ????????????</h1>
                        // </div>
                    }
                </div>
            </div>
            <div style={{padding: '10px 10px', backgroundColor: '#f8f8f8'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {dateValid && isDirty ? <span className={cl.error}>| ???????????????? ????????</span> : ''}
                    {partnerValid && isDirty ? <span className={cl.error}>| ???????????????? ??????????????????????</span> : ''}
                    {!Products.Status && isDirty ? <span className={cl.error}>| ???????????????? ????????????</span> : ''}
                </div>
                <ActionButton
                    onClick={async () => {
                        setIsDirty(true)
                        if (fromValid && Products.Status) {
                            const status = await Realizations.postRealization({
                                date: date, partner: partner.id
                            }, Products.choiced_product_items)
                            if (status) {
                                Products.choiced_product_items = []
                                setDate('')
                            }
                            setDateValid(true)
                            setPartnerValid(true)
                            setIsDirty(false)
                            setFormValid(false)
                        }
                    }}
                >
                    ?????????????? ????????????????????
                </ActionButton>
            </div>
        </div>
    );
};

export default observer(AddRealizationContent);
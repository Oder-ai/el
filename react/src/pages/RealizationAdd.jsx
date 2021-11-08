import React, {useContext, useEffect, useState} from 'react';
import Header from "../components/UI/Header/Header";
import NavBar from "../components/UI/NavBar/NavBar";
import cl from '../styles/Realizations.module.css'
import AddRealizationContent from "../components/PageContents/RealizationAdd/AddRealizationContent";
import ModalProducts from "../components/Modals/RealizationModals/ModalProducts/ModalProducts";
import {Context} from "../index";
import ModalAddProduct from "../components/Modals/RealizationModals/ModalAddProduct/ModalAddProduct";
import ModalAddPartner from "../components/Modals/RealizationModals/ModalAddPartner/ModalAddPartner";
import ModalChangeProduct from "../components/Modals/RealizationModals/ModalChangeProduct/ModalChangeProduct";

const RealizationAdd = () => {

    const {Products} = useContext(Context);

    useEffect(() => {
        Products.getPage()
        Products.getCategories()
    },[])

    const [createdPartner, setCreatedPartner] = useState('')

    const [modalState, setModalState] = useState(false)
    const [modalProductState, setModalProductsState] = useState(false)
    const [modalProductChangeState, setModalProductChangeState] = useState(false)
    const [modalPartnerState, setModalPartnerState] = useState(false)

    return (
        <div className={cl.page}>
            <Header/>
            <div className={cl.content}>
                <NavBar page='Реализации'/>
                {/*<RealizationContent/>*/}
                <AddRealizationContent
                    changeModal={setModalState}
                    changeAddPartnerModal={setModalPartnerState}
                    changeProduct={setModalProductChangeState}
                    createdPartner={createdPartner}
                />
                {modalState ?
                    <ModalProducts
                        changeProduct={setModalProductChangeState}
                        changeModal={setModalState}
                        changeModalAddProduct={setModalProductsState}
                    />
                    :
                    ''
                }
                {modalProductState ?
                    <ModalAddProduct changeModal={setModalProductsState}/>
                    :
                    ''
                }
                {modalProductChangeState ?
                    <ModalChangeProduct changeModal={setModalProductChangeState}/>
                    :
                    ''
                }
                {modalPartnerState ?
                    <ModalAddPartner changeModal={setModalPartnerState} setCreatedPartner={setCreatedPartner}/>
                    :
                    ''
                }
            </div>
        </div>
    );
};

export default RealizationAdd;
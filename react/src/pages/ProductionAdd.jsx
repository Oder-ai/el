import React, {useContext, useEffect, useState} from 'react';
import Header from "../components/UI/Header/Header";
import NavBar from "../components/UI/NavBar/NavBar";
import cl from '../styles/Productions.module.css'
import AddRealizationContent from "../components/PageContents/RealizationAdd/AddRealizationContent";
import ModalProducts from "../components/Modals/RealizationModals/ModalProducts/ModalProducts";
import {Context} from "../index";
import ModalAddProduct from "../components/Modals/RealizationModals/ModalAddProduct/ModalAddProduct";
import ModalAddPartner from "../components/Modals/RealizationModals/ModalAddPartner/ModalAddPartner";
import ModalChangeProduct from "../components/Modals/RealizationModals/ModalChangeProduct/ModalChangeProduct";
import ProductionAddProduct from "../components/PageContents/ProductionAddProduct/ProductionAddProduct";
import ProductionModalProducts from "../components/Modals/ProductionModals/Products/ProductionModalProducts";
import ModalProductAdd from "../components/Modals/ProductionModals/ProductAdd/ModalProductAdd";
import ModalProductChange from "../components/Modals/ProductionModals/ProductChange/ModalProductChange";

const ProductionAdd = () => {

    const {Products} = useContext(Context);

    useEffect(() => {
        Products.getPage()
        Products.getCategories()
    },[])

    const [modalState, setModalState] = useState(false)
    const [modalProductState, setModalProductsState] = useState(false)
    const [modalProductChangeState, setModalProductChangeState] = useState(false)

    return (
        <div className={cl.page}>
            <Header/>
            <div className={cl.content}>
                <NavBar page='Выработка'/>
                {/*<RealizationContent/>*/}
                <ProductionAddProduct
                    changeModal={setModalState}
                    changeProduct={setModalProductChangeState}
                />
                {modalState ?
                    <ProductionModalProducts
                        changeProduct={setModalProductChangeState}
                        changeModal={setModalState}
                        changeModalAddProduct={setModalProductsState}
                    />
                    :
                    ''
                }
                {modalProductState ?
                    <ModalProductAdd changeModal={setModalProductsState}/>
                    :
                    ''
                }
                {modalProductChangeState ?
                    <ModalProductChange changeModal={setModalProductChangeState}/>
                    :
                    ''
                }

            </div>
        </div>
    );
};

export default ProductionAdd;
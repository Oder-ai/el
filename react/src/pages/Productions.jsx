import React, {useState} from 'react';
import Header from "../components/UI/Header/Header";
import NavBar from "../components/UI/NavBar/NavBar";
import cl from '../styles/Productions.module.css'
import RealizationContent from "../components/PageContents/RealizationContent/RealizationContent";
import ProductionsContent from "../components/PageContents/ProductionsContent/ProductionsContent";
import ModalProductChange from "../components/Modals/ProductionModals/ProductChange/ModalProductChange";
import FromTableProductChange
    from "../components/Modals/ProductionModals/FromTableProductChange/FromTableProductChange";

const Realizations = () => {

    const [modalActive, setModalActive] = useState(false)

    return (
        <div>
            <Header/>
            <div className={cl.content}>
                <NavBar page='Выработка'/>
                <ProductionsContent setModalActive={setModalActive}/>
            </div>
            {modalActive ?
                <FromTableProductChange changeModal={setModalActive}/>
                :
                ''
            }
        </div>
    );
};

export default Realizations;
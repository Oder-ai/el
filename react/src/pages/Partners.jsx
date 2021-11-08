import React, {useState} from 'react';
import Header from "../components/UI/Header/Header";
import cl from "../styles/Realizations.module.css";
import NavBar from "../components/UI/NavBar/NavBar";
import RealizationContent from "../components/PageContents/RealizationContent/RealizationContent";
import PartnersContent from "../components/PageContents/PartnersContent/PartnersContent";
import PartnersModalAddPartner from "../components/Modals/PartnerModals/ModalAddPartner/PartnersModalAddPartner";

const Partners = () => {

    const [modalState, setModalState] = useState(false)

    return (
        <div>
            <Header/>
            <div className={cl.content}>
                <NavBar page='Контрагенты'/>
                <PartnersContent setModalState={setModalState}/>
            </div>
            {modalState ?
                <PartnersModalAddPartner changeModal={setModalState}/>
                // <PartnersModalAddPartner changeModal={setModalState}/>
                :
                ''
            }
        </div>
    );
};

export default Partners;
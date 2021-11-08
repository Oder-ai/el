import React, {useContext} from 'react';
import Header from "../components/UI/Header/Header";
import NavBar from "../components/UI/NavBar/NavBar";
import cl from '../styles/Realizations.module.css'
import RealizationContent from "../components/PageContents/RealizationContent/RealizationContent";
import {Context} from "../index";
import ModalProducts from "../components/Modals/RealizationModals/ModalProducts/ModalProducts";
import {observer} from "mobx-react-lite";

const Realizations = () => {


    return (
        <div>
            <Header/>
            <div className={cl.content}>
                <NavBar page='Реализации'/>
                <RealizationContent/>
            </div>

        </div>
    );
};

export default observer(Realizations);
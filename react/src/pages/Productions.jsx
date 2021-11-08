import React from 'react';
import Header from "../components/UI/Header/Header";
import NavBar from "../components/UI/NavBar/NavBar";
import cl from '../styles/Productions.module.css'
import RealizationContent from "../components/PageContents/RealizationContent/RealizationContent";
import ProductionsContent from "../components/PageContents/ProductionsContent/ProductionsContent";

const Realizations = () => {

    return (
        <div>
            <Header/>
            <div className={cl.content}>
                <NavBar page='Выработка'/>
                <ProductionsContent/>
            </div>
        </div>
    );
};

export default Realizations;
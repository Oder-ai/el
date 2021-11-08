import React from 'react';
import Header from "../components/UI/Header/Header";
import NavBar from "../components/UI/NavBar/NavBar";
import cl from '../styles/Reps.module.css'
import RealizationContent from "../components/PageContents/RealizationContent/RealizationContent";
import RepsContent from "../components/PageContents/RepsContent/RepsContent";

const Realizations = () => {

    return (
        <div>
            <Header/>
            <div className={cl.content}>
                <NavBar page='Отчеты'/>
                <RepsContent/>
            </div>
        </div>
    );
};

export default Realizations;
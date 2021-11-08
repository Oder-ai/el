import React, {useContext, useEffect, useState} from 'react';
import cl from '../styles/Realizations.module.css'
import Header from "../components/UI/Header/Header";
import NavBar from "../components/UI/NavBar/NavBar";
import RealizationDetailContent from "../components/PageContents/RealizationContentDetail/RealizationDetailContent";
import {useParams} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import PartnerContentDetail from "../components/PageContents/PartnerContentDetail/PartnerContentDetail";
import StoreContentDetail from "../components/PageContents/StoreContentDetail/StoreContentDetail";

const RealizationDetail = () => {
    const params = useParams()
    const {StoreDetail} = useContext(Context)
    const {PartnerDetailRealizations} = useContext(Context)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        await StoreDetail.getProduct(params.id)
        // PartnerDetailRealizations.setPartner(params.id)
        // PartnerDetailRealizations.getPage()
        setIsLoading(false)
        // RealizationDetail.clearAllChanges()
    }, [])

    return (
        <div className={cl.page}>
            <Header/>
            <div className={cl.content}>
                <NavBar page='Склад'/>
                <StoreContentDetail isLoading={isLoading}/>
            </div>
        </div>
    );
};

export default observer(RealizationDetail);
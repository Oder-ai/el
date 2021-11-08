import React, {useContext, useState} from 'react';
import cl from './NavBar.module.css'
import RealizationsSvg from "../Svg/Realizations";
import ProductionSvg from "../Svg/ProductionSvg";
import StoreSvg from "../Svg/StoreSvg";
import RepsSvg from "../Svg/RepsSvg";
import PartnersSvg from "../Svg/PartnersSvg";
import ProfileSvg from "../Svg/ProfileSvg";
import {Link} from "react-router-dom";
import {Context} from "../../../index";

const NavBar = ({page, ...props}) => {

    const {Options} = useContext(Context)

    const pages = [
        {page: 'Реализации', icon: RealizationsSvg, link: '/realizations'},
        {page: 'Выработка', icon: ProductionSvg, link: '/productions'},
        {page: 'Склад', icon: StoreSvg, link: '/store'},
        // {page: 'Отчеты', icon: RepsSvg, link: '/reps'},
        {page: 'Контрагенты', icon: PartnersSvg, link: '/partners'},
        // {page: 'Профили', icon: ProfileSvg, link: '/profiles'}
    ]
    return (
            <div className={cl.navbar} {...props}>
                {pages.map(p =>
                    p.page === page && p.page !== 'Склад'
                        ?
                        <Link key={p.link} to={p.link} style={{display: 'block', width: '100%', textDecoration: 'none'}}>
                            <div key={p.page} className={cl.button_active}>
                                <div className={cl.button_inner}>
                                    <p.icon className={cl.icon_active}/>
                                    <span className={cl.text_active}>{p.page}</span>
                                    <div className={cl.rightBorder}>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        : p.page === 'Склад' && p.page === page ?
                            <div
                                key={p.page}
                                className={cl.button_active}
                                onClick={() => Options.setModalActive(true)}
                                style={{cursor: 'pointer'}}
                            >
                                <div className={cl.button_inner}>
                                    <StoreSvg className={cl.icon_active}/>
                                    <span className={cl.text}>Склад</span>
                                    <div className={cl.rightBorder}>
                                    </div>
                                </div>
                            </div>
                        : p.page === 'Склад' ?
                            <div
                                key={p.link}
                                className={cl.button}
                                onClick={() => Options.setModalActive(true)}
                                style={{cursor: 'pointer'}}
                            >
                                <div className={cl.button_inner}>
                                    <StoreSvg className={cl.icon}/>
                                    <span className={cl.text}>Склад</span>
                                </div>
                            </div>
                        :
                        <Link key={p.link} to={p.link} style={{display: 'block', width: '100%', textDecoration: 'none'}}>
                            <div key={p.page} className={cl.button}>
                                <div className={cl.button_inner}>
                                    <p.icon className={cl.icon}/>
                                    <span className={cl.text}>{p.page}</span>
                                </div>
                            </div>
                        </Link>
                )}
            </div>
    );
};

export default NavBar;
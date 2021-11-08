import React, {useContext, useEffect, useState} from 'react';
import Select from "../Svg/Select";
import cl from "./Header.module.css";
import Logout from "../Svg/Logout";
import BurgerSvg from "../Svg/BurgerSvg";
import NavBar from "../NavBar/NavBar";
import {Link} from "react-router-dom";
import {Context} from "../../../index";

const Header = () => {
    const {User} = useContext(Context)

    const [optionState, setOptionState] = useState(false)
    const [optionStyle, setOptionStyle] = useState([cl.user_options_off])

    useEffect(() => {
        if (optionState) {
            setOptionStyle([...optionStyle, cl.user_options_on])
        } else {
            setOptionStyle( [cl.user_options_off])
        }
    }, [optionState,])

    const toggle = () => {
        setOptionState(!optionState)
    }

    const [navbarActive, setNavbarActive] = useState(false)

    const [navbarStyle, setNavbarStyle] = useState([cl.navbar])
    const [navbarWrapperStyle, setNavbarWrapperStyle] = useState([cl.navbar_wrapper])

    useEffect(() => {
        if (navbarActive) {
            setNavbarStyle([...navbarStyle, cl.navbar_active])
            setNavbarWrapperStyle([...navbarWrapperStyle, cl.navbar_wrapper_active])
        } else {
            setNavbarStyle([cl.navbar])
            setNavbarWrapperStyle([cl.navbar_wrapper])
        }
    }, [navbarActive])

    const {Options} = useContext(Context)

    return (
        <div className={cl.header}>
            <div
                className={navbarWrapperStyle.join(' ')}
                onClick={() => setNavbarActive(false)}
            >
                <div
                    className={navbarStyle.join(' ')}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Link
                        to={'/realizations'}
                        style={{
                            display: 'block',
                            width: '100%',
                            textDecoration: 'none',
                        }}
                        onClick={() => setNavbarActive(false)}
                    >
                        <div className={cl.navbar_button}>
                        Реализации
                        </div>
                    </Link>
                    <Link
                        to={'/productions'}
                        style={{
                            display: 'block',
                            width: '100%',
                            textDecoration: 'none',
                        }}
                        onClick={() => setNavbarActive(false)}
                    >
                        <div className={cl.navbar_button}>
                            Выработка
                        </div>
                    </Link>
                    <div
                        className={cl.navbar_button}
                        onClick={() => {
                            setNavbarActive(false)
                            Options.setModalActive(true)
                        }}
                    >
                        Склад
                    </div>
                    <Link
                        to={'/partners'}
                        style={{
                            display: 'block',
                            width: '100%',
                            textDecoration: 'none',
                        }}
                        onClick={() => setNavbarActive(false)}
                    >
                        <div className={cl.navbar_button}>
                            Контрагенты
                        </div>
                    </Link>

                </div>
            </div>
            <div className={cl.content}>
                <div className={cl.logo_wrapper}>
                    <BurgerSvg className={cl.burger} onClick={() => setNavbarActive(true)}/>
                    <span className={cl.logo}>ELSTEP</span>
                </div>
                <div className={cl.user_wrapper}>
                    <div
                        style={{cursor: 'pointer', tabIndex: 0}}
                        onClick={() => toggle()}
                        className={cl.user_user}
                    >
                        <span className={cl.user}>{User.user.username}</span>
                        <Select
                            className={cl.user_select}
                        />
                    </div>
                    <div className={optionStyle.join(' ')}>
                        <div className={cl.option_logout} onClick={() => User.logout()}>
                            <Logout
                                className={cl.option_logout_logo}
                            />
                            <span className={cl.option_logout_text}>Выйти</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
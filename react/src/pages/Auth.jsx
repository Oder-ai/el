import React, {useContext, useEffect, useState} from 'react';
import AuthInput from "../components/UI/Input/AuthInput/AuthInput";
import Button from "../components/UI/Button/AuthButton/Button";
import classes from "../components/UI/Text/Text.module.css"
import auth_css from "../styles/Auth.module.css"
import {Context} from "../index";

const Auth = () => {

    const {User} = useContext(Context)

    const useValidation = (value, validations) => {
        const [isEmpty, setEmpty] = useState({isEmpty: true, error: '| Заполните поле'})
        // const [minLength, setMinLength] = useState({minLength: true, error: '| Поле должно содержать не менее 3 символов'})
        const [inputValid, setInputValid] = useState(false)

        useEffect(() => {
                for (const validation in validations) {
                    switch (validation) {
                        // case 'minLength':
                        //     value.length < validations[validation]
                        //     ?
                        //     setMinLength({...minLength, minLength: true})
                        //     :
                        //     setMinLength({...minLength, minLength: false})
                        //     break
                        case 'isEmpty':
                            value
                            ?
                            setEmpty({...isEmpty, isEmpty: false})
                            :
                            setEmpty({...isEmpty, isEmpty: true})
                            break
                    }
                }
        }, [value])

        useEffect(() => {
            if (isEmpty.isEmpty) {
                setInputValid(false)
            } else {
                setInputValid(true)
            }
        }, [isEmpty])

        return {
            isEmpty,
            inputValid
        }

    }

    const useInput = (initialValue, validations) => {
        const [value, setValue] = useState(initialValue)
        const [isDirty, setDirty] = useState(false)
        const valid = useValidation(value, validations)

        const onChange = (e) => {
            // setDirty(false)
            setValue(e.target.value)
            setStatus(false)
        }

        const onBlur = () => {
            setDirty(true)
        }

        return {
            value,
            onChange,
            onBlur,
            isDirty,
            errors: [valid.isEmpty],
            inputValid: valid.inputValid
        }

    }

    const login = useInput('', {isEmpty: true})
    const password = useInput('', {isEmpty: true})

    const formValid = login.inputValid && password.inputValid

    const formNotValid = () => {
        login.onBlur()
        password.onBlur()
    }

    const [status, setStatus] = useState(false)

    return (
        <div className={auth_css.wrapper}>
            <div className={auth_css.window}>
                <span className={classes.h1_ibm_plexSansBold}>Вход</span>
                {status ?
                    <span
                        style={{
                            fontSize: 16,
                            marginBottom: 10,
                            color: '#e07575',
                        }}
                    >
                        Неверный логин или пароль
                    </span>
                    :
                    ''
                }
                <AuthInput
                    value={login.value}
                    onChange={login.onChange}
                    onBlur={login.onBlur}
                    isDirty={login.isDirty}
                    header='Логин'
                    errors={login.errors}
                    placeholder='Введите ваш логин'
                />
                <AuthInput
                    value={password.value}
                    onChange={password.onChange}
                    onBlur={password.onBlur}
                    isDirty={password.isDirty}
                    header='Пароль'
                    errors={password.errors}
                    placeholder='Введите ваш пароль'
                    marginTop={{marginTop: 5}}
                />
                <Button
                    marginTop={{marginTop: 10}}
                    formValid={formValid}
                    onClick={async () => {
                        formNotValid()
                        if (formValid) {
                            const status = await User.login(login.value, password.value)
                            if (status === 401) {
                                setStatus(true)
                            }
                        }
                    }}
                >
                    Войти
                </Button>
            </div>
        </div>
    );
};

export default Auth;
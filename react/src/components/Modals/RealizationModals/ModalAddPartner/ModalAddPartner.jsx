import React, {useContext, useEffect, useState} from 'react';
import cl from './ModalAddPartner.module.css'
import classes from "../../../UI/Text/Text.module.css";
import img from "../ModalAddProduct/mXImXANMgjM.jpg";
import AuthInputSelect from "../../../UI/Input/AuthInputSelect/AuthInputSelect";
import AuthInput from "../../../UI/Input/AuthInput/AuthInput";
import Button from "../../../UI/Button/AuthButton/Button";
import {Context} from "../../../../index";
import CloseSvg from "../../../UI/Svg/CloseSvg";
import axios from "axios";
import {API_URL} from "../../../../http";

const ModalAddPartner = ({changeModal, setCreatedPartner}) => {

    const {Partners} = useContext(Context);

    const useValidation = (value, validations) => {
        const [isEmpty, setEmpty] = useState({isEmpty: true, error: '| Заполните поле'})
        // const [minLength, setMinLength] = useState({minLength: true, error: '| Поле должно содержать не менее 3 символов'})
        const [inputValid, setInputValid] = useState(false)

        useEffect(() => {
            for (const validation in validations) {
                switch (validation) {
                    // case 'minLength':
                    //     value.length < validations[validation]
                    //         ?
                    //         setMinLength({...minLength, minLength: true})
                    //         :
                    //         setMinLength({...minLength, minLength: false})
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
        }, [isEmpty,])

        return {
            isEmpty,
            // minLength,
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
        }

        const onSelect = (value) => {
            // setDirty(false)
            setValue(value)
        }

        const onBlur = () => {
            setDirty(true)
        }

        return {
            value,
            onSelect,
            onChange,
            onBlur,
            isDirty,
            errors: [valid.isEmpty],
            inputValid: valid.inputValid
        }
    }

    const name = useInput('', {isEmpty: true})
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [note, setNote] = useState('')

    // name = models.CharField(max_length=255, unique=True)
    // first_name = models.CharField(max_length=255)
    // last_name = models.CharField(max_length=255, null=True, blank=True)
    // phone_number = models.CharField(max_length=255, null=True, blank=True)
    // email = models.EmailField(max_length=255, null=True, blank=True)
    // note = models.TextField(null=True, blank=True)

    const formValid = name.inputValid

    const formNotValid = () => {
        name.onBlur()
    }

    return (
        <div className={cl.modal_wrapper} onClick={() => changeModal(false)}>
            <div className={cl.modal} onClick={e => e.stopPropagation()}>
                <div style={{display: 'flex', width: '100%', position: 'relative'}}>
                    <span
                        className={classes.h1_ibm_plexSansBold}
                        style={{margin: '0 0 10px 0', fontSize: 16}}
                    >
                    Добавить контрагента
                    </span>
                    <CloseSvg  onClick={(e) => changeModal(false)} style={{position: 'absolute', right: 0, top: 0, width: '1em', height: '1em', fill: '#3f3f3f'}}/>
                </div>

                <div className={cl.product_validations_wrapper}>
                    <div className={cl.valitation_wrapper}>
                        <AuthInput
                            value={name.value}
                            onChange={name.onChange}
                            onBlur={name.onBlur}
                            isDirty={name.isDirty}
                            style={{height: 30, fontSize: 14}}
                            header='Название компании *'
                            errors={name.errors}
                            placeholder='Введите название компании'
                            marginTop={{marginTop: 5}}
                            fontSize={14}
                            fontWeight={500}
                            type='text'
                        />
                        <span className={cl.header}>
                            Имя контрагента
                        </span>
                        <input
                            className={cl.input}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder={'Введите имя контрагента'}
                        />
                        <span className={cl.header}>
                            Фамилия контрагента
                        </span>
                        <input
                            className={cl.input}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder={'Введите фамилию контрагента'}
                        />
                        <span className={cl.header}>
                            Номер телефона
                        </span>
                        <input
                            className={cl.input}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder={'Введите номер телефона'}
                        />
                        <span className={cl.header}>
                            Email контрагента
                        </span>
                        <input
                            className={cl.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={'Введите email контрагента'}
                        />
                        <textarea
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            style={{
                                height: 90,
                                fontSize: 14,
                                resize: 'vertical',
                                backgroundColor: '#f3f3f3',
                                width: '100%',
                                padding: 5
                            }}
                            placeholder='Заметка'
                        />
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        style={{height: 30, marginTop: 10}}
                        formValid={formValid}
                        onClick={async (e) => {
                            e.preventDefault()
                            formNotValid()
                            if (formValid) {
                                const partner = await Partners.postPartner({
                                    name: name.value,
                                    first_name: firstName,
                                    last_name: lastName,
                                    phone_number: phoneNumber,
                                    email: email,
                                    note: note,
                                })
                                setCreatedPartner(partner)
                                changeModal(false)
                            }
                        }
                        }
                    >
                        Добавить
                    </Button>
                </div>
            </div>
        </div>
    );
};



export default ModalAddPartner;
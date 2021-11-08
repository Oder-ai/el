import React, {useEffect, useState} from 'react';
import PartnersTableItem from "./PartnersTableItem";
import cl from './PartnersTable.module.css'
import UpDown from "../../Svg/UpDown";
import DownSvg from "../../Svg/DownSvg";
import UpSvg from "../../Svg/UpSvg";

const PartnersTable = ({Store, items}) => {

    const [svg, setSvg] = useState({icon: UpDown})
    const [currentHeader, setCurrentHeader] = useState('')
    const [counter, setCounter] = useState(0)

    const setOrderType = async (header) => {
        let count = counter
        if (header !== currentHeader) {
            setCurrentHeader(header)
            count = 0
        }
        count += 1
        switch (count) {
            case 2:
                Store.setOrder(`-${header}`)
                setSvg({icon: DownSvg})
                break
            case 1:
                Store.setOrder(header)
                setSvg({icon: UpSvg})
                break
            default:
                Store.setOrder('')
                setSvg({icon: UpDown})
                count = 0
                break
        }
        setCounter(count)
    }



    return (
            <table className={cl.table}>
                <thead>
                <tr style={{borderBottom: '1px solid rgba(246, 246, 246, 1)', height: 40}}>
                    <td
                        onClick={e => setOrderType('id')}
                        className={cl.td}
                    >
                        <div className={cl.td_inner}>
                            <span className={cl.text_header}>ID</span>
                            {currentHeader !== 'id' ?
                                <UpDown className={cl.icon}/>
                                :
                                <svg.icon className={cl.icon}/>
                            }
                        </div>
                    </td>
                    <td
                        onClick={e => setOrderType('name')}
                        className={cl.td}
                    >
                        <div className={cl.td_inner}>
                            <span className={cl.text_header}>Название</span>
                            {currentHeader !== 'name' ?
                                <UpDown className={cl.icon}/>
                                :
                                <svg.icon className={cl.icon}/>
                            }
                        </div>
                    </td>
                    <td
                        onClick={e => setOrderType('first_name')}
                        className={cl.td}
                    >
                        <div className={cl.td_inner}>
                            <span className={cl.text_header}>Имя</span>
                            {currentHeader !== 'first_name' ?
                                <UpDown className={cl.icon}/>
                                :
                                <svg.icon className={cl.icon}/>
                            }
                        </div>
                    </td>
                    <td
                        onClick={e => setOrderType('last_name')}
                        className={cl.td}
                    >
                        <div className={cl.td_inner}>
                            <span className={cl.text_header}>Фамилия</span>
                            {currentHeader !== 'last_name' ?
                                <UpDown className={cl.icon}/>
                                :
                                <svg.icon className={cl.icon}/>
                            }
                        </div>
                    </td>
                    <td
                        onClick={e => setOrderType('phone_number')}
                        className={cl.td}
                    >
                        <div className={cl.td_inner}>
                            <span className={cl.text_header}>Номер</span>
                            {currentHeader !== 'phone_number' ?
                                <UpDown className={cl.icon}/>
                                :
                                <svg.icon className={cl.icon}/>
                            }
                        </div>
                    </td>
                    <td
                        onClick={e => setOrderType('email')}
                        className={cl.td}
                    >
                        <div className={cl.td_inner}>
                            <span className={cl.text_header}>Почта</span>
                            {currentHeader !== 'email' ?
                                <UpDown className={cl.icon}/>
                                :
                                <svg.icon className={cl.icon}/>
                            }
                        </div>
                    </td>
                    <td
                        onClick={e => setOrderType('released')}
                        className={cl.td}
                    >
                        <div className={cl.td_inner}>
                            <span className={cl.text_header}>Отпущено</span>
                            {currentHeader !== 'released' ?
                                <UpDown className={cl.icon}/>
                                :
                                <svg.icon className={cl.icon}/>
                            }
                        </div>
                    </td>
                    <td
                        onClick={e => setOrderType('returned')}
                        className={cl.td}
                    >
                        <div className={cl.td_inner}>
                            <span className={cl.text_header}>Возвращено</span>
                            {currentHeader !== 'returned' ?
                                <UpDown className={cl.icon}/>
                                :
                                <svg.icon className={cl.icon}/>
                            }
                        </div>
                    </td>
                    <td
                        onClick={e => setOrderType('paid')}
                        className={cl.td}
                    >
                        <div className={cl.td_inner}>
                            <span className={cl.text_header}>Оплачено</span>
                            {currentHeader !== 'paid' ?
                                <UpDown className={cl.icon}/>
                                :
                                <svg.icon className={cl.icon}/>
                            }
                        </div>
                    </td>
                    <td
                        onClick={e => setOrderType('debt')}
                        className={cl.td}
                    >
                        <div className={cl.td_inner}>
                            <span className={cl.text_header}>Остаток</span>
                            {currentHeader !== 'debt' ?
                                <UpDown className={cl.icon}/>
                                :
                                <svg.icon className={cl.icon}/>
                            }
                        </div>
                    </td>
                </tr>
                </thead>
                <tbody>
                {items.map(item =>
                    <PartnersTableItem key={item.id} item={item}/>
                )}
                </tbody>
            </table>
    );
};

export default PartnersTable;
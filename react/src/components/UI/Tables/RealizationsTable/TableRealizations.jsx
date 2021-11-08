import React, {useEffect, useState} from 'react';
import TableRealizationItem from "./TableRealizationItem";
import cl from './Table.module.css'
import UpDown from "../../Svg/UpDown";
import DownSvg from "../../Svg/DownSvg";
import UpSvg from "../../Svg/UpSvg";

const TableRealizations = ({Store, items}) => {

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
                        onClick={e => setOrderType('status')}
                        className={cl.td}
                    >
                        <div className={cl.td_inner}>
                            <span className={cl.text_header}>Статус</span>
                            {currentHeader !== 'status' ?
                                <UpDown className={cl.icon}/>
                                :
                                <svg.icon className={cl.icon}/>
                            }
                        </div>
                    </td>
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
                        onClick={e => setOrderType('created_at')}
                        className={cl.td}
                    >
                        <div className={cl.td_inner}>
                            <span className={cl.text_header}>Дата</span>
                            {currentHeader !== 'created_at' ?
                                <UpDown className={cl.icon}/>
                                :
                                <svg.icon className={cl.icon}/>
                            }
                        </div>
                    </td>
                    <td
                        onClick={e => setOrderType('partner')}
                        className={cl.td}
                    >
                        <div className={cl.td_inner}>
                            <span className={cl.text_header}>Контрагент</span>
                            {currentHeader !== 'partner' ?
                                <UpDown className={cl.icon}/>
                                :
                                <svg.icon className={cl.icon}/>
                            }
                        </div>
                    </td>
                    <td
                        onClick={e => setOrderType('product_qty')}
                        className={cl.td}
                    >
                        <div className={cl.td_inner}>
                            <span className={cl.text_header}>Количество товаров</span>
                            {currentHeader !== 'product_qty' ?
                                <UpDown className={cl.icon}/>
                                :
                                <svg.icon className={cl.icon}/>
                            }
                        </div>
                    </td>
                    <td
                        onClick={e => setOrderType('pairs_qty')}
                        className={cl.td}
                    >
                        <div className={cl.td_inner}>
                            <span className={cl.text_header}>Количество пар</span>
                            {currentHeader !== 'pairs_qty' ?
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
                            <span className={cl.text_header}>Счет</span>
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
                    <TableRealizationItem key={item.id} item={item}/>
                )}
                </tbody>
            </table>
    );
};

export default TableRealizations;
import React, {useEffect, useState} from 'react';
import cl from './ProductionsTable.module.css'
import UpDown from "../../Svg/UpDown";
import DownSvg from "../../Svg/DownSvg";
import UpSvg from "../../Svg/UpSvg";
import ProductionsTableItem from "./ProductionsTableItem";

const ProductionsTable = ({Store, items, setModalActive}) => {

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
                    onClick={e => setOrderType('product')}
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Модель</span>
                        {currentHeader !== 'product' ?
                            <UpDown className={cl.icon}/>
                            :
                            <svg.icon className={cl.icon}/>
                        }
                    </div>
                </td>
                <td
                    onClick={e => setOrderType('color')}
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Цвет</span>
                        {currentHeader !== 'color' ?
                            <UpDown className={cl.icon}/>
                            :
                            <svg.icon className={cl.icon}/>
                        }
                    </div>
                </td>
                <td
                    onClick={e => setOrderType('pairs')}
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Количество<br/>пар</span>
                        {currentHeader !== 'pairs' ?
                            <UpDown className={cl.icon}/>
                            :
                            <svg.icon className={cl.icon}/>
                        }
                    </div>
                </td>
                <td
                    onClick={e => setOrderType('packages')}
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Количество<br/>упаковок</span>
                        {currentHeader !== 'packages' ?
                            <UpDown className={cl.icon}/>
                            :
                            <svg.icon className={cl.icon}/>
                        }
                    </div>
                </td>
                <td
                    onClick={e => setOrderType('bags')}
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Количество<br/>мешков</span>
                        {currentHeader !== 'bags' ?
                            <UpDown className={cl.icon}/>
                            :
                            <svg.icon className={cl.icon}/>
                        }
                    </div>
                </td>
                <td
                    onClick={e => setOrderType('defect_worker')}
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Брак<br/>рабочих</span>
                        {currentHeader !== 'defect_worker' ?
                            <UpDown className={cl.icon}/>
                            :
                            <svg.icon className={cl.icon}/>
                        }
                    </div>
                </td>
                <td
                    onClick={e => setOrderType('defect_worker_sum')}
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Сумма</span>
                        {currentHeader !== 'defect_worker_sum' ?
                            <UpDown className={cl.icon}/>
                            :
                            <svg.icon className={cl.icon}/>
                        }
                    </div>
                </td>
                <td
                    onClick={e => setOrderType('defect_machine')}
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Брак<br/>станка</span>
                        {currentHeader !== 'defect_machine' ?
                            <UpDown className={cl.icon}/>
                            :
                            <svg.icon className={cl.icon}/>
                        }
                    </div>
                </td>
                <td
                    onClick={e => setOrderType('defect_machine_sum')}
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Сумма</span>
                        {currentHeader !== 'defect_machine_sum' ?
                            <UpDown className={cl.icon}/>
                            :
                            <svg.icon className={cl.icon}/>
                        }
                    </div>
                </td>
                <td
                    onClick={e => setOrderType('defect_mehmed')}
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Брак<br/>Мехмед</span>
                        {currentHeader !== 'defect_mehmed' ?
                            <UpDown className={cl.icon}/>
                            :
                            <svg.icon className={cl.icon}/>
                        }
                    </div>
                </td>
                <td
                    onClick={e => setOrderType('defect_mehmed_sum')}
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Сумма</span>
                        {currentHeader !== 'defect_mehmed_sum' ?
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
                <ProductionsTableItem key={item.id} item={item} setModalActive={setModalActive}/>
            )}
            </tbody>
        </table>
    );
};

export default ProductionsTable;
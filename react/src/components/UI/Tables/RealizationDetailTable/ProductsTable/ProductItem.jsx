import React, {useContext, useEffect, useState} from 'react';
import cl from './ProductItem.module.css'
import {Link} from "react-router-dom";
import OptionSvg from "../../../Svg/OptionSvg";
import {Context} from "../../../../../index";
import {observer} from "mobx-react-lite";

const ProductItem = ({item, editorActive}) => {

    const {RealizationDetail} = useContext(Context)

    const [option, setOption] = useState(false)
    const [deletActive, setDeletActive] = useState(false)
    const [changeActive, setChangeActive] = useState(false)

    const [trStyle, setTrStyle] = useState(cl.tr)

    useEffect(() => {
        if (deletActive) {
            setTrStyle(cl.tr_deleted)
        } else {
            setTrStyle(cl.tr)
        }
    }, [deletActive])
    useEffect(() => {
        if (editorActive === false) {
            setDeletActive(false)
            setChangeActive(false)
            setTrStyle(cl.tr)
            setPairs(item.pairs)
            setPackages(item.packages)
            setBags(item.bags)
            setReleased(item.released)
        }
    }, [editorActive])

    const [pairs, setPairs] = useState(item.pairs)
    const [packages, setPackages] = useState(item.packages)
    const [bags, setBags] = useState(item.bags)
    const [released, setReleased] = useState(item.released)

    const {StoreDetail} = useContext(Context)

    return (
        <tr className={trStyle}>
            <td className={cl.td} onClick={async () => await StoreDetail.getProduct(item.id)}>
                <Link to={`/store/${item.product}`} style={{display: 'flex', alignItems: 'center', width: '100%', height: 40, textDecoration: 'none', cursor: 'default'}}>
                    {item.product_article}
                </Link>

            </td>
            <td className={cl.td}>
                {item.product_color}

            </td>
            <td className={cl.td}>
                {changeActive ?
                    <input
                        className={cl.input}
                        type="number"
                        value={pairs}
                        onChange={(e) => {
                            setPairs(e.target.value)
                            RealizationDetail.changeUpdatedItem(item.id, 'pairs', e.target.value)
                        }}
                    />
                    :
                    item.pairs
                }
            </td>
            <td className={cl.td} style={{minWidth: 100}}>
                {changeActive ?
                    <input
                        className={cl.input}
                        type="number"
                        value={packages}
                        onChange={(e) => {
                            setPackages(e.target.value)
                            RealizationDetail.changeUpdatedItem(item.id, 'packages', e.target.value)
                        }}
                    />
                    :
                    item.packages
                }
            </td>
            <td className={cl.td} style={{minWidth: 100}}>
                {changeActive ?
                    <input
                        className={cl.input}
                        type="number"
                        value={bags}
                        onChange={(e) => {
                            setBags(e.target.value)
                            RealizationDetail.changeUpdatedItem(item.id, 'bags', e.target.value)
                        }}
                    />
                    :
                    item.bags
                }
            </td>
            <td className={cl.td}>
                {changeActive ?
                    <input
                        className={cl.input}
                        type="number"
                        value={released}
                        onChange={(e) => {
                            setReleased(e.target.value)
                            RealizationDetail.changeUpdatedItem(item.id, 'released', e.target.value)
                        }}
                    />
                    :
                    item.released
                }
            </td>
            <td className={cl.td} style={{color: '#DE9191'}}>
                {item.returned}

            </td>
            <td className={cl.td} style={{color: '#359EFF'}}>
                {item.paid}

            </td>
            <td className={cl.td} style={{color: '#E4B78E'}}>
                {item.debt}
            </td>
            {editorActive ?
                <td className={cl.icon_wrapper}>
                    <OptionSvg
                        className={cl.icon}
                        onClick={() =>
                            setOption(!option)
                        }
                    />
                    {option ?
                        <div
                            className={cl.action_wrapper}
                            onMouseLeave={() => setOption(false)}
                        >
                            {deletActive ?
                                ''
                                :
                                <div
                                    className={cl.action}
                                    onClick={() => {
                                        if (!changeActive) {
                                            RealizationDetail.pushUpdatedItem(item)
                                            setChangeActive(true)
                                        } else {
                                            setPairs(item.pairs)
                                            setPackages(item.packages)
                                            setBags(item.bags)
                                            setReleased(item.released)
                                            RealizationDetail.cancelUpdatedItem(item.id)
                                            setChangeActive(false)
                                        }
                                        setOption(false)
                                    }}
                                >
                                    {changeActive ?
                                        'Отмена'
                                        :
                                        'Изменить'
                                    }
                                </div>
                            }
                            {changeActive ?
                                ''
                                :
                                <div
                                    className={cl.action}
                                    onClick={() => {
                                        if (!deletActive) {
                                            RealizationDetail.pushDeletedItem(item.id)
                                            setDeletActive(true)
                                        } else {
                                            RealizationDetail.cancelDeletedItem(item.id)
                                            setDeletActive(false)
                                        }
                                        setOption(false)
                                    }}
                                >
                                    {deletActive ?
                                        'Отмена'
                                        :
                                        'Удалить'
                                    }

                                </div>
                            }

                        </div>
                        :
                        ''
                    }
                </td>
                :
                ''
            }
        </tr>
    );
};

export default observer(ProductItem);
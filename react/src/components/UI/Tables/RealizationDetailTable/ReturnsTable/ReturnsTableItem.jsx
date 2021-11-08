import React, {useContext, useEffect, useState} from 'react';
import cl from './ReturnsTableItem.module.css'
import {Link} from "react-router-dom";
import OptionSvg from "../../../Svg/OptionSvg";
import {Context} from "../../../../../index";
import {observer} from "mobx-react-lite";

const PayoutsTableItem = ({item, editorActive}) => {

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
            setRefund(item.refund)
        }
    }, [editorActive])

    const [refund, setRefund] = useState(item.refund)

    const {StoreDetail} = useContext(Context)

    return (
        <tr className={trStyle}>
            <td className={cl.td}>
                {item.created_at}

            </td>
            <td className={cl.td} onClick={async () => await StoreDetail.getProduct(item.product_id)}>
                <Link to={`/store/${item.product_id}`} style={{display: 'flex', alignItems: 'center', width: '100%', height: 40, textDecoration: 'none', cursor: 'default'}}>
                    {item.product_article}
                </Link>

            </td>
            <td className={cl.td}>
                {item.product_color}

            </td>
            <td className={cl.td} style={{minWidth: 100}}>
                {item.released}

            </td>
            <td className={cl.td} style={{color: '#C77F7F'}}>
                {changeActive ?
                    <input
                        className={cl.input}
                        type="number"
                        value={refund}
                        onChange={(e) => {
                            setRefund(e.target.value)
                            RealizationDetail.changeUpdatedRefund(item.id, 'refund', e.target.value)
                        }}
                    />
                    :
                    item.refund
                }
            </td>
            <td className={cl.td}>
                {item.returned}

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
                                            RealizationDetail.pushUpdatedRefund(item)
                                            setChangeActive(true)
                                        } else {
                                            setRefund(item.refund)
                                            RealizationDetail.cancelUpdatedRefund(item.id)
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
                                            RealizationDetail.pushDeletedRefund(item.id)
                                            setDeletActive(true)
                                        } else {
                                            RealizationDetail.cancelDeletedRefund(item.id)
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

export default observer(PayoutsTableItem);
import React, {useContext, useState} from 'react';
import cl from './ProductionsTableItem.module.css'
import OptionSvg from "../../Svg/OptionSvg";
import {Link} from "react-router-dom";
import {Context} from "../../../../index";

const ProductionsTableItem = ({item}) => {

    const [option, setOption] = useState(false)
    const [changeActive, setChangeActive] = useState(false)
    const {StoreDetail} = useContext(Context)

    return (
        <tr className={cl.tr}>
            <td className={cl.td}>
                {item.id}

            </td>
            <td className={cl.td} style={{minWidth: 100}}>
                {item.created_at}

            </td>
            <td
                className={cl.td}
                style={{minWidth: 100}}
                onClick={async () => {
                await StoreDetail.getProduct(item.product)
                }}
            >
                <Link to={`/store/${item.product}`} style={{display: 'flex', alignItems: 'center', width: '100%', height: 40, textDecoration: 'none', cursor: 'default'}}>
                {item.product_article}
                </Link>

            </td>
            <td className={cl.td}>
                {item.product_color}

            </td>
            <td className={cl.td}>
                {item.pairs}

            </td>
            <td className={cl.td}>
                {item.packages}

            </td>
            <td className={cl.td}>
                {item.bags}

            </td>
            <td className={cl.td}>
                {item.defect_worker}

            </td>
            <td className={cl.td}>
                {item.defect_worker_sum}

            </td>
            <td className={cl.td}>
                {item.defect_machine}

            </td>
            <td className={cl.td}>
                {item.defect_machine_sum}

            </td>
            <td className={cl.td}>
                {item.defect_mehmed}

            </td>
            <td className={cl.td}>
                {item.defect_mehmed_sum}

            </td>
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
                        <div className={cl.action}>
                            Изменить
                        </div>
                    </div>
                    :
                    ''
                }

            </td>
        </tr>
    );
};

export default ProductionsTableItem;
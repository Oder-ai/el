import React, {useContext, useState} from 'react';
import cl from './TableRealizationItem.module.css'
import OptionSvg from "../../Svg/OptionSvg";
import {Link} from "react-router-dom";
import {Context} from "../../../../index";

const TableRealizationItem = ({item}) => {

    const [option, setOption] = useState(false)

    const {PartnersPage} = useContext(Context)

    return (
        <tr className={cl.tr}>
                <td className={cl.td}>
                    <Link to={`/realizations/${item.id}`} style={{display: 'flex', alignItems: 'center', width: '100%', height: 40, textDecoration: 'none', cursor: 'default'}}>

                    {item.status ?
                        <div className={cl.disabled}>
                            Закрыта
                        </div>
                        :
                        <div className={cl.active}>
                            В процессе
                        </div>}
                    </Link>


                </td>
                <td className={cl.td}>
                    {item.id}

                </td>
                <td className={cl.td} style={{minWidth: 100}}>
                        {item.created_at}

                </td>
            <td className={cl.td} onClick={async () => await PartnersPage.getPartner(item.partner_id)}>
                <Link to={`/partners/${item.partner_id}`} style={{display: 'flex', alignItems: 'center', width: '100%', height: 40, textDecoration: 'none', cursor: 'default'}}>
                    {item.partner}
                </Link>


                </td>
                <td className={cl.td}>
                        {item.product_qty}

                </td>
                <td className={cl.td}>
                        {item.pairs_qty}

                </td>
                <td className={cl.td}>
                        <span className={cl.released}>{item.released}</span>
                        /
                        <span className={cl.returned}>{item.returned}</span>
                        /
                        <span className={cl.paid}>{item.paid}</span>
                        /
                        <span className={cl.debt}>{item.debt}</span>

                </td>
                {/*<td className={cl.icon_wrapper}>*/}
                {/*    <OptionSvg*/}
                {/*        className={cl.icon}*/}
                {/*        onClick={() => */}
                {/*            setOption(!option)*/}
                {/*        }*/}
                {/*    />*/}
                {/*    {option ?*/}
                {/*        <div*/}
                {/*            className={cl.action_wrapper}*/}
                {/*            onMouseLeave={() => setOption(false)}*/}
                {/*        >*/}
                {/*            <div className={cl.action}>*/}
                {/*                Изменить*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        :*/}
                {/*        ''*/}
                {/*    }*/}

                {/*</td>*/}
        </tr>
    );
};

export default TableRealizationItem;
import React, {useState} from 'react';
import cl from './PartnersTableItem.module.css'
import OptionSvg from "../../Svg/OptionSvg";
import {Link} from "react-router-dom";

const PartnersTableItem = ({item}) => {

    const [option, setOption] = useState(false)

    return (
        <tr className={cl.tr}>
                <td className={cl.td}>
                    <Link to={`/partners/${item.id}`} style={{display: 'flex', alignItems: 'center', width: '100%', height: 40, textDecoration: 'none', cursor: 'default'}}>
                        {item.id}
                    </Link>
                </td>
                <td className={cl.td}>
                    <Link to={`/partners/${item.id}`} style={{display: 'flex', alignItems: 'center', width: '100%', height: 40, textDecoration: 'none', cursor: 'default'}}>
                        {item.name}
                    </Link>

                </td>
                <td className={cl.td} style={{minWidth: 100}}>
                    <Link to={`/partners/${item.id}`} style={{display: 'flex', alignItems: 'center', width: '100%', height: 40, textDecoration: 'none', cursor: 'default'}}>
                        {item.first_name}
                    </Link>

                </td>
                <td className={cl.td}>
                    <Link to={`/partners/${item.id}`} style={{display: 'flex', alignItems: 'center', width: '100%', height: 40, textDecoration: 'none', cursor: 'default'}}>
                        {item.last_name}
                    </Link>

                </td>
                <td className={cl.td}>
                    <Link to={`/partners/${item.id}`} style={{display: 'flex', alignItems: 'center', width: '100%', height: 40, textDecoration: 'none', cursor: 'default'}}>
                        {item.phone_number}
                    </Link>

                </td>
                <td className={cl.td}>
                    <Link to={`/partners/${item.id}`} style={{display: 'flex', alignItems: 'center', width: '100%', height: 40, textDecoration: 'none', cursor: 'default'}}>
                        {item.email}
                    </Link>

                </td>
                <td className={cl.td}>
                    <Link to={`/partners/${item.id}`} style={{display: 'flex', alignItems: 'center', width: '100%', height: 40, textDecoration: 'none', cursor: 'default'}}>
                        {item.released}
                    </Link>

                </td>
                <td className={cl.td}>
                    <Link to={`/partners/${item.id}`} style={{display: 'flex', color: '#DE9191', alignItems: 'center', width: '100%', height: 40, textDecoration: 'none', cursor: 'default'}}>
                        {item.returned}
                    </Link>

                </td>
                <td className={cl.td}>
                    <Link to={`/partners/${item.id}`} style={{display: 'flex', color: '#359EFF', alignItems: 'center', width: '100%', height: 40, textDecoration: 'none', cursor: 'default'}}>
                        {item.paid}
                    </Link>

                </td>
                <td className={cl.td}>
                    <Link to={`/partners/${item.id}`} style={{display: 'flex', color: '#E4B78E', alignItems: 'center', width: '100%', height: 40, textDecoration: 'none', cursor: 'default'}}>
                        {item.debt}
                    </Link>

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

export default PartnersTableItem;
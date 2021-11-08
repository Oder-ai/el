import React from 'react';
import cl from './PayoutsTable.module.css'
import UpDown from "../../../Svg/UpDown";
import {observer} from "mobx-react-lite";
import PayoutsTableItem from "./PayoutsTableItem";

const PayoutsTable = ({items, editorActive}) => {
    return (
        <table className={cl.table}>
            <thead>
            <tr style={{borderBottom: '1px solid rgba(246, 246, 246, 1)', height: 40}}>
                <td
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Дата</span>
                    </div>
                </td>
                <td
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Артикул</span>
                    </div>
                </td>
                <td
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Цвет</span>
                    </div>
                </td>
                <td
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Отпущено</span>
                    </div>
                </td>
                <td
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Возвращено</span>
                    </div>
                </td>
                <td
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Выплата</span>
                    </div>
                </td>
                <td
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Оплачено</span>
                    </div>
                </td>
                <td
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Остаток</span>
                    </div>
                </td>

            </tr>
            </thead>
            <tbody>
            {items.map(item =>
                <PayoutsTableItem key={item.id} item={item} editorActive={editorActive}/>
            )}
            </tbody>
        </table>
    );
};

export default observer(PayoutsTable);
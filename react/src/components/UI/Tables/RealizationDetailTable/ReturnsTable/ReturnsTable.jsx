import React from 'react';
import cl from './ReturnsTable.module.css'
import UpDown from "../../../Svg/UpDown";
import {observer} from "mobx-react-lite";
import ReturnsTableItem from "./ReturnsTableItem";

const ReturnsTable = ({items, editorActive}) => {
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
                        <span className={cl.text_header}>Товар</span>
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
                        <span className={cl.text_header}>Возврат</span>
                    </div>
                </td>
                <td
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Возвращено</span>
                    </div>
                </td>
            </tr>
            </thead>
            <tbody>
            {items.map(item =>
                <ReturnsTableItem key={item.id} item={item} editorActive={editorActive}/>
            )}
            </tbody>
        </table>
    );
};

export default observer(ReturnsTable);
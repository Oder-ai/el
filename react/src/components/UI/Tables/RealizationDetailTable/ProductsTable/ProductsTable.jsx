import React from 'react';
import cl from './ProductsTable.module.css'
import UpDown from "../../../Svg/UpDown";
import TableRealizationItem from "../../RealizationsTable/TableRealizationItem";
import ProductItem from "./ProductItem";
import {observer} from "mobx-react-lite";

const ProductsTable = ({items, editorActive}) => {
    return (
        <table className={cl.table}>
            <thead>
            <tr style={{borderBottom: '1px solid rgba(246, 246, 246, 1)', height: 40}}>
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
                        <span className={cl.text_header}>Количество пар</span>
                    </div>
                </td>
                <td
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Количество упаковок</span>
                    </div>
                </td>
                <td
                    className={cl.td}
                >
                    <div className={cl.td_inner}>
                        <span className={cl.text_header}>Количество мешков</span>
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
                <ProductItem key={item.id} item={item} editorActive={editorActive}/>
            )}
            </tbody>
        </table>
    );
};

export default observer(ProductsTable);
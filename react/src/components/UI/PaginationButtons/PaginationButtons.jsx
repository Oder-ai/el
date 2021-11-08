import React from 'react';
import cl from './PaginationsButtons.module.css'
import {observer} from "mobx-react-lite";

const PaginationButtons = ({State, ...props}) => {
    return (
        <div className={cl.content} {...props}>
            <button
                onClick={() => State.getPreviousPage()}
                className={cl.previous}
            >
                Назад
            </button>
            <div className={cl.pages}>
                <input type="text"
                       className={cl.input}
                       value={State.current_page}
                       onChange={(e) => {
                           State.current_page = e.target.value
                       }}
                       onBlur={(e) => {
                           State.getPage(e.target.value)
                       }}
                />
                <span className={cl.text}>из</span>
                <span className={cl.text_pages}>{State.page_count}</span>
            </div>
            <button
                onClick={() => State.getNextPage()}
                className={cl.next}
            >
                Вперед
            </button>
        </div>
    );
};

export default observer(PaginationButtons);
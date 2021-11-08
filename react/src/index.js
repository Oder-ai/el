import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RealizationsStore from "./store/Realizations";
import ProductsStore from './store/Products'
import PartnersStore from './store/Partners'
import RealizationDetailStore from "./store/RealizationDetail/RealizationDetail";
import ProductionsStore from "./store/Productions";
import {BrowserRouter, withRouter} from "react-router-dom";
import ProductionItemsStore from "./store/ProductionItems";
import RepsStore from "./store/Reps";
import PartnersPageStore from "./store/PartnersPage";
import PartnerDetailRealizationsStore from "./store/PartnerDetailRealizations";
import OptionsStore from "./store/Options";
import StoreDetailStore from "./store/StoreDetail";
import ProductCreateStore from "./store/ProductCreate";
import RealizationAddPageStore from "./store/RealizationAddPage";
import UserStore from "./store/User";



const WithRouterApp = withRouter(App)

const Realizations = new RealizationsStore()
const Products = new ProductsStore()
const Partners = new PartnersStore()
const RealizationDetail = new RealizationDetailStore()
const Productions = new ProductionsStore()
const ProductionItems = new ProductionItemsStore()
const PartnersPage = new PartnersPageStore()
const Reps = new RepsStore()
const PartnerDetailRealizations = new PartnerDetailRealizationsStore()
const Options = new OptionsStore()
const StoreDetail = new StoreDetailStore()
const ProductCreate = new ProductCreateStore()
const RealizationAddPage = new RealizationAddPageStore()
const User = new UserStore()


export const Context = createContext({
    Realizations,
    Products,
    Partners,
    RealizationDetail,
    Productions,
    ProductionItems,
    Reps,
    PartnersPage,
    PartnerDetailRealizations,
    Options,
    StoreDetail,
    ProductCreate,
    RealizationAddPage,
    User,
})


ReactDOM.render(
    <Context.Provider value={{
        Realizations,
        Products,
        Partners,
        RealizationDetail,
        Productions,
        ProductionItems,
        Reps,
        PartnersPage,
        PartnerDetailRealizations,
        Options,
        StoreDetail,
        ProductCreate,
        RealizationAddPage,
        User
    }}>
        <React.StrictMode>
            <BrowserRouter>
                <WithRouterApp />
            </BrowserRouter>
        </React.StrictMode>
    </Context.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

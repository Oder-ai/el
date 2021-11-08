import React, {useContext, useEffect, useState} from 'react';
import Auth from "./pages/Auth";
import Header from "./components/UI/Header/Header";
import NavBar from "./components/UI/NavBar/NavBar";
import Realizations from "./pages/Realizations";
import RealizationAdd from "./pages/RealizationAdd";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import ModalProducts from "./components/Modals/RealizationModals/ModalProducts/ModalProducts";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import StoreModalProducts from "./components/Modals/StoreModalProducts/ModalProducts/StoreModalProducts";
import DoteLoader from "./components/UI/Loader/DoteLoader";

const App = () => {
  const {Options} = useContext(Context)
  const {User} = useContext(Context)

  const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        await User.checkAuth()
        setIsLoading(false)
    }, [])

  return (
      <>
        {isLoading ?
            <DoteLoader/>
            :
            <>
              {User.isAuth ?
                  <>
                    <AppRouter/>
                    {Options.modal_products_state ?
                        <StoreModalProducts/>
                        :
                        ''
                    }
                  </>
                  :
                  <Auth/>
              }
            </>
        }
      </>


  );
};

export default observer(App);

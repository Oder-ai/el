import React, {useContext, useState} from 'react';
import cl from './ModalItemChoiced.module.css'
import img from "../../../PageContents/RealizationAdd/air-zoom-alphafly-next-flyknit-mens-road-racing-shoe-fNntgL.jpg";
import test from "../../../PageContents/RealizationAdd/mXImXANMgjM.jpg";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import SliderLeftSvg from "../../../UI/Svg/SliderLeftSvg";
import SliderRightSvg from "../../../UI/Svg/SliderRightSvg";
import NoImageSvg from "../../../UI/Svg/NoImageSvg";
import {toJS} from "mobx";

const ModalItemChoiced = ({item, changeProduct}) => {

    const {Products} = useContext(Context);
    const [currentImg, setCurrentImg] = useState(0)
    const setNextImg = () => {
        let count = currentImg
        count += 1
        if (count > item.product_images.length -1) {
            count = 0
        }
        setCurrentImg(count)
    }
    const setPreviousImg = () => {
        let count = currentImg
        count -= 1
        if (count < 0) {
            count = item.product_images.length -1
        }
        setCurrentImg(count)
    }

    return (
        <div className={cl.product_item_wrapper}>
            <div className={cl.product_pickear_wrapper}>
                <div className={cl.product_pickear} onClick={() => {
                    Products.setCurrentChoicedItem(item)
                    changeProduct(true)
                }}>
                </div>
                <span
                    className={cl.product_pickear_text}
                    onClick={() => {
                        Products.setCurrentChoicedItem(item)
                        changeProduct(true)
                    }}
                >
                    ИЗМЕНИТЬ
                </span>
                <div
                    className={cl.product_delete_wrapper}
                    onClick={() => {
                        console.log(item)
                        Products.deleteChoicedProductItem(item.color)
                    }}
                >
                    <span className={cl.product_delete_text}>УДАЛИТЬ</span>
                </div>
            </div>
            <div className={cl.img_wrapper}>
                {item.product_images.length ?
                    <>
                        <img className={cl.product_img} src={item.product_images[currentImg].image} alt=""/>
                        <div className={cl.counter}>
                            {currentImg + 1} из {item.product_images.length}
                        </div>
                        <div className={cl.left_svg_wrapper} onClick={() => setPreviousImg()}>
                            <SliderLeftSvg style={{width: '5em', height: '2em', paddingLeft: 10}}/>
                        </div>
                        <div className={cl.right_svg_wrapper} onClick={() => setNextImg()}>
                            <SliderRightSvg style={{width: '5em', height: '2em', paddingRight: 10}}/>
                        </div>
                    </>
                    :
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f6f6f6'
                        }}
                    >
                        <NoImageSvg style={{width: '50%', height: '50%'}}/>
                    </div>
                }

            </div>
            <div className={cl.product_info}>
                <span className={cl.product_article}>{item.text.article}</span>
                <span className={cl.product_parametrs}>Цвет: {item.text.color}</span>
                <span className={cl.product_parametrs}>Количество: {item.text.qty}</span>
                <span className={cl.product_parametrs}>На сумму: {item.text.sum}</span>
            </div>
        </div>
    );
};

export default observer(ModalItemChoiced);
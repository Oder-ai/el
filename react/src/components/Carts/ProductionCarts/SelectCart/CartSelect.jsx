import React, {useContext, useState} from 'react';
import img from "../../../PageContents/RealizationAdd/air-zoom-alphafly-next-flyknit-mens-road-racing-shoe-fNntgL.jpg";
import test from "../../../PageContents/RealizationAdd/mXImXANMgjM.jpg";
import cl from './CartSelect.module.css'
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import {toJS} from "mobx";
import SliderLeftSvg from "../../../UI/Svg/SliderLeftSvg";
import SliderRightSvg from "../../../UI/Svg/SliderRightSvg";
import NoImageSvg from "../../../UI/Svg/NoImageSvg";

const CartSelect = ({item, onClick}) => {

    const {ProductionItems} = useContext(Context);
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
                <div className={cl.product_pickear_wrapper} onClick={() => {
                    onClick(true)
                    ProductionItems.setCurrentItem(item)
                }}>
                    <div className={cl.product_pickear}>
                    </div>
                    <span className={cl.product_pickear_text}>ВЫБРАТЬ</span>
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
                    <span className={cl.product_article}>{item.article_number}</span>
                    <span className={cl.product_parametrs}>Цена: {item.price}</span>
                    <span className={cl.product_parametrs} style={{marginBottom: 10}}>На складе: {item.total_quantity}</span>
                    <span className={cl.product_colors}>Цвета:</span>
                    {item.product_colors.map(color =>
                        <span className={cl.product_colors}>{color.color}: {color.quantity}</span>
                    )}
                </div>
            </div>
    );
};

export default observer(CartSelect);
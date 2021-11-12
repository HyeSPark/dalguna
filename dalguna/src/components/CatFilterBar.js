import React, {useEffect} from 'react'
import '../cat_filter_page.css';
import dhspic from '../img/DHS_photo.jpeg';
import { AiOutlineArrowLeft } from 'react-icons/ai'

function CatFilterBar(props) {
    // props.cur
    // props.setCur
    const catNameList = ["Korean", "Chicken", "Japanese", "Snacks", "Asian", "Salad", "Doshirak"]
    
    const catList = catNameList.map((name) => {
        var curCatClssName = "catFilterBar__catList-item"
        if (name == props.cur) {
            curCatClssName = "catFilterBar__catList-item-active"
        }
        return(
            <li key={name}><a href="#" className={curCatClssName} onClick={(e) => changeCur(e, name)}>
                {name}
            </a></li>
        )
    })

    function changeCur(e, name) {
        props.setCur(name)
        let element = e.target;
        // function getAbsoluteTop(element) {
        //     return window.pageXOffset + element.getBoundingClientRect().left;
        // }
        // const parentElement = element.parentElement.parentElement;
        // const parentAbsoluteLeft = getAbsoluteTop(parentElement);
        // const absoluteLeft = getAbsoluteTop(element);
        // const relativeLeft = absoluteLeft - parentAbsoluteLeft;
        // // const absoluteLeft = 214 - (window.pageXOffset + element.getBoundingClientRect().left);
        // // parentElement.style.transform = `translate(${absoluteLeft})`
        // // parentElement.scrollLeft = relativeLeft;
        element.parentElement.scrollIntoView();
        //i.. idk .. how to make center..
    }

    return (
        <div className="catFilterBar__">
            <div className="catFilterBar__title">
                <a href="#" className="catFilterBar__title-back">
                    <AiOutlineArrowLeft /> 
                </a>
                <div className="catFilterBar__title-catName">
                    {props.cur}
                </div>
            </div>
            <div className="catFilterBar__container">
                <ul className="catFilterBar__catList">
                    {catList}
                </ul>
            </div>
            
        </div>
    )
}

export default CatFilterBar
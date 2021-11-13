import React from 'react'
import '../cat_filter_page.css';
import dhspic from '../img/DHS_photo.jpeg';
import { AiOutlineArrowLeft } from 'react-icons/ai'

function CatFilterBar(props) {
    // props.cur
    // props.setCur
    
    // const itemRef = useRef()

    const catList = props.catNameList.map((name) => {
        var curCatClssName = "catFilterBar__catList-item"
        if (name == props.cur) {
            curCatClssName = "catFilterBar__catList-item-active"
        }
        return(
            <li key={name} ><a href="#" className={curCatClssName} onClick={(e) => changeCur(e, name)}>
                {name}
            </a></li>
        )
    })

    function changeCur(e, name) {
        props.setCur(name)
        let element = e.target;
        element.parentElement.scrollIntoView({
            inline: "center",
            // behavior: "smooth"
        });
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
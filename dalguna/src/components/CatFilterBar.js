import React, { useEffect } from 'react'
import '../cat_filter.css';
import dhspic from '../img/DHS_photo.jpeg';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

function CatFilterBar(props) {
    const navigate = useNavigate();
    useEffect(() => {
        let element = document.getElementsByClassName("catFilterBar__catList-item-active")[0]
        element.parentElement.scrollIntoView({
            inline: "center",
            // behavior: "smooth"
        });
      }, []);
    // props.cur
    // props.setCur
    
    // const itemRef = useRef()

    const catList = props.catNameList.map((name) => {
        var curCatClssName = "catFilterBar__catList-item"
        if (name == props.cur) {
            curCatClssName = "catFilterBar__catList-item-active"
        }
        return(
            <li key={name} ><button className={curCatClssName} onClick={(e) => changeCur(e, name)}>
                {name}
            </button></li>
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
                <a href="#" className="catFilterBar__title-back" onClick={() => navigate(-1)}>
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
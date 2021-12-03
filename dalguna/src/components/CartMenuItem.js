import React, { useEffect, useState } from "react";
import { CgClose } from 'react-icons/cg';

function CartMenuItem(props) {
    const { menuDetail, setMenuDetail, menuList, menuId } = props;

    const [menuQnty, setMenuQnty] = useState(menuDetail.qnty);

    function incQnty() {
        setMenuQnty(menuQnty + 1);
    }
    function decQnty() {
        if (menuQnty > 1) {
            setMenuQnty(menuQnty - 1)
        }
    }
    function remove() {
        if (window.confirm("메뉴를 지울까요?")) {
            var copiedDetail = [...menuList]
            const len = copiedDetail.length
            copiedDetail = copiedDetail.slice(0, menuId).concat( copiedDetail.slice(menuId+1, len) )
            setMenuDetail(copiedDetail)
            // setMenuQnty(0)
        }
    }
    function updateMenuDetail() {
        var copiedDetail = [...menuList]
        const len = copiedDetail.length
        copiedDetail[menuId].qnty = menuQnty;
        
        setMenuDetail(copiedDetail)
    }

    useEffect(updateMenuDetail, [menuQnty])

    const menuOptions = menuDetail.detail.map((el, i) => {
        if (el.selected.length !== 0) {
            const menuSelectedOptions = el.selected.map((opt, i) => {
                if (i < el.selected.length-1) return (<span key={i}>{opt}, </span>)
                else return (<span key={i}>{opt} </span>)
            })
            return (<li key={i} style={{listStyle:"initial", lineHeight:"1.3rem"}}>{el.name}: {menuSelectedOptions}</li>)
        }
    })
    
    return (
        <div className="CartMenuItem__">
            <div className="CartMenuItem__detail">
                <p>{menuDetail.name}</p>
                <br/>
                <ul style={{paddingLeft:"15px", fontSize:"0.9rem", marginTop:"0px"}}>{ menuOptions }</ul>
                <p>{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                .format(menuDetail.price)}</p>
            </div>
            <div className="CartMenuItem__right">
                <button onClick={remove}><CgClose style={{color: "grey", fontSize: "1.5rem"}}/></button>
                <div className="CartMenuItem__amount">
                    <button className="CartMenuItem__amount-button" onClick={decQnty}>-</button>
                    <span className="CartMenuItem__amount-number">{menuQnty}</span>
                    <button className="CartMenuItem__amount-button" onClick={incQnty}>+</button>
                </div>

            </div>
        </div>
    )
}

export default CartMenuItem;
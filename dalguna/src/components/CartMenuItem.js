import React, { useEffect, useState } from "react";
import { CgClose } from 'react-icons/cg';

function CartMenuItem(props) {
    const [menuQnty, setMenuQnty] = useState(1);

    console.log(menuQnty);

    function incQnty() {
        setMenuQnty(menuQnty + 1);
    }
    function decQnty() {
        if (menuQnty > 1) {
            setMenuQnty(menuQnty - 1)
        }
    }
    function remove() {
        if (window.confirm("Want to remove?")) {
            setMenuQnty(0)
        }
    }
    function updateMenuDetail() {
        const copiedDetail = { ...props.menuDetail }
        console.log(copiedDetail);
        copiedDetail["qnty"] = menuQnty;
        props.setMenuDetail([copiedDetail])
    }

    useEffect(updateMenuDetail, [menuQnty])
    
    return (
        <div className="CartMenuItem__">
            <div className="CartMenuItem__detail">
                <p>{props.menuDetail.name}</p>
                <br/>
                <p>{ props.menuDetail.detail.map((el) => (<span>{el}, </span>))}</p>
                <p>{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                .format(props.menuDetail.price)}</p>
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
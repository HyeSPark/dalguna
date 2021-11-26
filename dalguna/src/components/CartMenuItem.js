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
        if (window.confirm("Want to remove?")) {
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
    
    return (
        <div className="CartMenuItem__">
            <div className="CartMenuItem__detail">
                <p>{menuDetail.name}</p>
                <br/>
                <p>{ menuDetail.detail.map((el, i) => (<span key={i}>{el}, </span>))}</p>
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
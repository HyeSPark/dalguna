import React, { useState } from 'react';

function MenuAddOptions(props) {
    const { name, options, type, totalPrice, setTotalPrice } = props;

    const [selectedOptions, setSelectedOptions] = useState([])

    var optionList;

    optionList = options.map((opt, i) =>
        <li className="menuModal__option-item" key={i}>
            <div className="menuModal__option-item-name">
                <input 
                    type={type}
                    id = {opt.name}
                    value={opt.name}
                    name="priceOption"
                    checked={[...selectedOptions].filter((e)=> e === opt.name).length !== 0}
                    onChange={() => handleSelectedOptionsChange(opt.name, opt.price)}/>
                &nbsp;&nbsp;{opt.name}
            </div>
            <div className="menuModal__option-item-price">
                {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                    .format(opt.price)}
            </div>
        </li>)

    function handleSelectedOptionsChange(name, price) {
        var copied = [...selectedOptions]
        if (copied.filter((e)=> e === name).length !== 0) {
            setSelectedOptions(copied.filter((e)=> e !== name))
            setTotalPrice(totalPrice - price)
        } else {
            setSelectedOptions([...selectedOptions, name])
            setTotalPrice(totalPrice + price)
        }
    }
    

    return (<>
        <span className="menuModal__option-title">
            <span>{name}</span><span style={{fontWeight:"lighter", color:"grey"}}>(선택)</span>
        </span>
        <ul className="menuModal__option-list">{optionList}</ul>
    </>)
}

export default MenuAddOptions
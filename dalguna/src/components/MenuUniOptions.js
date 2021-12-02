import React, { useState, useEffect } from 'react';

function MenuUniOptions(props) {
    const { name, options, type, totalPrice, setTotalPrice, selectedAddOptions, setSelectedAddOptions } = props;
    const [selectedUniOption, setSelectedUniOption] = useState([])
    // const [selectedOptions, setSelectedOptions] = useState([])

    var optionList;
    useEffect(() => {
        const copied = [...selectedAddOptions]
        console.log(copied)
        copied.filter((el) => el.name == name)[0].selected = selectedUniOption;
        setSelectedAddOptions(copied)
    }, [selectedUniOption])

    optionList = options.map((opt, i) =>
        <li className="menuModal__option-item" key={i}>
            <div className="menuModal__option-item-name">
                <input 
                    type={type}
                    id = {opt.name}
                    value={opt.name}
                    name={name}
                    checked={[...selectedAddOptions].filter((el) => el.name == name)[0].selected.filter((e)=> e === opt.name).length !== 0}
                    onClick={() => handleRadioSelectedOptionChange(opt.name, opt.price)}
                />
                &nbsp;&nbsp;{opt.name}
            </div>
            <div className="menuModal__option-item-price">
                + {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                    .format(opt.price)}
            </div>
        </li>)

    function handleRadioSelectedOptionChange(name, price) {
        if (type === "radio"){
            if (selectedUniOption[0] === name) {
                setSelectedUniOption([])
                setTotalPrice(totalPrice - price)
            } else {
                setSelectedUniOption([name])
                setTotalPrice(totalPrice + price)
            }
        }
    }

    return (<>
        <span className="menuModal__option-title">
            <span>{name}</span><span style={{fontWeight:"lighter", color:"grey"}}>(선택)</span>
        </span>
        <ul className="menuModal__option-list">{optionList}</ul>
    </>)
}

export default MenuUniOptions
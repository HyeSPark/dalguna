import React, { useState, useEffect } from 'react';

function MenuAddOptions(props) {
    const { name, options, type, totalPrice, setTotalPrice, selectedAddOptions, setSelectedAddOptions } = props;
    const [selectedUniOption, setSelectedUniOption] = useState([])
    // const [selectedOptions, setSelectedOptions] = useState([])

    var optionList;
    useEffect(() => {
        if (selectedUniOption.length !== 0) {
            if (selectedAddOptions.filter((el) => el === selectedUniOption[0]).length !== 0) {
                setSelectedAddOptions(selectedAddOptions.filter((el) => el !== selectedUniOption))
            } else {
                setSelectedAddOptions([...selectedAddOptions, selectedUniOption[0]])
            }
        }
        
    }, [selectedUniOption])

    optionList = options.map((opt, i) =>
        <li className="menuModal__option-item" key={i}>
            <div className="menuModal__option-item-name">
                <input 
                    type={type}
                    id = {opt.name}
                    value={opt.name}
                    name={name}
                    checked={[...selectedAddOptions].filter((e)=> e === opt.name).length !== 0}
                    onClick={() => handleRadioSelectedOptionChange(opt.name, opt.price)}
                    onChange={() => handleSelectedOptionsChange(opt.name, opt.price)}/>
                &nbsp;&nbsp;{opt.name}
            </div>
            <div className="menuModal__option-item-price">
                + {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                    .format(opt.price)}
            </div>
        </li>)

    function handleSelectedOptionsChange(name, price) {
        var copied = [...selectedAddOptions]
        if (type === "checkbox"){
            if (copied.filter((e)=> e === name).length !== 0) {
                setSelectedAddOptions(copied.filter((e)=> e !== name))
                setTotalPrice(totalPrice - price)
            } else {
                setSelectedAddOptions([...selectedAddOptions, name])
                setTotalPrice(totalPrice + price)
            }
        }
        
    }

    function handleRadioSelectedOptionChange(name, price) {
        if (type === "radio"){
            if ( selectedUniOption.filter((el) => el === name).length !== 0) {
                setSelectedUniOption([])
                setTotalPrice(totalPrice - price)
            } else {
                setSelectedAddOptions([name])
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

export default MenuAddOptions
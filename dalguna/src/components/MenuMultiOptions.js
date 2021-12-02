import React, {useState, useEffect} from 'react'

function MenuMultiOptions(props) {
    const { name, options, type, totalPrice, setTotalPrice, selectedAddOptions, setSelectedAddOptions } = props;

    const [selectedMultiOption, setSelectedMultiOption] = useState([])

    var optionList;
    useEffect(() => {
        const copied = [...selectedAddOptions]
        console.log(copied)
        copied.filter((el) => el.name == name)[0].selected = selectedMultiOption;
        setSelectedAddOptions(copied)
    }, [selectedMultiOption])

    optionList = options.map((opt, i) =>
        <li className="menuModal__option-item" key={i}>
            <div className="menuModal__option-item-name">
                <input 
                    type={type}
                    id = {opt.name}
                    value={opt.name}
                    name={name}
                    checked={[...selectedAddOptions].filter((el) => el.name == name)[0].selected.filter((e)=> e === opt.name).length !== 0}
                    onChange={() => handleBoxSelectedOptionsChange(opt.name, opt.price)}
                />
                &nbsp;&nbsp;{opt.name}
            </div>
            <div className="menuModal__option-item-price">
                + {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
                    .format(opt.price)}
            </div>
        </li>)

    function handleBoxSelectedOptionsChange(name, price) {
        var copied = [...selectedMultiOption]
        if (copied.filter((e)=> e === name).length !== 0) {
            setSelectedMultiOption(copied.filter((e)=> e !== name))
            setTotalPrice(totalPrice - price)
        } else {
            setSelectedMultiOption([...selectedMultiOption, name])
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

export default MenuMultiOptions;
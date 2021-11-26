import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import '../new-room-modal.css'
import LongButton from './LongButton';

function NewRoomModal(props) {
    const { restName, menuList } = props;

    const [longButtonType, setLongButtonType] = useState("secondary")
    const [ordTimeJSX, setOrdTimeJSX] = useState(<></>)
    const [ordTime, setOrdTime] = useState()
    const params = useParams();

    const handleInputChange = (e) => {
        if (e.target.value === "") {
            setOrdTimeJSX(<>주문 시간을 적어주세요</>)
            setLongButtonType("secondary")
        } else {
            var timeNow = new Date()
            var timeOrd = new Date()
            timeOrd.setMinutes(timeNow.getMinutes() + Number(e.target.value))
            
            setOrdTimeJSX(<><span style={{color:"black"}}>{timeOrd.getHours()}시 {timeOrd.getMinutes()}분</span>에 주문합니다.</>)
            setLongButtonType("primary")
            setOrdTime(timeOrd)
        }
    }

    function createNewRoom() {
        console.log("creating new room", params.userId, ordTime, menuList)
    }
    return (
        <div className="newRoomModal__">
            <div className="newRoomModal__title">New Room</div>
            <div className="newRoomModal__restName">{restName}</div>
            <form className="newRoomModal__form">
                <div className="newRoomModal__form-name">
                    주문 시간
                </div>
                <div className="newRoomModal__form-time">
                    지금부터&nbsp;
                    <input className="newRoomModal__form-time-input" 
                            name="timeInput"
                            onChange={handleInputChange}
                            type="number"/>
                    &nbsp;분 후
                </div>
            </form>
            <div className="newRoomModal__timeNotice">
                {ordTimeJSX}
                
            </div>
            <div className="newRoomModal__button">
                <LongButton type={longButtonType} onClick={createNewRoom}>Create</LongButton>
            </div>
        </div>
    )
}

export default NewRoomModal;
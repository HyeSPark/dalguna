// import React, { useState } from "react";
// import "../change_address.css";

// import AddrNavBar from "../components/AddrNavBar";
// import DeliveryBox from "../components/DeliveryBox";

// function ChangeAddress() {
//     const [boxInfo, setBoxInfo] = useState([{
//         name: "Areum Hall", time: 5, selected: true
//     }, {
//         name: "Seongsil Hall", time: 7, selected: false
//     }, {
//         name: "Mirae Hall", time: 9, selected: true
//     }])

//     const boxList = boxInfo.map((box) =>
//     <a href="#"><DeliveryBox boxInfo={box}/></a>
//     )
    
//     return (
//         <div className="ui-container">
//             <div className="chngAddr__">
//                 <AddrNavBar/>
//                 <div className="selDelBox__">
//                     <div className="selDelBox__title">
//                         <b>3</b> delivery boxes near <br/> 291 Daehak-ro, Yuseong-gu
//                     </div>
//                     <div className="selDelBox__slider">
//                         slider
//                     </div>
//                     <div className="selDelBox__boxes">
//                         {boxList}
//                     </div>
//                 </div>
//             </div>
//         </div>
        
//     )
// }

// export default ChangeAddress
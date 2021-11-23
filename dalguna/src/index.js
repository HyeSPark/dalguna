import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Main, CatFilter, RestaurantPage, CheckOut} from './pages'

ReactDOM.render(
  <BrowserRouter>
    {/* <App /> */}
    <Routes>
      {/* <Route path="/" element={<MenuPage />}/> */}
      {/* <Route path="/" element={<CheckOut />}/> */}
      {/* <Route path="/" element={<RestaurantPage />}/> */}
      <Route path="/" element={<Main />}/>
      <Route path="/filter/:name" element={<CatFilter />} />
      {/* <Route path="/address/:id" element={<ChangeAddress />} /> */}
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Main, CatFilter, RestaurantPage, CheckOut} from './pages'

console.warn = () => {};

ReactDOM.render(
  <BrowserRouter>
    {/* <App /> */}
    <Routes>
      {/* <Route path="/" element={<MenuPage />}/> */}
      <Route path="/:userId/:roomId" element={<CheckOut />}/>
      <Route path="/:userId" element={<Main />}/>
      <Route path="/:userId/restaurant/:restId" element={<RestaurantPage />}/>
      <Route path="/:userId/filter/:name" element={<CatFilter />} />
      {/* <Route path="/address/:id" element={<ChangeAddress />} /> */}
      <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p style={{marginTop: "200px"}}>카카오톡으로 보낸 링크로 접속해주세요!</p>
        </main>
      }
    />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

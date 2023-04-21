import classes from './App.module.css';
import { Routes, Route, Navigate} from 'react-router-dom';
import React from 'react';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import DetailPage from './Pages/DetailPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ShopPage from './Pages/ShopPage';
import HomePage from './Pages/HomePage';
import WrongPage from './Pages/WrongPage';
/*Các phần vẫn chưa hoàn thành: 
 + Mục 6 chưa tạo active hiển thị màu cam cho leftnavbar
 */
 
function App() {
  return (
  <div class={classes.app}>
    <Routes>
      <Route path='/' element={<Navigate to='/home' />}/>
      <Route path='/home' element={<HomePage />}/>
      <Route path='/shop' element={<ShopPage />}/>
      <Route path='/detail/:productCategory/:productId' element={<DetailPage />}/>
      <Route path='/cart' element={<CartPage />}/>
      <Route path='/checkout' element={<CheckoutPage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/register' element={<RegisterPage />}/>
      <Route path='/*' element={<WrongPage />}/>
    </Routes>
  </div>
  
  );
}

export default App;

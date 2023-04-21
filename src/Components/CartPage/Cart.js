import classes from './Cart.module.css'
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect} from 'react';
import { cartActions } from '../../store/cart';
import { useNavigate } from 'react-router-dom';

const Cart = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector(state => state.cart.listCart);  
    const priceTotal = useSelector(state => state.cart.priceTotal);
    const dataPrice = products.map(product => {return parseInt(product.cart.price)*product.quantity})
    dispatch(cartActions.PLUS_PRICE(dataPrice))
    console.log(products.length)
    // Hiển thị thông tin đơn hàng  
    const showProducts = () => {
        return products.map(product => {
            if (product.cart._id.$oid === '') {
                return console.log('chua co product')
            }
            else{
            const productPrice =  product.cart.price;
            const quantity = product.quantity;
            const subtotalPrice = parseInt(productPrice) * quantity;

            //hàm xoá sản phẩm
            const deleteClickHandler = (event => {
                event.preventDefault();
                    dispatch(cartActions.DELETE_CART(product.cart._id.$oid));
                    
            })

            //Hàm khi click vào tăng số lượng sản phẩm đã click 
            const upClickHandler = (event => {
                event.preventDefault();
                dispatch(cartActions.ADD_QUANTITYALL(1));
                dispatch(cartActions.ADD_QUANTITYLISTCART(product.cart._id.$oid));
            }) 

            //Hàm khi click vào giảm số lượng sản phẩm đã click
            const downClickHandler = (event => {
                event.preventDefault();
                dispatch(cartActions.ADD_QUANTITYALL(-1));
                if(quantity > 1){
                    dispatch(cartActions.ADD_QUANTITYLISTCART(product.cart._id.$oid));
                }
                else{
                    dispatch(cartActions.ADD_QUANTITYALL(+1));
                    dispatch(cartActions.ADD_QUANTITYLISTCART(product.cart._id.$oid));
                }
            }) 
            return (
                    <div className={classes.row}>
                        <img src={`${product.cart.img1}`}className={`${classes.column} ${classes.imag}`} alt=''></img>
                        <div className={classes.column}>{product.cart.name}</div>
                        <div className={classes.column}>{productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</div>
                        <div className={classes.column}>
                            <span><i class="bi bi-caret-left-fill" onClick={downClickHandler}></i> {quantity} <i class="bi bi-caret-right-fill" onClick={upClickHandler}></i></span>
                        </div>
                        <div className={classes.column}>{subtotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</div>
                        <div className={classes.column} onClick={deleteClickHandler}><i class="bi bi-trash"></i></div>
                    </div>
            )}
        })
        
    }

    //cập nhật trên Local Storage
    const updateLocalStorage = () => {
        if(products.length === 0){
            return localStorage.setItem('listCart',JSON.stringify(products))}
        else if(products.length >0 &&  products[0].quantity === 0 ){
            return console.log('không có số lượng')}
        else{localStorage.setItem('listCart',JSON.stringify(products));}
    }
    const backToShopPage = () => {
        navigate('/shop')
    }
    const goToCheckoutPage = () => {
        navigate('/checkout')
    }
    useEffect(() => {showProducts()}, [products])
    useEffect(() => {updateLocalStorage();},[products]);
    return(
        <div className={classes.cart}>
            <h1 className={classes.part1}> SHOPPING CART </h1>
            <div className={classes.part2}>
                <div className={classes.leftPart2}>
                    <div className={classes.leftRow1}>
                        <h2 className={classes.column}>IMAGE</h2>
                        <h2 className={classes.column}>PRODUCT</h2>
                        <h2 className={classes.column}>PRICE</h2>
                        <h2 className={classes.column}>QUANTITY</h2>
                        <h2 className={classes.column}>TOTAL</h2>
                        <h2 className={classes.column}>REMOVE</h2>
                    </div>
                    <div className={classes.leftRow2}>
                        {showProducts()}
                    </div>
                </div>
                <div className={classes.rightPart2}>
                    <h1 className={classes.rightRow1}> CART TOTAL</h1>
                    <div className={classes.rightRow2}>
                        <h2>SUBTOTAL</h2>
                        <p>{priceTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</p>
                    </div>
                    <div className={classes.rightRow3}>
                        <h2>TOTAL</h2>
                        <p>{priceTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</p>
                    </div>
                    <div className={classes.rightRow4}>
                        <input placeholder='Enter your coupon'></input>
                        <button><i class="bi bi-gift-fill"></i> Apply coupon</button>
                    </div>
                </div>
            </div>
            <div className={classes.part3}>
                <div className={classes.leftPart3}>
                    <button onClick={backToShopPage}><i class="bi bi-arrow-left"></i> Continue shopping </button>
                </div>
                <div className={classes.rightPart3}>
                    <button onClick={goToCheckoutPage}> Proceed to checkout <i class="bi bi-arrow-right"></i></button>
                </div>
            </div>
        </div>
    )
}
export default Cart; 
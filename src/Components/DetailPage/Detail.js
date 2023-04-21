import classes from './Detail.module.css'
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef} from 'react';
import React from 'react';
import { cartActions } from '../../store/cart';
const Detail = (props) => {
    const params = useParams();
    const idProduct = params.productId;
    const categoryProduct = params.productCategory;
    const dataProduct = useSelector(state => state.fetchdata.data) 
    const [quantityProduct,setQuantityProduct] = useState(1);
    const [isAddCart, setIsAddCart] = useState(false);
    const [isAddQuantity, setIsAddQuantity] = useState(false);
    const dispatch = useDispatch();
    const inputQuantityRef = useRef()
    const cart = useSelector(state => state.cart)
    const thisCarts = cart.carts;
    const thisCart = thisCarts.cart;
    const listCart = cart.listCart;

    // Hiển thị sản phẩm có liên quan đến sản phẩm đang xem
    const showRelateProduct = () => {
        return dataProduct.map(product => {
            if(product.category===categoryProduct){
                return(
                    <div className={classes.relatedProduct}>
                        
                        <img src={`${product.img1}`}className={classes.imag3} alt='related' />
                        <h2>{product.name}</h2>
                        <p>{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</p>
                    </div>
                )
            }
            return <div/>
        })
    }

    //hiển thị thông tin chi tiết sản phẩm đang chọn 
    const showDetailProduct = () => {
        return dataProduct.map(product => {        
            if (product._id.$oid === idProduct){ 
                //Hàm tăng số lượng sản phẩm khi click 
                const upClickHandler = (event) => {
                    event.preventDefault();
                    setQuantityProduct(prevState => parseInt(prevState) + 1);
                }

                //Hàm giảm số lượng sản phẩm khi click
                const downClickHandler = (event) => {
                    event.preventDefault();
                    setQuantityProduct(prevState => {
                        if(prevState === 1){return prevState}
                        else{return prevState - 1}
                    });
                } 

                //hàm thiết lập số lượng hiển thị 1 khi giá trị <= 0 hoặc khi không có giá trị 
                const quantityChangeHandler = (event) => {
                    if(event.target.value===''){setQuantityProduct(1)}
                    if(event.target.value <= 0){setQuantityProduct(1)}
                    else{setQuantityProduct(event.target.value)};
                }
                
                //Lấy dữ liệu sản phẩm đã chọn khi submit
                const submitHandler = (event) => { 
                    event.preventDefault();
                    const enteredQuantity = inputQuantityRef.current.value;
                    dispatch(cartActions.ADD_CART(product));
                    dispatch(cartActions.ADD_QUANTITY(enteredQuantity));
                    setIsAddCart(true);

                }
                
                return (
                    <React.Fragment>
                        <div className={classes.part1}>
                            <div className={classes.column1}>
                                <img src={`${product.img1}`} alt='SmallImage' className={classes.imag1} />
                                <img src={`${product.img2}`} alt='SmallImage' className={classes.imag1} />
                                <img src={`${product.img3}`} alt='SmallImage' className={classes.imag1} />
                                <img src={`${product.img4}`} alt='SmallImage' className={classes.imag1} />
                            </div>
                            <div className={classes.column2}>
                                <img src={`${product.img1}`} alt ='BigImage'className={classes.imag2} />
                            </div>
                            <div className={classes.column3}>
                                <h1 className={classes.name}>{product.name}</h1>
                                <p className={classes.price}>{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</p>
                                <p className={classes.info}>{product.short_desc}</p>
                                <div className={classes.category}>
                                    <span className={classes.tt}>CATEGORY: </span> 
                                    <span className={classes.categoryName}>{product.category}</span>
                                </div>
                                <form className={classes.addCart} id='addCart' onSubmit={submitHandler}>
                                    <label htmlFor='quantity'></label>
                                    <input form='addCart' type='text' placeholder='QUANTITY' onChange={quantityChangeHandler} value={quantityProduct} ref={inputQuantityRef}></input>
                                    <span><i class="bi bi-caret-left-fill" onClick={downClickHandler}></i> {quantityProduct} <i class="bi bi-caret-right-fill" onClick={upClickHandler}></i></span>
                                    <button>Add to cart</button>
                                </form>
                            </div>
                        </div>
                            
                        <div className={classes.part2}>
                            <button>DESCRIPTION</button>
                            <h1>PRODUCT DESCRIPTION</h1>
                            <p>{product.long_desc} \n hello </p>
                        </div>

                    </React.Fragment>
                )
            }
            return <div />
        })

    }
    // Thêm vào số lượng đã chọn của sản phẩm hiện tại
    const addQuantity = () => {
        if(isAddCart){
            dispatch(cartActions.ADD_QUANTITYALL(thisCarts.quantity))
            setIsAddCart(false);
            setIsAddQuantity(true);
        }
        else {console.log('')};
    }

    //Cập nhật danh sách sản phẩm
    const updateListCart = () => {
        if(listCart.length === 0){
            dispatch(cartActions.UPDATE_CART([{cart:{_id: {$oid:''}},quantity:cart.quantityAll}]))
        }  
        else if(listCart.length >= 1 && isAddQuantity){
            const lookCart = listCart.find(cart => cart.cart._id.$oid === thisCart._id.$oid);
            if(lookCart===undefined){
                dispatch(cartActions.UPDATE_CART([...listCart,{cart:thisCart,quantity:cart.quantityAll}]))
                dispatch(cartActions.DELETE_CART(''));
                setIsAddQuantity(false);
                // localStorage.setItem('listCart',JSON.stringify([...listCart,{cart:thisCart,quantity:cart.quantityAll}]))
                console.log('cập nhật hàng mới')
            } else{
                console.log(lookCart)
                dispatch(cartActions.ADD_QUANTITYLISTCART(lookCart.cart._id.$oid))
                setIsAddQuantity(false)
                console.log('cập nhật số lượng hàng cũ')
            }
        }
    }

    // cập nhật vào dữ liệu storage
    const updateLocalStorage = () => {
        if(listCart.length === 0){
            return ''}
        else if(listCart.length >0 &&  listCart[0].quantity === 0 ){
            return ''}
        else{localStorage.setItem('listCart',JSON.stringify(listCart));}
    }


    useEffect(() => addQuantity(),[isAddCart]);
    useEffect(() => {updateListCart();},[isAddQuantity]);
    useEffect(() => {updateLocalStorage();},[listCart]);
    return(
        <div className={classes.detail}>
            {showDetailProduct()}
            <div className={classes.part3}>
                <h1>RELATED PRODUCTS</h1>
                <div className={classes.relatedProducts}>
                    {showRelateProduct()}
                </div>
            </div>
        </div>
    )
}
export default Detail; 

import classes from './Products.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from  'react-redux';
import { popupActions } from '../../store/popup';

const Products = (props) => {
    const [products,setProducts] = useState([]); // State lưu dữ liệu Sản phẩm được fetch
    const dispatch = useDispatch();
    //Fetch dữ liệu sản phẩm
    async function fetchProducts(){
        const response = await fetch('https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74');
        const data = await response.json();
        setProducts(data);
    }  
    

    //Hàm lọc dữ liệu Sản phẩm đã fetch
    const productsShow = products.map((product,index) => {
        if (index <= 7){
               // Click vào hiển thị Popup sản phẩm
            const showHandler = (event => {
                event.preventDefault();
                dispatch(popupActions.showPopup());
                dispatch(popupActions.getProduct(product));
            }) 
            return (
            <div className={classes.product}>
                <img src={`${product.img1}`} className={classes.imag} alt=''/>
                <div className={classes.overlay} onClick={showHandler} key={index}></div>
                <p className={classes.name}>{product.name}</p>
                <p className={classes.price}>{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</p>
            </div>
        )}
        return (<div></div>);
    })
 
    //Thực hiện Fetch Sản phẩm khi lần đầu load trang
    useEffect(() => {fetchProducts()},[]);

    return(
        <div className={classes.products}> 
            <div className={classes.row1}>
                <p> MADE THE HARD WAY</p>
                <h2> TOP TRENDING PRODUCTS </h2>
            </div>
            <div className={classes.row2}>
                {productsShow}
            </div>
        </div>
    )
}
export default Products; 
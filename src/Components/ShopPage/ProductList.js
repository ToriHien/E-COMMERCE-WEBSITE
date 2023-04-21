import classes from './ProductList.module.css'
import LeftNavbar from './LeftNavbar';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ProductList = (props) => {
    const dataProduct = useSelector(state => state.category.category); //Lấy dữ liệu từ click menu navbar dọc
    const [products,setProducts] = useState(''); 
    const [isProducts,setIsProducts] = useState(false);

    // đường dẫn tới Detail Page khi click vào sản phẩm
    const navigate = useNavigate();
    // const detailClickHandler = () => navigate('/detail/a')
    
    //fetch dữ liệu 
    async function fetchProducts(){
        const response = await fetch('https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74');
        const data = await response.json();
        setProducts(data);
        setIsProducts(true);
    }
    
    //Hiển thị sản phẩm khi click vào menu
        const showProduct = () => {
            if (dataProduct === 'All') { 
                return products.map((product) => {
                    const detailClickHandler = (event) => {
                        navigate(`/detail/${product.category}/${product._id.$oid}`)       
                    }
                        return(
                            <div className={classes.product} key={product.id}>
                                <img src={`${product.img1}`} alt='product' className={classes.imag} />
                                <div className={classes.overlay} onClick={detailClickHandler}/>
                                <h1 className={classes.name}>{product.name}</h1>
                                <p className={classes.price}>{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</p>
                            </div>
                        )
                    })
            }
            if(dataProduct!== 'All') { 
                return(products.map(product => {
                    if( product.category===dataProduct.toLowerCase()) {
                        const detailClickHandler = (event) => {
                            navigate(`/detail/${product.category}/${product._id.$oid}`)
                        }
                        return (
                            <div className={classes.product} key={product.id}>
                                <img src={`${product.img1}`} alt='product' className={classes.imag} />
                                <div className={classes.overlay} onClick={detailClickHandler}/>
                                <h1 className={classes.name}>{product.name}</h1>
                                <p className={classes.price}>{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</p>
                            </div>
                        );
                    }return <div className={classes.imag2}/>
                }))
            }
        }

    useEffect(() => {fetchProducts()}, []); 


    return(
        <div className={classes.productList}>
            <LeftNavbar />
            <div className={classes.category}>
                <div className={classes.part1}>
                    <form className={classes.search}>
                        <input placeholder='Enter Search Here'/>
                    </form>
                    <button class={classes.bt}> Default sorting <i class="bi bi-chevron-down"></i> </button>
                </div>
                <div className={classes.part2}>
                    {isProducts && showProduct()}
                </div>
                <div className={classes.part3}>
                    <div className={classes.pageNumber}>
                        <button className={classes.btBack}><i class="bi bi-chevron-double-left"></i></button>
                        <span>1</span>
                        <button className={classes.btNext}><i class="bi bi-chevron-double-right"></i></button>
                    </div>
                    <p> Showing 1 - 9 of 9 Results </p>
                </div>
            </div>  
        </div>
    )
}
export default ProductList; 
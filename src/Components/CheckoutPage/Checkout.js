import classes from './Checkout.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';
const Checkout = (props) => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.cart.listCart);
    const total = useSelector(state => state.cart.priceTotal);

    //Tính tổng giá trị đơn hàng
    const dataPrice = products.map(product => {return parseInt(product.cart.price)*product.quantity});
    dispatch(cartActions.PLUS_PRICE(dataPrice))

    //Hiển thị thông tin giỏ hàng muốn mua
    const showOrder = () => {
        return products.map(product => {
            return (
                <div className={classes.midRow}>
                    <h2>{product.cart.name} </h2>
                    <p>{product.cart.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND x {product.quantity}</p>
                </div>
            )
        })
    }
    return(
        <div className={classes.checkout}>
            <h1>BILLING DETAILS</h1>
            <section className={classes.formDetail}>
                <form id='order' className={classes.formOrder}>
                    <div className={classes.ip}>
                        <label htmlFor='name'>FULL NAME:</label>
                        <input id='name'placeholder='Enter Your Full Name Here' form='order'></input>
                    </div>
                    <div className={classes.ip}>
                        <label htmlFor='email'>EMAIL:</label>
                        <input id='email' placeholder='Enter Your Email Here' form='order'></input>
                    </div>
                    <div className={classes.ip}>
                        <label htmlFor='phone'>PHONE NUMBER:</label>
                        <input id='phone' placeholder='Enter Your Phone Number Here' form='order'></input>
                    </div>
                    <div className={classes.ip}>
                        <label htmlFor='address'>ADDRESS:</label>
                        <input id='address' placeholder='Enter Your Address Here' form='order'></input>
                    </div>
                    <button>Place order</button>
                </form>
                <div className={classes.rightPart}>
                    <h2>YOUR ORDER</h2>
                     {showOrder()}
                    
                    <div className={classes.endRow}>
                        <h2>TOTAL</h2>
                        <p>{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</p>
                    </div>
                </div>
            </section>

        </div>
    )
}
export default Checkout; 
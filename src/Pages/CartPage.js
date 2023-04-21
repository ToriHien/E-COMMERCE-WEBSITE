import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import Banner from "../Components/Banner"
import Cart from "../Components/CartPage/Cart"
const CartPage = (props) => {
    return (
        <div>
            <Navbar />
            <Banner title1='CART' title2='CART'/>
            <Cart />
            <Footer />
            
        </div>
    )
}
export default CartPage

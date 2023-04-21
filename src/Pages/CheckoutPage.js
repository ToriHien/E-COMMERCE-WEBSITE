import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import Banner from "../Components/Banner";
import Checkout from "../Components/CheckoutPage/Checkout";
const CheckoutPage = (props) => {
    return (
        <div>
            <Navbar />
            <Banner title1="CHECKOUT" title2="CHECKOUT"title3="HOME / CART / "/>
            <Checkout />
            <Footer />
        </div>
    )
}
export default CheckoutPage

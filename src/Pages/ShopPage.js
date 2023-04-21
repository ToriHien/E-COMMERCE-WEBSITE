import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Banner from "../Components/Banner";
import ProductList from "../Components/ShopPage/ProductList";

const ShopPage = (props) => {
    return (
        <div>
            <Navbar />
            <Banner title1='SHOP' title2='SHOP'/>
            <ProductList />
            <Footer />
           
        </div>
    )
}
export default ShopPage

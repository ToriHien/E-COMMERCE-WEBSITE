import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Banner from "../Components/HomePage/Banner";
import CollectionList from "../Components/HomePage/CollectionList";
import Products from "../Components/HomePage/Products";
import Others from "../Components/HomePage/Others";
import Popup from "../Components/HomePage/Popup";
import { useSelector } from  'react-redux';

const HomePage = (props) => {
    const isPopup = useSelector(state => state.popup.isPopup)
    return (
        <div>
           <Navbar />
           <Banner />
           <CollectionList />
           <Products />
           {isPopup && <Popup />}
           {!isPopup && <div/>}
           <Others />
           <Footer />
        </div>
    )
}
export default HomePage

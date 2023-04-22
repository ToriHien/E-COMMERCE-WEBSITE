import classes from './Popup.module.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch,useSelector} from  'react-redux'
import { popupActions } from '../../store/popup'
import { useNavigate } from 'react-router-dom';

const Popup = (props) => {
    const dispatch=useDispatch();
    const dataPopup = useSelector(state => state.popup.productPopup) //Lấy dữ liệu sản phẩm được click vào 
    const navigate = useNavigate()

    //Sự kiện huỷ Popup
    const hideHandler= (event => {
        event.preventDefault();
        dispatch(popupActions.hidePopup());
    })

    //Sự kiện xem chi tiết sản phẩm
    const viewDetailClickHandler = () => {
        navigate(`/detail/${dataPopup.category}/${dataPopup._id.$oid}`) 
        dispatch(popupActions.hidePopup());
    }

    return(
        <div className={classes.modal}>
            <div className={classes.popup}>
                <img src={dataPopup.img1} alt ='' className={classes.imag} />
                <div className={classes.rightPart}>
                    <button className={classes.bt1} onClick={hideHandler}>x</button> 
                    <h1>{dataPopup.name}</h1>
                    <h2>{dataPopup.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</h2>
                    <p>{dataPopup.short_desc}</p>
                    <button className={classes.bt2} onClick={viewDetailClickHandler}><i class="bi bi-cart-fill" ></i> View Detail</button>
                </div>
            </div>
        </div>
    )
}
export default Popup; 
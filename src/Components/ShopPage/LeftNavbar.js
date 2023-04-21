import { useDispatch, useSelector } from 'react-redux'
import classes from './LeftNavbar.module.css'
import { categoryActions } from '../../store/category';
const LeftNavbar = (props) => {
    const dispatch = useDispatch();
    const category = useSelector(state => state.category.category)
    //Lấy thông tin category để hiển thị danh mục sản phẩm cùng category
    const categoryClickHandler = (event => {
        event.preventDefault();
        dispatch(categoryActions.getCategory(event.target.textContent))
    })
    return(
        <div className={classes.leftNavbar}>
            <h1>CATEGORIES</h1>
            <ul>
                <li className={classes.important}>APPLE</li>
                <li className={category === 'All' ? `${classes.products} ${classes.active}` : `${classes.products}`} onClick={categoryClickHandler}>All</li>
                <li className={classes.title}>IPHONE & MAC</li>
                <li className={category === 'IPhone' ? `${classes.products} ${classes.active}` : `${classes.products}`} onClick={categoryClickHandler}>IPhone</li>
                <li className={category === 'Ipad' ? `${classes.products} ${classes.active}` : `${classes.products}`} onClick={categoryClickHandler}>Ipad</li>
                <li className={category === 'Macbook' ? `${classes.products} ${classes.active}` : `${classes.products}`} onClick={categoryClickHandler}>Macbook</li>
                <li className={classes.title}>WIRELESS</li>
                <li className={category === 'Airpod' ? `${classes.products} ${classes.active}` : `${classes.products}`} onClick={categoryClickHandler}>Airpod</li>
                <li className={category === 'Watch' ? `${classes.products} ${classes.active}` : `${classes.products}`} onClick={categoryClickHandler}>Watch</li>
                <li className={classes.title}>OTHER</li>
                <li className={category === 'Mouse' ? `${classes.products} ${classes.active}` : `${classes.products}`} onClick={categoryClickHandler}>Mouse</li>
                <li className={category === 'Keyboard' ? `${classes.products} ${classes.active}` : `${classes.products}`} onClick={categoryClickHandler}>Keyboard</li>
                <li className={category === 'Other' ? `${classes.products} ${classes.active}` : `${classes.products}`} onClick={categoryClickHandler}>Other</li>
            </ul>
        </div>
    )
}
export default LeftNavbar; 
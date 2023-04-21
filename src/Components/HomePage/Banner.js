import classes from './Banner.module.css';
import { useNavigate } from 'react-router-dom';


const Banner = () => {
    const navigate = useNavigate();
    const shopClickHandle =() => navigate('/shop')
    return (
        <div className={classes.banner}>
            <div className={classes.column1}>
                <p> NEW INSPIRATION 2020 </p>
                <h2> 20% OFF ON NEW SEASON </h2>
                <button onClick={shopClickHandle}> Browse collections </button>
            </div>
        </div>
    )
}

export default Banner;
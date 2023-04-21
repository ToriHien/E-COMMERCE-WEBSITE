import classes from './CollectionList.module.css';
import LINK_IMAGE from '../../Resource/LINK_IMAGE';
import { useNavigate } from 'react-router-dom';

const CollectionList = () => {
    const navigate = useNavigate();
    const shopClickHandle =() => navigate('/shop')
    return(
        <div className={classes.collectionList}>
            <div className={classes.row1}>
                <p>CAREFULLY CREATED COLLECTIONS</p>
                <h2>BROWSE OUR CATEGORIES</h2>
            </div>
            <div className={classes.row2}>
                <img src={LINK_IMAGE[0]} alt='collection' />
                <img src={LINK_IMAGE[1]} alt='collection' />
                <div className={classes.overlay}>
                    <div className={classes.overlay1} onClick={shopClickHandle}></div>
                    <div className={classes.overlay2} onClick={shopClickHandle}></div>
                </div>
                
            </div>
            <div className={classes.row3}> 
                <img src={LINK_IMAGE[2]} alt='collection' />
                <img src={LINK_IMAGE[3]} alt='collection' />
                <img src={LINK_IMAGE[4]} alt='collection' />
                <div className={classes.overlay}>
                    <div className={classes.overlay3} onClick={shopClickHandle}></div>
                    <div className={classes.overlay4} onClick={shopClickHandle}></div>
                    <div className={classes.overlay5} onClick={shopClickHandle}></div>
                </div>
            </div>
        </div>
    )
}
export default CollectionList; 
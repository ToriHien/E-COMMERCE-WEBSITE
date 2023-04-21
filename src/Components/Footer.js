import classes from './Footer.module.css';
import { Link } from 'react-router-dom';
const Footer = (props) => {
    return (
        <div className={classes.footer}>
            <div className={classes.column1}>
                <h2>CUSTOMER SERVICES</h2>
                <p><Link to='/#'>Help & Contact Us</Link></p>
                <p><Link to='/#'>Returns & Refunds</Link></p>
                <p><Link to='/#'>Online Stores</Link></p>
                <p><Link to='/#'>Terms & Condistions</Link></p>
            </div>
            <div className={classes.column2}>
                <h2>COMPANY</h2>
                <p><Link to='/#'>What We Do</Link></p>
                <p><Link to='/#'>Available Services</Link></p>
                <p><Link to='/#'>Latest Posts</Link></p>
                <p><Link to='/#'>FAQs</Link></p>
            </div>
            <div className={classes.column3}>
                <h2>SOCIAL MEDIA</h2>
                <p><Link to='/#'>Twitter</Link></p>
                <p><Link to='/#'>Instagram</Link></p>
                <p><Link to='/#'>Facebook</Link></p>
                <p><Link to='/#'>Pinterest</Link></p>
            </div>
        </div>
    )
}
export default Footer

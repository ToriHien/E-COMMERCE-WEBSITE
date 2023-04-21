import classes from './Others.module.css'
const Others = (props) => {
    return(
        <div className={classes.others}>
            <div className={classes.row1}>
                <div className={classes.other1}>
                    <h2>FREE SHIPPING</h2>
                    <p>Free shipping worldwide</p>
                </div>
                <div className={classes.other2}>
                    <h2>24 X 7 SERVICE</h2>
                    <p>Free shipping worldwide</p>
                </div>
                <div className={classes.other3}>
                    <h2>FESTIVAL OFFER</h2>
                    <p>Free shipping worldwide</p>
                </div>
            </div>
            <div className={classes.row2}>
                <div className={classes.leftPart}>
                    <h2>LET'S BE FRIENDS!</h2>
                    <p>Nisi Nisi tempor consequat laboris nisi.</p>
                </div>
                <form className={classes.rightPart}>
                        <label htmlFor='email'></label>
                        <input type='email' name='email' placeholder='Enter your email address' />
                        <button>Subscribe</button>
                </form>
            </div>
        </div>
    )
}
export default Others; 
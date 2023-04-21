import classes from './Banner.module.css'
const Banner = (props) => {
    return(
        <div className={classes.banner}>
            <div className={classes.center}>
                <h1> {props.title1} </h1>
                 <p> <span>{props.title3}</span> <p>{props.title2}</p> </p>
            </div>
        </div>
    )
}
export default Banner; 
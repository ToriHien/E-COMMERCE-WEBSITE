import classes from './Navbar.module.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from  'react-redux';
import { fetchDataActions } from '../store/fetchdata';
import { useEffect,Fragment} from 'react';
import { authActions } from '../store/auth';
import { userActions } from '../store/user';
import { getKeyLocalStore } from './AuthPage/GETKEYLOCAL';
import { cartActions } from '../store/cart';

const Navbar = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const homeClickHandler = () => navigate('/home');
    const shopClickHandler =() => navigate('/shop')
    const cartClickHandler =() => navigate('/cart')
    const loginClickHandler =() => navigate('/login')
    const isLogin = useSelector(state => state.auth.isAuthenticated)
    const userLogin = useSelector(state => state.user.userLogin)
    const userArr = useSelector(state => state.user.userArr)
    
    async function fetchProducts(){
        const response = await fetch('https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74');
        const data = await response.json();
        dispatch(fetchDataActions.getData(data));
    }
    const logoutClickHandler = (event) => {
        event.preventDefault();
        dispatch(authActions.logout('false'));
        dispatch(userActions.ON_LOGOUT(''))
        localStorage.setItem('isLogin','false');
        localStorage.setItem('userLogin',JSON.stringify([]));
        navigate('/login');
    }
    const login = () => {
        if(isLogin==='true'){
            return(
                <Fragment>
                    <p onClick={cartClickHandler} className={window.location.pathname === '/cart' ? classes.active:''}><i class="bi bi-cart-fill"></i>  Cart</p>
                    <p onClick={loginClickHandler} className={window.location.pathname === '/login' ? classes.active:''}><i class="bi bi-person-fill"></i>  {userLogin.name}</p>
                    <p onClick={logoutClickHandler}> (Logout) </p>
                </Fragment>
            )
        }
        else{
            return(
                <Fragment>
                    <p className={window.location.pathname === '/cart' ? classes.active:''}onClick={cartClickHandler}><i class="bi bi-cart-fill"></i>  Cart</p>
                    <p onClick={loginClickHandler} className={window.location.pathname === '/login' ? classes.active:''}><i class="bi bi-person-fill"></i>  Login</p>
                </Fragment>
            )
        }
    }

    const getKeyUserArr = () =>{
        const value = getKeyLocalStore(
            'userArr',
            JSON.stringify([]),
            'Key userArr chưa có dữ liệu', 
            localStorage.userArr,
        )
        if (value === undefined){
            return value
        }
        else{
            return dispatch(userActions.getUserArr(JSON.parse(value)))
        }
    }
 
    const getKeyIsLogin = () => {getKeyLocalStore(
        'isLogin',
        'false',
        'Key isLogin chưa có dữ liệu',
        dispatch(authActions.login(localStorage.isLogin)),
        )}
    
    const getKeyUserLogin = () => {
        const value = getKeyLocalStore(
        'userLogin',
        JSON.stringify([]),
        'Key userLogin chưa có dữ liệu',
        localStorage.userLogin,
        )
        if (value === undefined){
            return value
        }
        else{
            return dispatch(userActions.ON_LOGIN(JSON.parse(value)))
        }
    }

    const getKeyListCart = () => {
        const value = getKeyLocalStore(
            'listCart',
            JSON.stringify([]),
            'Key listCart chưa có dữ liệu',
            localStorage.listCart
        )
        if (value === undefined){
            return value
        }
        else{
            return dispatch(cartActions.UPDATE_CART(JSON.parse(localStorage.listCart)))
        }
    }

    useEffect(()=>{getKeyUserArr()},[])
   
    useEffect(()=>{getKeyIsLogin()},[])

    useEffect(()=>{getKeyUserLogin()},[])

    useEffect(()=>{getKeyListCart()},[])
    useEffect(() => {login()},[isLogin]);
    useEffect(() => {fetchProducts()},[]);
    
    return (
        <div className={classes.navbar} >
            <div className={classes.leftPart}>
                <p className={window.location.pathname === '/home' ? classes.active:''}onClick={homeClickHandler}>Home</p>
                <p className={window.location.pathname === '/shop' ? classes.active:''}onClick={shopClickHandler}>Shop</p>
            </div>
            <div className={classes.centerPart}>
                <h1>BOUTIQUE</h1>
            </div>
            <div className={classes.rightPart} >
                {login()}
            </div>
        </div>
    )
}
export default Navbar
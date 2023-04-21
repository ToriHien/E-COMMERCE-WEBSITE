import classes from './Signup.module.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { userActions } from '../../store/user';
import { useRef,useState,useEffect } from 'react';


const Signup = (props) => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const nameInputRef= useRef();
    const emailInputRef= useRef();
    const passwordInputRef= useRef();
    const phoneInputRef= useRef();
    const [isUserArr,setIsUserArr] = useState(false);
    const userArr = useSelector(state => state.user.userArr);

    //Lấy dữ liệu nhập của người dùng đưa vào user
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        
        //Xác nhận email đã đăng ký trước đó chưa
        if(userArr.find(user => user.email===enteredEmail)===undefined){
            dispatch(userActions.getUser({
                name:enteredName,
                email:enteredEmail,
                password:enteredPassword,
                phone:enteredPhone,
            }))
            setIsUserArr(true);
        }
        else{
            alert('email đã đăng ký rồi, vui lòng nhập lại email');
        }
    }
    
    //nạp dữ liệu vào mảng userArr và Local Storage 
    const addUser = () => {
        if(isUserArr === true){
            dispatch(userActions.getUserArr([...userArr,user]))
            localStorage.setItem('userArr',JSON.stringify([...userArr,user]));
            setIsUserArr(false);
            navigate('/login');
        }
        else{return console.log('');}
    }

    //nhập lại dữ liệu userArr từ Local Storage khi loading lại trang web
    const getUserArr=() => {
        if(!localStorage.hasOwnProperty('userArr')){
            return localStorage.setItem('userArr',JSON.stringify([]))
        } //Nếu người dùng chưa có key Local Storage thì tạo key userArr
        if(localStorage.userArr===''){
            console.log('Key userArr chưa có dữ liệu')
        } //nếu người dùng đã có key UserArr nhưng chưa có dữ liệu thì thông báo trên console.log

        else{dispatch(userActions.getUserArr(JSON.parse(localStorage.getItem('userArr'))))}
    };
    useEffect(() => {addUser()},[isUserArr]);
    useEffect(()=>{getUserArr()},[])
    

    const toSigninHandler = (event) => {
        navigate('/login')
    }


    return(
        <section className={classes.signup}>
            <form className={classes.form} id='form1' onSubmit={submitHandler}>
                <h1>Sign Up</h1>
                <div className={classes.control}>
                    <input type='text'placeholder='Full Name' form='form1' required ref={nameInputRef}/>
                    <input type='email'placeholder='Email'  form='form1' required ref={emailInputRef}/>
                    <input type='password'placeholder='Password'  form='form1' minLength={8} required ref={passwordInputRef}/>
                    <input type='number'placeholder='Phone' form='form1' required ref={phoneInputRef}/>
                </div>
                    <button className={classes.bt}>SIGN UP</button>
                <div className={classes.last}>
                    <p>Login? </p>
                    <button onClick={toSigninHandler}>Click</button>
                </div>
            </form>
        </section>
    )
}
export default Signup; 
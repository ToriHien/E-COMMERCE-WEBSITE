import classes from './Signup.module.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { userActions } from '../../store/user';
import { useRef,useState,useEffect } from 'react';


const Signup = (props) => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const [isUserArr,setIsUserArr] = useState(false);
    const userArr = useSelector(state => state.user.userArr);
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    const passRegex = /.{8,}/
    const [enteredEmail,setEnteredEmail] = useState('')
    const [enteredName, setEnteredName] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [enteredPhone, setEnteredPhone] = useState(Number)
    const [isEmail, setIsEmail] = useState(true)
    const [isEmail2, setIsEmail2] = useState(true)
    const [isPassword, setIsPassword] = useState(true)
    //Lấy dữ liệu nhập của người dùng đưa vào user

    const nameChangeHandler = (e) => setEnteredName(e.target.value)
    const emailChangeHandler = (e) => setEnteredEmail(e.target.value)
    const passwordChangeHandler = (e) => setEnteredPassword(e.target.value)
    const phoneChangeHandle = (e) => setEnteredPhone(e.target.value)
    const submitHandler = (event) => {
        event.preventDefault();
        
        console.log(enteredEmail,enteredPassword)
        //Xác nhận email đã đăng ký trước đó chưa
        if(userArr.find(user => user.email===enteredEmail)===undefined){
            setIsEmail2(true)
        }
        else{
            setIsEmail2(false)
        }
        if(emailRegex.test(enteredEmail) === true){
            setIsEmail(true);
        } else {
            setIsEmail(false)
        }
        if (!passRegex.test(enteredPassword)) {
            setIsPassword(false)
        } else (setIsPassword(true))
        if (userArr.find(user => user.email===enteredEmail)===undefined && emailRegex.test(enteredEmail) === true && passRegex.test(enteredPassword) === true){
            dispatch(userActions.getUser({
                name:enteredName,
                email:enteredEmail,
                password:enteredPassword,
                phone:enteredPhone,
            }))
            setIsUserArr(true);
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
                    <input type='text'placeholder='Full Name' form='form1' required onChange = {nameChangeHandler}/>
                    {isEmail ? <> </> : <div className={classes.invalidText}> Email invalid </div>}
                    {isEmail2 ? <> </> : <div className={classes.invalidText}> email đã đăng ký rồi, vui lòng nhập lại email </div>}
                    <input className={isEmail ? classes.valid : classes.invalid} type='text'placeholder='Email'  form='form1' required onChange = {emailChangeHandler}/>
                    {isPassword ? <> </> : <div className={classes.invalidText}> Password phải có ít nhất 8 ký tự </div>}
                    <input type='password'placeholder='Password'  form='form1' required onChange = {passwordChangeHandler}/>
                    <input type='number'placeholder='Phone' form='form1' required onChange = {phoneChangeHandle}/>
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
import classes from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user';
import { authActions } from '../../store/auth';
import React from 'react';

const Login = (props) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [enteredEmail,setEnteredEmail] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const userLogin = useSelector(state => state.user.userLogin);
    const isLogin = useSelector(state => state.auth.isAuthenticated);
    const userArr = useSelector(state => state.user.userArr);
    const [isEmail, setIsEmail] = useState(true)
    const [isPassword, setIsPassword] = useState(true)

    // Hàm chuyển qua register
    const toSignupHandler = (event) => {
        navigate('/register')
    }
    
    const emailChangeHandler = (e) => setEnteredEmail(e.target.value)
    const passwordChangeHandler = (e) => setEnteredPassword(e.target.value)

    //Kết quả xử lý sau khi login
    const submitHandler=(event) => {
        event.preventDefault();

        const lookAccount = userArr.find(user => user.email === enteredEmail)
        
        if(lookAccount !== undefined){
            setIsEmail(true)
            if(lookAccount.password === enteredPassword){
                dispatch(userActions.ON_LOGIN({
                    name:lookAccount.name,
                    email:lookAccount.email,
                    password:lookAccount.password,
                    phone:lookAccount.phone,
                }))
                setIsPassword(true)
                dispatch(authActions.login('true'))
                localStorage.setItem('isLogin','true');
                localStorage.setItem(
                    'userLogin',
                    JSON.stringify({
                        name:lookAccount.name,
                        email:lookAccount.email,
                        password:lookAccount.password,
                        phone:lookAccount.phone,                       
                    })
                );

                
            }
            else{ 
                setIsPassword(false)
            }
        }
        else{
            setIsEmail(false)
        }
    }

    const login = ()=>{
        if(isLogin==='true') {
            return (
                <React.Fragment>
                    <h2>Đăng nhập thành công</h2>
                    <h3>Chào {userLogin.name}</h3>
                </React.Fragment>
        )}
        if(isLogin === undefined){return(
            <React.Fragment>
                <h1>Sign In</h1>
                <div className={classes.control}>
                    <input type='email'placeholder='Email' form='form1'required onChange={emailChangeHandler}/>
                    <input type='password'placeholder='Password' form='form1' required onChange ={passwordChangeHandler}/>
                </div>
                    <button className={classes.bt}>SIGN IN</button>
                <div className={classes.last}>
                    <p>Create an account? </p>
                    <button onClick={toSignupHandler}>Sign up</button>
                </div>
            </React.Fragment>
        )}
        else {
            return(
                <React.Fragment>
                    <h1>Sign In</h1>
                    <div className={classes.control}>
                        {isEmail ? <> </> : <div className={classes.invalidText}> Tên Email không tồn tại </div>}
                        <input type='text'placeholder='Email' form='form1'required onChange={emailChangeHandler}/>
                        {isPassword ? <> </> : <div className={classes.invalidText}> Mật khẩu sai, vui lòng nhập lại </div>}
                        <input type='password'placeholder='Password' form='form1' required onChange ={passwordChangeHandler}/>
                    </div>
                        <button className={classes.bt}>SIGN IN</button>
                    <div className={classes.last}>
                        <p>Create an account? </p>
                        <button onClick={toSignupHandler}>Sign up</button>
                    </div>
                </React.Fragment>
            )
        }
    }
    
    return(
        <section className={classes.signin}>
            <form className={classes.form} id='form1' onSubmit={submitHandler}>
                {login()}
            </form>
        </section>
    )
}
export default Login; 
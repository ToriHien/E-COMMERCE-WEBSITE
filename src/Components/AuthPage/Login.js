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
    const inputEmailRef=useRef();
    const inputPasswordRef=useRef();
    const userLogin = useSelector(state => state.user.userLogin);
    const isLogin = useSelector(state => state.auth.isAuthenticated);
    const userArr = useSelector(state => state.user.userArr);

    // Hàm chuyển qua register
    const toSignupHandler = (event) => {
        navigate('/register')
    }
    
    //Kết quả xử lý sau khi login
    const submitHandler=(event) => {
        event.preventDefault();
        const enteredEmail = inputEmailRef.current.value;
        const enteredPassword = inputPasswordRef.current.value;
        const lookAccount = userArr.find(user => user.email === enteredEmail)
        if(lookAccount !== undefined){
            if(lookAccount.password === enteredPassword){
                dispatch(userActions.ON_LOGIN({
                    name:lookAccount.name,
                    email:lookAccount.email,
                    password:lookAccount.password,
                    phone:lookAccount.phone,
                }))
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
                // setIsValidated(true);
                
            }
            else{ 
                alert('Mật khẩu sai, vui lòng nhập lại');
                // setIsValidated(false)
                inputPasswordRef.current.value=''
            }
        }
        else{
            alert('email chưa đăng ký, vui lòng đăng ký')
            inputPasswordRef.current.value=''
            // setIsValidated(false)
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
                    <input type='email'placeholder='Email' form='form1'required ref={inputEmailRef}/>
                    <input type='password'placeholder='Password' form='form1' required ref={inputPasswordRef}/>
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
                        <input type='email'placeholder='Email' form='form1'required ref={inputEmailRef}/>
                        <input type='password'placeholder='Password' form='form1' required ref={inputPasswordRef}/>
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
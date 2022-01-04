import classes from './AuthForm.module.css';
import {useContext, useReducer, useRef} from "react";
import AuthContext from "../../store/auth-context";
import {useHistory} from 'react-router-dom';
import AuthFormContext from "../../store/auth-form-context";

const AuthForm = () => {

    // const history=useHistory()
    //   const authCtx = useContext(AuthContext);
    //
    //
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    //
    //
    //   const reducerFromState = (state, action) => {
    //       if (action.type === 'login') {
    //           return {...state, isLogin: !state.isLogin};
    //
    //       }
    //
    //       if (action.type === 'logout') {
    //
    //
    //           return {...state, isLogin: !state.isLogin};
    //
    //       }
    //       if(action.type==='loading'){
    //           return {...state,isLoading:action.payload }
    //       }
    //
    //       return state;
    //
    //
    //   }
    //
    //   const initialState = {isLogin: true, isLoading: false};
    //
    //   const [formStateObj, dispatch] = useReducer(reducerFromState, initialState);
    //
    //   const switchAuthModHandler = () => {
    //
    //       if (formStateObj.isLogin) {
    //           dispatch({type: 'login'});
    //
    //       } else {
    //
    //           dispatch({type: 'logout'});
    //
    //       }
    //
    //   }
    //
    //   const submitHandler=(event)=>{
    //       event.preventDefault();
    //       const enteredEmail=emailInputRef.current.value;
    //       const enteredPass=passwordInputRef.current.value;
    //       let url;
    //       if(formStateObj.isLogin){
    //           url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzA2L7B5UL-K_M38Hucj-QcCk_Z3lZqNE';
    //       }else{
    //           url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzA2L7B5UL-K_M38Hucj-QcCk_Z3lZqNE'
    //       };
    //
    //       dispatch({type:'loading',payload:true});
    //       fetch(url,{method:'POST',body:JSON.stringify({
    //               email:enteredEmail,
    //               password:enteredPass,
    //               returnSecureToken:true
    //           }),
    //          headers:{
    //           'Content-Type':'application/json'
    //          }
    //       }).then(res=>{
    //           dispatch({type:'loading',payload:false});
    //           if(res.ok){
    //                return res.json();
    //           }else{
    //               return  res.json().then(data=>{
    //                   let errorMessage='Authentication failed';
    //                   throw  new Error(errorMessage);
    //               })
    //           }
    //       }).then(data=>{
    //           authCtx.login(data.idToken);
    //           history.replace('/');
    //
    //       }).catch(err=>{
    //           alert(err.message);
    //       })
    //
    //   }


    const authFormCtx = useContext(AuthFormContext);

    const saveFormHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPass = passwordInputRef.current.value;
        authFormCtx.saveForm(enteredEmail, enteredPass);
    }

    console.log(authFormCtx.formState.isLogin);


    return (
        <section className={classes.auth}>

            <h1>{authFormCtx.formState.isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={saveFormHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={passwordInputRef}/>
                </div>
                <div className={classes.actions}>
                    {!authFormCtx.formState.isLoading && <button>{authFormCtx.formState.isLogin ? 'Login' : 'Create Account'}</button>}


                    <button type='button' className={classes.toggle}
                            onClick={authFormCtx.switchMode}>{authFormCtx.formState.isLogin ? 'Create new account' : 'Login with existing account'}</button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
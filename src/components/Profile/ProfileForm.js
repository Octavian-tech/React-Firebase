import {useContext, useRef, useState} from "react";
import AuthContext from "../../store/auth-context";
import {useHistory} from "react-router-dom";
import classes from './ProfileForm.module.css';
import Card from "../UI/Card";

const ProfileForm=()=>{

    const newPasswordInputRef=useRef();
    const newEmailInputRef=useRef();

    const history=useHistory();
    const authCtx=useContext(AuthContext);

    // const [updateEmail,setUpdateEmail]=useState(true);
    // const [updatePass,setUpdatePass]=useState(true);
    //
    // const showEmailField=()=>{
    //
    //     setUpdateEmail((prevState)=>!prevState);
    //
    // }
    //
    // const showPassField=()=>{
    //     setUpdatePass((prevState)=>!prevState);
    //
    // }

    const submitHandler=event=>{
        event.preventDefault();

        const enteredNewEmail=newEmailInputRef.current.value;
        const enteredNewPassword=newPasswordInputRef.current.value;

//         const [valObj,setValObj]=useState({  idToken:authCtx.token,
//             username:enteredNewEmail,
//             password:enteredNewPassword,
//             returnSecureToken:false})
//
//
//         if(enteredNewEmail===null){
// setValObj((prevState)=>{...prevState,})
//         }


        //update data

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCzA2L7B5UL-K_M38Hucj-QcCk_Z3lZqNE',{
            method:'POST',
            body:JSON.stringify({
                idToken:authCtx.token,
                email:enteredNewEmail,
                password:enteredNewPassword,
                returnSecureToken:false
            }),
            headers:{
                'Content-Type':'application/json',
            }
        }).then(res => {
                history.replace('/');

            })



    }



    return (

        <Card>
        <form  className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
             <label htmlFor='new-email'>New email</label>
              <input type='email' id='new-email' required ref={newEmailInputRef} />
            {/*<button onClick={showEmailField}>Update email</button>*/}
        </div>
        <div className={classes.control}>
            <label htmlFor='new-password'>New password</label>
            <input type='password' id='new-password' required ref={newPasswordInputRef} />
            {/*<button onClick={showPassField}>Update password</button>*/}
        </div>
        <div className={classes.actions}><button className='btn'>Change Account data</button></div>

    </form>

        </Card>);
}

export default  ProfileForm;
import React, {useContext, useRef, useReducer} from 'react';
import {useHistory} from "react-router-dom";
import AuthContext from "./auth-context";

const AuthFormContext = React.createContext({
    formState: {},
    saveForm: (enteredEmail, enteredPass) => {
    },
    switchMode: () => {
    }

});


export default AuthFormContext;


export const AuthFormContextProvider = (props) => {


    const history = useHistory()
    const authCtx = useContext(AuthContext);

    const reducerFromState = (state, action) => {
        if (action.type === 'login') {
            return {...state, isLogin: !state.isLogin};

        }

        if (action.type === 'logout') {


            return {...state, isLogin: !state.isLogin};

        }
        if (action.type === 'loading') {
            return {...state, isLoading: action.payload}
        }

        return state;


    }

    const initialState = {isLogin: true, isLoading: false};

    const [formStateObj, dispatch] = useReducer(reducerFromState, initialState);

    const switchAuthModHandler = () => {

        if (formStateObj.isLogin) {
            dispatch({type: 'login'});

        } else {

            dispatch({type: 'logout'});

        }

    }

    const submitHandler = (enteredEmail, enteredPass) => {
        // event.preventDefault();
        // const enteredEmail=emailInputRef.current.value;
        // const enteredPass=passwordInputRef.current.value;
        let url;
        if (formStateObj.isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzA2L7B5UL-K_M38Hucj-QcCk_Z3lZqNE';
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzA2L7B5UL-K_M38Hucj-QcCk_Z3lZqNE'
        }
        ;

        dispatch({type: 'loading', payload: true});
        fetch(url, {
            method: 'POST', body: JSON.stringify({
                email: enteredEmail,
                password: enteredPass,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            dispatch({type: 'loading', payload: false});
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(data => {
                    let errorMessage = 'Authentication failed';
                    throw  new Error(errorMessage);
                })
            }
        }).then(data => {

            const expirationTime=new Date(new Date().getTime()+(+data.expiresIn*1000));

            authCtx.login(data.idToken,expirationTime);
            history.replace('/');

        }).catch(err => {
            alert(err.message);
        })

    }


    return <AuthFormContext.Provider value={{
        formState: formStateObj,
        saveForm: submitHandler,
        switchMode: switchAuthModHandler
    }}>
        {props.children}
    </AuthFormContext.Provider>


}
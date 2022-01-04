import React, {useCallback, useEffect, useState} from "react";

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token,expirationTime) => {
    },
    logout: () => {
    },
});


export default AuthContext;

const calculateRemainingTime=(expirationTime)=>{
    const currentTime=new Date().getTime();
    const adjExpirationTime=new Date(expirationTime).getTime();

    const remainingTime=adjExpirationTime-currentTime;

    return remainingTime;
}


const retrieveStoredToken=()=>{
    const storedToken=localStorage.getItem('token');
    const storedExpirationDate=localStorage.getItem('expirationTime');

    const remainingTime=calculateRemainingTime(storedExpirationDate);

    if(remainingTime <=3600){
        localStorage.removeItem('token');

        localStorage.removeItem('expirationTime');

        return null;

    }

    return {
        token:storedToken,
        duration:remainingTime
    };
}




export const AuthContextProvider=(props)=>{

    const tokenData=retrieveStoredToken();

    let initialToken;

    if(tokenData){
        initialToken=tokenData.token;
    }


    const [token,setToken]=useState(initialToken);

    const userIsLoggedIn=!!token;

    const loginHandler=(token,expirationTime)=>{

        setToken(token);
        localStorage.setItem('token',token);
        localStorage.setItem('expirationTime',expirationTime);
        const remainingTime=calculateRemainingTime(expirationTime);

        logoutTimer=setTimeout(logoutHandler,remainingTime);

        // console.log(token);


    };

    const logoutHandler=useCallback(  ()=>{

        console.log('declansat');
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        if(logoutTimer){
            clearTimeout(logoutTimer);
        }


    },[]);

    const contextValue={
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler,
    };


    useEffect(()=>{
        if(tokenData){
            logoutTimer=setTimeout(logoutHandler,tokenData.duration);
        }
    },[tokenData,logoutHandler]);





    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}
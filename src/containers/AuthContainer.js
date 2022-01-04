import {Fragment} from "react";
import AuthContext from "../store/auth-context";


const AuthContainer=(props)=>{



    const authCtx = useContext(AuthContext);


    const reducerFromState = (state, action) => {
        if (action.type === 'login') {
            return {...state, isLogin: !state.isLogin};

        }

        if (action.type === 'logout') {


            return {...state, isLogin: !state.isLogin};

        }

        return state;


    }

    const initialState = {isLogin: false, isLoading: false};

    const [formStateObj, dispatch] = useReducer(reducerFromState, initialState);

    const switchAuthModHandler = () => {

        if (formStateObj.isLogin) {
            dispatch({type: 'login'});

        } else {

            dispatch({type: 'logout'});

        }

    }


    return <Fragment>
        {props.children}
    </Fragment>

}

export default  AuthContainer;
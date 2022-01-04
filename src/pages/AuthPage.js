import AuthForm from "../components/Auth/AuthForm";
import {AuthFormContextProvider} from "../store/auth-form-context";
import ProfilePosition from "../components/UI/ProfilePosition";


const AuthPage=()=>{
    return(
    <AuthFormContextProvider>
        <ProfilePosition>
        <AuthForm/>
        </ProfilePosition>

    </AuthFormContextProvider>);

}

export default AuthPage;
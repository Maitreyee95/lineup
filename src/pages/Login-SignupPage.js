import { useEffect } from "react";
import Loader from "../components/Loader";
import Login from "../components/Login";
import useCustomHook from "../hooks/useCustomHook";
import secureLocalStorage from "react-secure-storage";

function LoginSignupPage(){
    const {setErrorMessage, setCurrentEmail,navigate} = useCustomHook();

    useEffect(()=> {
        if(secureLocalStorage.getItem("id")){
            navigate('/lineup/tasks');
        }else{
            setErrorMessage();
            setCurrentEmail("");
            secureLocalStorage.clear();
        }
        
    },[]);
    return(
        <div className="login-bg">
            
            <Login />
            <Loader />
        </div>
    )
}

export  default LoginSignupPage;
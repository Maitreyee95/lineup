import Route from "./components/Route";
import TaskPage from "./pages/TaskPage";
import LoginSignupPage from "./pages/Login-SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { useEffect } from "react";
import useCustomHook from "./hooks/useCustomHook";
import secureLocalStorage from "react-secure-storage";

function App(){
    const {navigate} = useCustomHook();
    useEffect(()=>{
        if(!secureLocalStorage.getItem("id")){
            navigate('/memo');
        }else{
            navigate('/memo/tasks');
        }
    },[]);
    return (
    <div className="app font-mono text-xs md:text-sm">
        <div>
            <Route path = '/memo'>
                <LoginSignupPage />
            </Route>
            <Route path='/memo/tasks'>
                <TaskPage />
            </Route>
            <Route path ='/memo/forgotpassword'>
                <ForgotPasswordPage />
            </Route>
            <Route path = '/memo/logout'>
                <LoginSignupPage />
            </Route>
        </div>

    </div>
)
};

export default App;
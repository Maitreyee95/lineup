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
            navigate('/lineup');
        }else{
            navigate('/lineup/tasks');
        }
    },[]);
    return (
    <div className="app font-mono text-xs md:text-sm">
        <div>
            <Route path = '/lineup'>
                <LoginSignupPage />
            </Route>
            <Route path='/lineup/tasks'>
                <TaskPage />
            </Route>
            <Route path ='/lineup/forgotpassword'>
                <ForgotPasswordPage />
            </Route>
            <Route path = '/lineup/logout'>
                <LoginSignupPage />
            </Route>
        </div>

    </div>
)
};

export default App;
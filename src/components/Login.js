import classNames from "classnames";
import { useRef, useState } from "react";
import useCustomHook from "../hooks/useCustomHook";

function Login(){

    const {signUp, login, navigate, setPwdCode, currentEmail, setCurrentEmail,getUserId, sendEmail, errorMessage, setErrorMessage} = useCustomHook();
    const passwordRef =useRef();
    const passwordConfirmRef = useRef();


    const [showRegister, setShowRegister] = useState('');

    const loginClass = classNames(!showRegister?'underline decoration-4 underline-offset-8 decoration-lime-800':'',' cursor-pointer text-xl justify-self-center' );
    const registerClass= classNames(showRegister?'underline decoration-4 underline-offset-8  decoration-lime-800':'','cursor-pointer text-xl justify-self-center' );

    const handleSubmit = async (event) =>{
        event.preventDefault();
        setErrorMessage();
        if (showRegister){
            
            if(passwordRef.current.value !== passwordConfirmRef.current.value){
                setErrorMessage(<div>Passwords do not match</div>);
            }else{
                var userId=await getUserId();
                if(userId){
                    setErrorMessage(<div>Account already exists!</div>);
                }else{
                    await signUp(passwordRef.current.value);
                }
            }
        }else{
            var userId=await getUserId();
            if(userId){
                await login(passwordRef.current.value);
                
            }else{
                setErrorMessage(<div>Account with this email does not exist! Please Register.</div>);
            }
        }
    };

    const handleForgotClick = async () =>{
        setErrorMessage();
        if(currentEmail){
            sendEmail(()=>navigate('/forgotpassword'))  
        }else{
            navigate('/forgotpassword');
        }
    };
     


    return(<div className="grid items-center p-4" style={{"height": "100vh"}}>
            
            <div className="fixed border-lime-800 border-4 bg-emerald-100 rounded-lg grid justify-center justify-self-center items-center size-auto p-3 opacity-80">
                <div className="grid grid-cols-3 justify-center p-10">
                    <div className={loginClass}  onClick={() =>{setErrorMessage(); setShowRegister(false)}} >Login</div>
                    <div className="justify-self-center"> | </div>
                    <div className={registerClass} onClick={() => {setErrorMessage();setShowRegister(true)}}>Register</div>
                </div>
                <div>
                
                    <form onSubmit={handleSubmit} >
                       
                        <div className="grid grid-cols-3 p-3">
                        <label className=" p-3 ">Email ID </label>
                        <input type="email" value={currentEmail} onChange={(e)=>setCurrentEmail(e.target.value)} className="border-3 rounded-lg border-lime-800 p-2 col-span-2" required placeholder= "&#9993; Enter Email ID"/>
                        </div>
                        <div className="grid grid-cols-3 p-3">
                            <label className=" p-3" >Password</label>
                            <input type="password" className="border-3 rounded-lg border-lime-800 p-2 col-span-2" required ref={passwordRef} placeholder="&#9919; Enter Password"/>
                        </div>
                        {showRegister && <div className="grid grid-cols-3 p-3">
                            <label className=" p-3" >Confirm Password</label>
                            <input  type="password" className="border-3 rounded-lg border-lime-800 p-2 col-span-2" required ref={passwordConfirmRef} placeholder="&#9919; Retype Password" />
                        </div>}
                        
                        <div className="grid grid-cols-1 p-3 text-center text-red-700">{errorMessage}</div>
                        <div className="grid grid-cols-1 p-3 justify-center">
                           {!showRegister && <button className="border-4 text-white bg-lime-800 rounded p-2 "> Login </button> }
                           {showRegister && <button className="border-4 text-white bg-lime-800 rounded p-2 "> Register </button> }
                        </div>
                    </form>
                </div>
                {!showRegister && <div className="grid grid-cols-1 justify-self-center p-4 cursor-pointer" onClick={handleForgotClick}> Forgot Password? </div>}
            </div>
        </div>)
};

export default Login;
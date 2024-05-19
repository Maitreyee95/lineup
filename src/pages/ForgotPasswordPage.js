import { useEffect, useRef, useState } from "react";
import useCustomHook from "../hooks/useCustomHook";
import Loader from "../components/Loader";

function ForgotPasswordPage(){
    const { pwdCode,navigate, currentEmail, setCurrentEmail, resetPassword, sendEmail ,errorMessage, setErrorMessage} = useCustomHook();
    const codeRef= useRef();
    const newPwdRef = useRef();
    const newConfirmPwdRef = useRef();
    const [isOpen, setIsOpen  ]= useState(false);
    const [showEmail, setShowEmail] =useState(false);
    const [showReset, setShowReset] = useState(false);

    useEffect(() => {
        
        const fn=async()=>{
            if(!currentEmail){
                setShowEmail(true);
            }else{
                setShowReset(true);
            }
        };
        fn();
        setErrorMessage();
    },[]);

    const handleSubmit = (event) =>{
        event.preventDefault();
        setErrorMessage();
        console.log(pwdCode,codeRef.current.value)
        if(codeRef.current.value==pwdCode){
            setIsOpen(true);
            setShowReset(false);
        }else{
            setErrorMessage(<div>Code is wrong!</div>)
        }
        
    }

    const handleEmailSubmit = (event) => {
        event.preventDefault();
        setErrorMessage();

        sendEmail(()=>setShowReset(true))
        
    }

    const handlePwdSubmit = (event) => {
        event.preventDefault();
        setErrorMessage();
        if(newPwdRef.current.value===newConfirmPwdRef.current.value){
            resetPassword(newPwdRef.current.value);
            navigate('/');
        }else{
            setErrorMessage(<div>Passwords do not match</div>);
        }
    }
    
    return (
        <div className="grid items-center p-4" style={{"height": "100vh"}}>
            {showEmail &&   <div className="fixed border-lime-800 border-4 bg-emerald-100 rounded-lg grid justify-center justify-self-center items-center size-auto p-4 opacity-80">
                                <div className="pb-3 font-semibold">Enter your registered email id to receive verification code</div>
                                <form className="grid m-3" onSubmit={handleEmailSubmit} >
                                    <label className="p-3 text-center">Enter your email</label>
                                    <input type="email" className="m-3 p-3 border-1 rounded-lg" value={currentEmail} required onChange={(event)=>setCurrentEmail(event.target.value)}/>
                                    <div className="grid grid-cols-1 p-3 text-center text-red-700">{errorMessage}</div>
                                    <button className="m-3 p-3 border-1 rounded-lg bg-lime-800 text-white">Send code</button>
                                </form>
                            </div>    }                  
            {showReset &&   <div className="fixed border-lime-800 border-4 bg-emerald-100 rounded-lg grid justify-center justify-self-center items-center size-auto p-4 opacity-80">
                                <div className="pb-3 font-semibold">We have sent a verification code to your registered email ID</div>
                                <form className="grid m-3" onSubmit={handleSubmit} >
                                    <label className="p-3 text-center">Verification code</label>
                                    <input className="m-3 p-3 border-1 rounded-lg" required ref={codeRef}/>
                                    <div className="grid grid-cols-1 p-3 text-center text-red-700">{errorMessage}</div>
                                    <button className="m-3 p-3 border-1 rounded-lg bg-lime-800 text-white">Check</button>
                                </form>
                            </div> }          
                {isOpen &&  <div className="fixed border-lime-800 border-4 bg-emerald-100 rounded-lg grid justify-center justify-self-center items-center size-auto p-4 opacity-80">
                                <div className="pb-3 font-semibold">Set a new password</div>
                                    <form className="grid m-3" onSubmit={handlePwdSubmit} >
                                        <label className="p-3 text-center">Enter New Password</label>
                                        <input type="password" className="m-3 p-3 border-1 rounded-lg" required ref={newPwdRef}/>
                                        <label className="p-3 text-center">Confirm New Password</label>
                                        <input type="password" className="m-3 p-3 border-1 rounded-lg" ref={newConfirmPwdRef} required/>
                                        <div className="grid grid-cols-1 p-3 text-center text-red-700">{errorMessage}</div>
                                        <button className="m-3 p-3 border-1 rounded-lg bg-lime-800 text-white">Set Password</button>
                                    </form>
                                </div>    }       
                <Loader />
            </div>
        )
}

export default ForgotPasswordPage;
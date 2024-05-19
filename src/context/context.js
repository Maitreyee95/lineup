import axios from "axios";
import { createContext, useState , useEffect } from "react";
import emailjs from "@emailjs/browser";
import  secureLocalStorage  from  "react-secure-storage";

var bcrypt = require('bcryptjs');
const salt = 10;

const Context= createContext();

function Provider({children}){
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const [currentEmail, setCurrentEmail] = useState("");

    const [tasks,setTasks] = useState([]);
    const [pastTasks, setPastTasks] = useState([]);

    const today = new Date();
    const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let [month, setMonth] = useState(today.getMonth());
    let [monthName, setMonthName] =useState(monthsArray[month]);
    let [year, setYear] = useState(today.getFullYear());
    const [date, setDate] = useState(today.getDate());
    let[currentFullDate, setCurrentFullDate] = useState(new Date(`${month+1} ${date} ${year}`));

    const [showLoader, setShowLoader]  = useState(false);

    const [calendar,setCalendar] = useState([]);
    const [errorMessage, setErrorMessage] =useState();
    const [pwdCode, setPwdCode] = useState();


    useEffect( () => {
        const handler= () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('popstate', handler);
        
        return () => {
            window.removeEventListener('popstate', handler);
        }
    },[]);


    const signUp= async(password) =>{
        setShowLoader(true);
        password= bcrypt.hashSync(password,salt);
        const response=await axios.post('https://retoolapi.dev/ERSclT/data',
            {
                emailId: currentEmail,
                password
            }
        );
        navigate("/memo/tasks");
        secureLocalStorage.setItem("id",response.data.id);
        secureLocalStorage.setItem("name",currentEmail.split("@")[0]);
        setShowLoader(false);
    };

    const login= async (password)  => {
        setShowLoader(true);
        const response = await axios.get(`https://retoolapi.dev/ERSclT/data?emailId=${currentEmail}`);
        const resPassword = response.data[0].password;
        if( bcrypt.compareSync(password,resPassword)){
            navigate("/memo/tasks");
            secureLocalStorage.setItem("id",response.data[0].id);
            secureLocalStorage.setItem("name",currentEmail.split("@")[0]);
        }else{
            setErrorMessage(<div>Password is incorrect</div>)
        }
        setShowLoader(false);        
    }

    const getUserId =async() => {
        const response = await axios.get(`https://retoolapi.dev/ERSclT/data?emailId=${currentEmail}`);
        console.log(response);
        if (response.data.length >  0){
            return response.data[0].id;
        }else{
            return false;
        }
    };

    const sendEmail = async (successFn)=>{
        const userId= await getUserId();
        setShowLoader(true);   
        if(userId){
             
            const code = Math.floor(Math.random() * 100000);
            setPwdCode(code);
            emailjs.send("service_9geyrz9","template_yqevwx5",{'code': code, 'email':currentEmail},{
                publicKey: 'ZijntTAZr34j6X3wb'
            }).then((success) => {successFn();setShowLoader(false);    
            },(error)=> {setErrorMessage(error.text);setShowLoader(false);});
        }else{
            setErrorMessage(<div>Account with this email does not exist. Please register</div>);
            setShowLoader(false);   
        }
        

    }

    const resetPassword = async (password) =>{
        setShowLoader(true);
        var id = await getUserId();
        password= bcrypt.hashSync(password,salt);
        if(id){
            const response = await axios.patch(`https://retoolapi.dev/ERSclT/data/${id}`,{
            password
             });
             setShowLoader(false);
            return true;
        }
        return false;
    };




    const fetchTasks= async() => {
        setShowLoader(true);
        const response= await axios.get(`https://retoolapi.dev/CFsY5q/tasks?userId=${secureLocalStorage.getItem("id")}`);
        const arr= response.data.filter((el)=>{
            var startDate= el["Start date"].split("-");
            startDate= `${startDate[1]} ${startDate[0]} ${startDate[2]}`;
            var endDate= el["End date"].split("-");
            endDate= `${endDate[1]} ${endDate[0]} ${endDate[2]}`;
            return currentFullDate>=new Date(startDate) && currentFullDate<=new Date(endDate)
        }
        );
       setTasks(arr);
       setShowLoader(false);
    };

    const fetchPastTasks = async() => {
        setShowLoader(true);
        const response= await axios.get(`https://retoolapi.dev/CFsY5q/tasks?userId=${secureLocalStorage.getItem("id")}`);
        const arr= response.data.filter((el)=>{
            var endDate= el["End date"].split("-");
            endDate= `${endDate[1]} ${endDate[0]} ${endDate[2]}`;
            return new Date((new Date()).toDateString()) >new Date(endDate) && el.Status !== "Completed";
        }
        );
       setPastTasks(()=>{return arr});
       setShowLoader(false);
    }

    const updateTasksStatus = async(status,id) => {
        setShowLoader(true);    
        await axios.patch(`https://retoolapi.dev/CFsY5q/tasks/${id}`,
            {
                "Status" : status
            }
        );
        fetchPastTasks();
        setShowLoader(false);
        
    };

    const updateTasks = async(body,id) => {
        setShowLoader(true);
        const response = await axios.patch(`https://retoolapi.dev/CFsY5q/tasks/${id}`,
            body
        );
        var startDate= body["Start date"].split("-");
        startDate= new Date(`${startDate[1]} ${startDate[0]} ${startDate[2]}`);
        var endDate= body["End date"].split("-");
        endDate= new Date(`${endDate[1]} ${endDate[0]} ${endDate[2]}`);
        if(currentFullDate>=startDate && currentFullDate<=endDate){
            const updatedTasks = tasks.map((task) => {
                if( task.id === id){
                    return {...task,...response.data};
                }
                return task;
            });
            setTasks(updatedTasks);
        }else{
            const updatedTasks=tasks.filter((task) => task.id!==id);
            setTasks(updatedTasks);
        }

        fetchPastTasks();
        setShowLoader(false);
    };

    const addTask = async (body) => {
        setShowLoader(() => {return true});
        const request = {...body, userId: secureLocalStorage.getItem("id")};
        const response = await axios.post('https://retoolapi.dev/CFsY5q/tasks/',
            request
        );
        var startDate= body["Start date"].split("-");
        startDate= new Date(`${startDate[1]} ${startDate[0]} ${startDate[2]}`);
        var endDate= body["End date"].split("-");
        endDate= new Date(`${endDate[1]} ${endDate[0]} ${endDate[2]}`);
        if(currentFullDate>=startDate && currentFullDate<=endDate){
            const updatedTasks =[...tasks,response.data]; 
            setTasks(updatedTasks);
        }
        await fetchPastTasks();
        setShowLoader(false);
    };


    const deleteTask = async(id) =>{
        setShowLoader(() => {return true});
        await axios.delete(`https://retoolapi.dev/CFsY5q/tasks/${id}`);
        const updatedTasks = tasks.filter((task)=> task.id!== id);
        setTasks(()=>{return updatedTasks});
        await fetchPastTasks();
        setShowLoader(() => {return false});
    };
   
    

    const navigate = (to) => {
        console.log(to)
        window.history.pushState({}, '',to);
        setCurrentPath(to);
    };

    const getCalendar = async() => {
        setShowLoader(true);
        const response = await axios.get(`https://calendar-json-app.adaptable.app/month/${monthName}?year=${year}`);
        setCalendar(response.data[monthsArray[month]]);
        setShowLoader(false);
    };

    const incrementYear = () => {
        setYear((current) => {
            current++;
            setCurrentFullDate(new Date(`${month+1} ${date} ${current}`))
            return current;
        });
       
        getCalendar();        
    };

    const decrementYear = () => {
        setYear((current) => {
            current--;
            setCurrentFullDate(new Date(`${month+1} ${date} ${current}`))
            return current;
        });
        getCalendar();        
    };

    const changeMonth = (month, index) =>{
        setMonthName(()=> {
            setMonth(() => {return index});
            setCurrentFullDate(() => {return new Date(`${index+1} ${date} ${year}`)});
            return month;
        });
        
    } 

    const changeDate = (date) => {
        setDate(() =>{ 
            setCurrentFullDate(() => {return new Date(`${month+1} ${date} ${year}`)});
            return date;
        });
    }

    const valueToShare = {
        signUp, login, resetPassword, getUserId,
        currentEmail, setCurrentEmail, 
        tasks, pastTasks, currentPath, fetchTasks, updateTasksStatus, updateTasks, addTask, deleteTask, fetchPastTasks,
        date, month, monthName, year, currentFullDate, calendar, monthsArray, getCalendar, incrementYear, decrementYear, setMonthName, changeMonth, changeDate,
        showLoader,
        sendEmail,errorMessage,setErrorMessage, pwdCode,
        navigate
    };


    return( 
    <Context.Provider value = {valueToShare}>
        {children}
    </Context.Provider>
    );
}

export { Context };
export default Provider;
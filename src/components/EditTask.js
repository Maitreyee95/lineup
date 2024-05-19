import { useState } from "react";
import useCustomHook from "../hooks/useCustomHook";

function EditTask({task, onClose}) {

    let{ updateTasks, addTask, date,month,year} = useCustomHook();

    const currentTask = task || {} ;

    const [title, setTitle] = useState(currentTask.title || '');

    const [startDate, setStartDate] = useState(currentTask['Start date']?.split("-").reverse().join("-") || `${year}-${(month+1).toString().padStart(2,0)}-${date.toString().padStart(2,0)}`);
    const [endDate, setEndDate] = useState(currentTask['End date']?.split("-").reverse().join("-") || `${year}-${(month+1).toString().padStart(2,0)}-${date.toString().padStart(2,0)}`);
    const [showError, setShowError] = useState(false);

    const handleSubmit= (event) => {
        event.preventDefault();
        var temp1=startDate, temp2= endDate;//2024-05-13
        var a= temp1.split("-");
        a= new Date(`${a[1]} ${a[2]} ${a[0]}`);//
        var b= temp2.split("-");
        b= new Date(`${b[1]} ${b[2]} ${b[0]}`);

        if (b<a){
            setShowError(true);
            return;
        }else{
            const body = {
                title: title,
                'Start date': startDate.split("-").reverse().join("-"),
                'End date': endDate.split("-").reverse().join("-")
            };
            if (currentTask.id){
                updateTasks(body,task.id);
            }else{
                addTask(body);
            }
    
           
            
            onClose();
        }
       
    }

    let errorMessage= showError && <div>End date must be after start date</div>
    return (
        <div className="grid absolute items-center top-0 left-0" style={{"width": "100vw", "height": "100vh"}}>
            <div className="fixed inset-0 bg-gray-300 opacity-80 " onClick={onClose}></div>
            <div className="fixed border-lime-800 border-4 bg-emerald-100 rounded-lg grid justify-center justify-self-center items-center size-auto opacity-80">
                <div className="grid grid-cols-1 justify-center p-1">
                    <form onSubmit={handleSubmit} >
                        <div className="grid grid-cols-2 p-3">
                            <label >Title </label>
                            <input className="border-3 border-lime-800" required value = {title} placeholder="Enter title" onChange={(event) => setTitle(event.target.value)}/>
                        </div>
                        <div className="grid grid-cols-2 p-3">
                            <label>Start Date </label>
                            <input type="date" className="border-3 border-lime-800" required value = {startDate}  onChange={(event) =>setStartDate(event.target.value)}/>
                        </div>
                        <div className="grid grid-cols-2 p-3">
                            <label>End Date </label>
                            <input type="date" className="border-3 border-lime-800" required value = {endDate} onChange={(event) => setEndDate(event.target.value)} />
                        </div>
                        <div className="grid grid-cols-1 text-center text-red-500 p-3">{errorMessage}</div>
                        <div className="grid grid-cols-1 justify-center p-3">
                           <button className="border-4 text-white bg-lime-800 rounded p-2 "> Save </button> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTask;
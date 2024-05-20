import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard"
import EditTask from "../components/EditTask";
import { MdAdd } from "react-icons/md";
import CalendarCard from "../components/CalendarCard";
import DueTaskCard from "../components/DueTasks";
import Loader from "../components/Loader";
import useCustomHook from "../hooks/useCustomHook";
import secureLocalStorage from "react-secure-storage";
import TopBar from "../components/TopBar";

function TaskPage(){
    const {navigate} =useCustomHook();
    useEffect(()=>{
        if(!secureLocalStorage.getItem("id")){
            navigate('/lineup');
        }
    },[]);

    const [showAddTask, setShowAddTask] = useState(false);
    return(
        <div>
            <div className="grid gap-6 pt-3 px-5 grid-cols-1 justify-items-end"><TopBar /></div>
            <div className="grid lg:grid-cols-3 gap-6 p-5 grid-cols-1">
                <TaskCard />
                <CalendarCard />
                <DueTaskCard />
            </div>
            <div className="grid gap-6 p-5 pb-10 grid-cols-1 justify-items-end">
                <button className="absolute bottom-2 size-min rounded-full p-4 border-4  text-white bg-lime-600  cursor-pointer  text-xl" onClick = {() => setShowAddTask(true)}><MdAdd /></button>
            </div>
            {showAddTask && <EditTask onClose = {() => setShowAddTask(false)}/>}
            <Loader />

        </div>
    )
}

export default TaskPage;
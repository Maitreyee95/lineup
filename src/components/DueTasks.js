import Checkbox from "./Checkbox";
import useCustomHook from "../hooks/useCustomHook";
import { useEffect } from "react";

function DueTaskCard(){

    const {fetchPastTasks, pastTasks} = useCustomHook();
    useEffect(()=>{
        fetchPastTasks();
    },[]);
    
    const renderedElements = pastTasks.map((task)=>{
        return <Checkbox key= {task.id} endDate={new Date(task['End date'])}>{task}</Checkbox>
    })
    return (
    <div className="border-4 border-lime-800   rounded-lg ">
        <div className="p-4 font-extrabold  bg-gradient-to-r from-lime-600 to-green-900 text-white  text-lg lg:text-2xl rounded-t">Your due tasks: </div>
        <ul className="list-none">
         {renderedElements}
        </ul>
    </div>
)
};

export default DueTaskCard;
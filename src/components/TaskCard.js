import Checkbox from "./Checkbox";
import useCustomHook from "../hooks/useCustomHook";
import { useEffect } from "react";

function TaskCard(){

    const {fetchTasks, tasks, currentFullDate,count} = useCustomHook();
    useEffect(()=>{
        fetchTasks();
    },[currentFullDate,count]);
    
    const renderedElements = tasks.map((task)=>{
        return <Checkbox key= {task.id}>{task}</Checkbox>
    })
    return (
    <div className="border-4 bg-blend-darken border-lime-800   rounded-lg">
        <div  className="p-4  border-lime-800 font-extrabold bg-gradient-to-r from-lime-600 to-green-900 text-white text-lg lg:text-2xl rounded-t">Tasks for {currentFullDate.toDateString()} </div>
        <ul className="list-none">
         {renderedElements}
        </ul>
    </div>
)
};

export default TaskCard;
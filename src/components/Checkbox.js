import { MdEdit, MdInfoOutline } from "react-icons/md";
import classNames from "classnames";
import { useState } from "react";
import useCustomHook from "../hooks/useCustomHook";
import EditTask from "./EditTask";
import { TiDelete } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";

function Checkbox({children, endDate}) {

    const { updateTasksStatus, deleteTask } = useCustomHook();
    const [taskStatus, setTaskStatus] = useState(children.Status === "Completed"? true: false);
    const [showEdit, setShowEdit] = useState(false);
 
    let classes = classNames(taskStatus && 'line-through decoration-1','col-start-1, col-span-3 p-1 truncate text-sm lg:text-xl');
    let checkboxClass = classNames(taskStatus?"text-green-700":"text-red-200","inline pr-2");

    const handleClick = () =>{
        classes = classNames( taskStatus && 'line-through decoration-1','col-start-1, col-span-3 p-1 truncate  text-sm lg:text-2xl');
        checkboxClass = classNames(taskStatus?"text-green-700":"text-red-200","inline pr-2");
        setTaskStatus((currentTaskStatus) => {
                updateTasksStatus(!currentTaskStatus? "Completed": "Not started",children.id);
                return !currentTaskStatus;
            }
        );
    }

    const showEditTask = () =>{
        setShowEdit(true);
    };

    const handleEditClose = () =>{
        setShowEdit(false);
    };

    const handleDelete = () => {
        deleteTask(children.id);
    };

    let content = `Due, ${children['End date']}`;


    return(
        <div>
          <li className="box-content p-2 border-4 grid lg:grid-cols-5 grid-cols-8 items-center justify-between rounded-lg text-white  bg-[#92b993] m-2 cursor-pointer">
            
                <div className={classes} onClick={handleClick}>{children.title}</div>
                <div className="text-right p-1 lg:col-end-6 col-end-9 col-span-4 lg:col-span-2 text-lg lg:text-2xl"> <FaCheck className={checkboxClass} onClick={handleClick}/>{endDate&&<MdInfoOutline className="inline pr-2" title={content}/>}<MdEdit className="inline pr-2" onClick={showEditTask}/><TiDelete  className=" inline" onClick={handleDelete}/></div>
       
           
          </li>
          {showEdit && <EditTask  task = {children}  onClose={handleEditClose}/>}
        </div>
    )
};

export default Checkbox;

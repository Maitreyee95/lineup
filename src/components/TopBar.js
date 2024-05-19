import secureLocalStorage from "react-secure-storage";
import useCustomHook from "../hooks/useCustomHook";

function TopBar(){

    const {navigate} = useCustomHook();
    return(
        <div>
            <span>Welcome {secureLocalStorage.getItem("name")}  </span>
            <button className="size-fit rounded-lg p-2 border-4  text-white bg-red-600  cursor-pointer" onClick = {() => {secureLocalStorage.clear();navigate("/") }}>Logout</button>
        </div>
    )
}

export default TopBar;
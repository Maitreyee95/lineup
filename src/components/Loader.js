import useCustomHook from "../hooks/useCustomHook";
import { LuLoader } from "react-icons/lu";

function Loader(){
    const { showLoader } = useCustomHook();

    const loader  = <div>
                        <div className="fixed inset-0 bg-gray-300 opacity-80 "></div>
                        <div className="fixed rounded-lg grid justify-center items-center size-auto p-3 top-1/2 left-1/2 backdrop-blur-xl">
                            <LuLoader className="text-3xl"/>
                        </div>
                    </div>

    return(
         <div>{showLoader && loader }</div>
    )
}

export default Loader;
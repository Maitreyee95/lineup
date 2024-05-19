import { useContext } from "react";
import {Context} from "../context/context";

function useCustomHook() {
    return useContext(Context);
}

export default useCustomHook;
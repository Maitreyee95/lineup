import useCustomHook from "../hooks/useCustomHook";

function Route({ path,children}){
    const {currentPath} =useCustomHook();
    console.log("Current path", currentPath)
    if(path === currentPath){
        return children;
    }

    return null;
}

export default Route;
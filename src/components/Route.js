import useCustomHook from "../hooks/useCustomHook";

function Route({ path,children}){
    const {currentPath} =useCustomHook();
\    if(path === currentPath){
        return children;
    }

    return null;
}

export default Route;
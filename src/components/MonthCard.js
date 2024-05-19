import useCustomHook from "../hooks/useCustomHook";

function MonthCard({onSet}){
    const { monthsArray} = useCustomHook();

    const handleClick= (month, index) =>{
        onSet(month,index)
    }

    const renderedElements = monthsArray.map((month,index) => {
return (<div key={index} className="cursor-pointer" onClick={()=>handleClick(month,index)}>{month}</div>)
    })

    return (<div className="grid grid-cols-3 gap-4 absolute  border rounded p-4 shadow bg-white">{renderedElements}</div>)
}

export default MonthCard;
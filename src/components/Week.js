import classNames from "classnames";
import useCustomHook from "../hooks/useCustomHook";

function Week({week}){
    const {date, changeDate} = useCustomHook();
    const renderedElements = week.map((currentDay) => {
        const classes = classNames(currentDay===date? ' bg-lime-600 text-white rounded-lg': '','p-3 flex items-center cursor-pointer justify-center');
        return(
        <div key={`${week}-${currentDay===0?Math.random(): currentDay}`} className={classes} onClick = {() => changeDate(currentDay)}>
           {currentDay===0?null: currentDay}
        </div>
        )
    });

    return  <div className="grid grid-cols-7 gap-4 p-4 text-black">{renderedElements}</div>
};

export default Week;
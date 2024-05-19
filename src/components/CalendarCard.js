import { useEffect, useRef, useState } from "react";
import useCustomHook from "../hooks/useCustomHook";
import Week from "./Week";
import { LiaCaretSquareRight, LiaCaretSquareLeft, LiaCaretSquareDown} from "react-icons/lia";
import MonthCard from "./MonthCard";

function CalendarCard() {
    let {monthName, year, calendar, getCalendar,  changeMonth, incrementYear, decrementYear} = useCustomHook();
    const [isOpen, setIsOpen] = useState(false);
    const divEl = useRef();

    useEffect(()=>{
        getCalendar();
        const handler = (event) => {

            if(!divEl.current) {
                return;
            }
            if(!divEl.current.contains(event.target)){
                setIsOpen(false);
            }
        }
        document.addEventListener('click',handler);

        return () => {
            document.removeEventListener('click', handler);
        }
    },[monthName])

    const renderedElements = calendar.map((week,index)=>{
        return <Week key={index} week={week} />
    });

    const onSet = (month,  index) =>{
        changeMonth(month,index);

    }


    
    return (
        <div className="border-4  border-lime-800 rounded-lg p-4 text-center">
            <div className="grid grid-cols-2 gap-8 py-4 text-lime-800 font-extrabold text-xl">
                <div ref={divEl} className="grid grid-cols-2 gap-1 cursor-pointer "  onClick={() => setIsOpen(!isOpen)}>
                    <div className="text-left text-xl pl-4">
                        {monthName}
                    </div>
                    <div className="text-left">
                        <LiaCaretSquareDown className="inline "/>
                    </div>
                </div>         
                <div className="grid grid-cols-3 cursor-pointer justify-end">
                    <div className="">
                            <LiaCaretSquareLeft className="inline" onClick={decrementYear}/> 
                    </div>
                    <div className=" ">{year}</div>
                    <div className="">
                            <LiaCaretSquareRight className="inline " onClick={incrementYear}/>
                    </div>
                </div>
            </div>
            {isOpen && <MonthCard onSet={onSet} />} 
               
            <div className="grid grid-cols-7 border-lime-800 bg-gradient-to-r from-lime-600 to-green-900 p-4 rounded-lg text-white font-extrabold">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
            {renderedElements}
        </div>
    )
};

export default CalendarCard;
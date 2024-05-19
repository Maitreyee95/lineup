import Link from "./Link";

function Sidebar(){
    const links = [
        {label:'Tasks',path:'/'},
        {label:'Categories',path:'/accordion'},
        {label:'Profile',path:'/buttons'}
    ];

    const renderedLinks= links.map((link) => {
        return <Link className = "mb-3" key={link.label} to ={link.path} activeClassName='font-bold border-l-4 border-blue-500 pl-2'>{link.label}</Link>
    })
    return(
        <div className="sticky top-0 overflow-y-scroll flex flex-col items-start">
            {renderedLinks}
        </div>
    )
}

export default Sidebar;
import React,{useState,useRef,useEffect} from "react";
import { BsChevronCompactDown } from "react-icons/bs";

export default function Profile() {
    const [isshownMenu, setisshownMenu] = useState(false)
    const profileMenucontainer = useRef<HTMLSelectElement>(null)
    const timerref = useRef(0);
function onMouseenterProfile(){
    if(timerref.current){
        clearTimeout(timerref.current)
    }
    setisshownMenu(true)
}
function onMouseexitProfile(){
    timerref.current  = setTimeout(() => {
        
        setisshownMenu(false)
    }, 300);
}
    useEffect(() => {
    if(!isshownMenu){
      profileMenucontainer.current?.addEventListener("mouseenter",onMouseenterProfile);
      profileMenucontainer.current?.addEventListener("mouseleave",onMouseexitProfile);
    }
    (()=>profileMenucontainer.current?.removeEventListener("mouseenter",onMouseenterProfile));
    (()=>profileMenucontainer.current?.removeEventListener("mouseleave",onMouseexitProfile));

    }, [])
    

  return (
    <section ref={profileMenucontainer} className="relative">
      <section className="flex items-center ">
        <p className="text-sm w-[100px]">User Image</p>
        <BsChevronCompactDown className={`h-6 w-5 transition-transform ${isshownMenu ? "rotate-180 duration-300":""} `} />
      </section>

     {isshownMenu? <ul className="absolute top-[40px] text-sm flex flex-col justify-center gap-4 bg-black py-2 px-4 w-[200px] -left-[100px] ">
        <li>User Name</li>
        <li>Manage Profiles</li>
        <li>Transfer Profiles</li>
        <li>Help Center</li>
        <li className="border-t-2 border-white -mx-4 p-1">
          Sign Out of Notification
        </li>
      </ul> : null}
    </section>
  );
}

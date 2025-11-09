import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { BiSolidArrowFromTop, BiSolidArrowToTop } from "react-icons/bi";

type Props = {
    paramsPatient : any
    setParamsPatient : React.Dispatch<React.SetStateAction<{
        limit: number;
        page: number;
        sortBy: string;
        order: string;
        search: string;
    }>>
    data : any;
}

export default function Filter( {  paramsPatient, setParamsPatient, data} : Props ) {
    const [ValueSearch,setValueSearch]  = useState("")
    const toggleOrder = () => {
        const newOrder = paramsPatient.order === "asc" ? "desc" : "asc";
        setParamsPatient((prev)=> ({...prev ,order : newOrder  })  )
    }

    const handleSearch = () => {
        setParamsPatient((prev) => ({ ...prev, page: 1, search: ValueSearch })); // Corrected
    };

    return (
        <div className='w-full '>
            <div className="w-full flex flex-col lg:flex-row  justify-between items-center bg-white p-4 rounded-3xl">
                <div className="group flex">
                    <input  
                            onChange={(e) => setValueSearch(e.target.value)} 
                            placeholder="Recherche" 
                            type="text" 
                            className="focus:border-gray-200 text-sm rounded-l-xl border-y-2 border-l-2 h-12 outline-none border-white pl-2" 
                        />
                    <span 
                            onClick={handleSearch}  
                            className="rounded-r-lg p-2 border-2 border-white group-focus-within:border-gray-200 cursor-pointer"
                        >
                        <HiSearch className="inline-block text-[var(--font)]" size={25}/>
                    </span>
                </div>

                <div className=" flex gap-4 text-sm items-center">
                    <label htmlFor="">Trier Par :</label>
                    <select className=' text-gray-500' 
                        onChange={(e) =>   setParamsPatient(  (prec) => ({...prec,  sortBy : e.target.value })   )}>
                            {
                                data.map((items : any) => {
                                    return(
                                        <option key={items} className="capitalize" value={items}>  {items.toUpperCase()} </option>
                                    )
                                } )
                            }
                    </select>
                    <button
                            className=' text-slate-500 pt-1  '
                            onClick={toggleOrder}
                    >
                        {paramsPatient.order === "desc" ? <BiSolidArrowToTop size={22}/> : <BiSolidArrowFromTop size={22}/>}
                    </button>
                </div>
            </div>
        </div>
  )
}
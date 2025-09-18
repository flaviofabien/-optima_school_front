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
    data : any
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
        <div className='mb-8 sm:justify-center sm:flex w-full '>
            <div className="flex w-full justify-between">
                <div className=' lg:mt-6 group'>
                    <div className="flex flex-row">
                        <div className="flex flex-row text-black">
                            <span className="border-black border-2 rounded-l-lg px-2  group-focus-within:text-[var(--color-primary)] group-focus-within:border-[var(--color-primary)]  flex flex-row items-center">
                                <HiSearch className="inline-block " size={30}/>
                            </span>
                            <input  onChange={(e) => setValueSearch(e.target.value)} placeholder='Recherche' type="text" className='border-y-2 border-r-2 h-9 outline-none  focus:border-[var(--color-primary)] pl-2 ' />
                        </div>
                        <button onClick={handleSearch } className="text-white inline-block bg-[var(--color-primary)] rounded-r-lg px-4 hover:bg-[var(--color-primary-transparent)]">Recherche</button>
                    </div>       
                </div>
                <div className=' flex flex-row justify-between gap-4 items-end'>
                    <div className="w-full">
                        <label htmlFor="">Trier Par :</label>
                        <select className='w-full bg-[var(--color-primary)] h-9 pl-2 text-white' 
                            onChange={(e) =>   setParamsPatient(  (prec) => ({...prec,  sortBy : e.target.value })   )}>
                                {
                                    data.map((items : any) => {
                                        return(
                                            <option key={items} className="capitalize" value={items}>  {items.toUpperCase()} </option>
                                        )
                                    } )
                                }
                        </select>
                    </div>
                    
                    <button
                        className='bg-[var(--color-primary)] text-white pt-1  '
                        onClick={toggleOrder}
                    >
                        {paramsPatient.order === "desc" ? <BiSolidArrowToTop size={32}/> : <BiSolidArrowFromTop size={32}/>}
                    </button>
                </div>
            </div>
        </div>
  )
}
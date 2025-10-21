import { FaUser } from 'react-icons/fa'

type Props = {
    data : any
}

export default function ElevesDashBoard({data}: Props) {
  return (
    <div className="w-full flex justify-between gap-20 mt-4">
    <div className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 px-1 py-4 rounded-2xl flex flex-row">
        <span className="text-3xl font-bold text-white m-2"><FaUser style={{ display: "inline-block", fontSize: 40, color: "white" }} />  </span>
        <div className="flex flex-col p-2">
            <span className="text-xl font-bold text-white "> {data.nbAbsence} </span>
            <span className="text-white "> Nombres d'absence</span>
        </div>
    </div>       
    <div className="w-full bg-gradient-to-r from-green-500 to-emerald-500 px-1 py-4 rounded-2xl flex flex-row">
        <span className="text-3xl font-bold text-white m-2"><FaUser style={{ display: "inline-block", fontSize: 40, color: "white" }} />  </span>
        <div className="flex flex-col p-2">
            <span className="text-xl font-bold text-white "> {data.nbMax} </span>
            <span className="text-white "> Maximum de note</span>
        </div>
    </div>  
    <div className="w-full bg-gradient-to-r from-orange-500 to-red-500 px-1 py-4 rounded-2xl flex flex-row">
        <span className="text-3xl font-bold text-white m-2"><FaUser style={{ display: "inline-block", fontSize: 40, color: "white" }} />  </span>
        <div className="flex flex-col p-2">
            <span className="text-xl font-bold text-white "> {data.nbMin} </span>
            <span className="text-white "> Minimum de Note</span>
        </div>
    </div>       
</div>
  )
}
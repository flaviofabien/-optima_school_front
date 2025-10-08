import { FaUser } from "react-icons/fa";
import Header from "../../Components/header/Header";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { getAllStates } from "../../api/State";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Loading from "../../Components/ui/Loader/Loading";


export default function Dashboard() {
const token = useSelector((state: RootState) => state.dataStorage.token);

  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["state", token],
    queryFn: () => getAllStates(token!),
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-4 flex justify-between px-8 lg:pl-64 items-center">
            <div className="w-full ">
                <TextHeaderTable text="Les Statistique" />
                <div className="w-full flex justify-between gap-20 mt-4">
                    <div className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 px-1 py-4 rounded-2xl flex flex-row">
                        <span className="text-3xl font-bold text-white m-2"><FaUser style={{ display: "inline-block", fontSize: 40, color: "white" }} />  </span>
                        <div className="flex flex-col p-2">
                            <span className="text-xl font-bold text-white "> {data.nbStudent} </span>
                            <span className="text-white "> Nombres de Etudiant</span>
                        </div>
                    </div>       
                    <div className="w-full bg-gradient-to-r from-orange-500 to-red-500 px-1 py-4 rounded-2xl flex flex-row">
                        <span className="text-3xl font-bold text-white m-2"><FaUser style={{ display: "inline-block", fontSize: 40, color: "white" }} />  </span>
                        <div className="flex flex-col p-2">
                            <span className="text-xl font-bold text-white "> {data.nbTeach} </span>
                            <span className="text-white "> Nombres de Enseignant</span>
                        </div>
                    </div>       
                </div>
            </div>
            
        </div>
   
    </div>
  )
}
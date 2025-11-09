import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { getAllStates } from "../../api/State";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Loading from "../../Components/ui/Loader/Loading";
import {  FaSchool} from "react-icons/fa";
import CardState from "../../Components/ui/Card/CardState";
import { PiStudent } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { BiUser } from "react-icons/bi";


export default function Dashboard() {
  const token = useSelector((state: RootState) => state.dataStorage.token);
  const user = useSelector((state: RootState) => state.dataStorage.user);
  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["state", token],
    queryFn: () => getAllStates(token!),
  });

  console.log(data);
  

  if (isLoading) return <Loading />;
  if (isError) return <div>Error</div>;

  return (
    <>
      <div className="">
        <TextHeaderTable text="Les Statistiques" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 ">
        
        {
          user.role === "admin" && 
             <>
              <CardState title={"Nombre d'eleve"} value={data?.nbStudent} icon={<PiStudent />} bg="blue" />
              <CardState title={"Nombre d'enseignant"} value={data?.nbTeach} icon={<GiTeacher />} bg="green" />
             </> 
          
        }
        {
          user.role === "superAdmin" && 
             <>
              <CardState title={"Nombre d'ecole "} value={data?.nbEcole} icon={<FaSchool />} bg="red" />
              <CardState title={"Nombre d'utilisateurs admin"} value={data?.nbUser} icon={<BiUser />} bg="yellow" />
             </> 
          
        }
        {/* {
          user.role === "admin" && 
             <>
              <CardState title={"Nombre d'eleve"} value={data?.nbStudent} icon={<FaDollarSign />} bg="blue" />
              <CardState title={"Nombre d'enseignant"} value={data?.nbTeach} icon={<FaDollarSign />} bg="blue" />
             </> 
          
        } */}
        {/* <CardState title="vue " value="90,380" icon={<FaEye />} bg="green" />
        <CardState title="Stat" value="-" icon={<FaShoppingCart />} bg="yellow" />
        <CardState title="Profit" value="Ar 23,214" icon={<FaChartLine />} bg="red" />
      <GraphiqueCard />
      <CardPayement /> */}
      </div>
    </>
  )
}
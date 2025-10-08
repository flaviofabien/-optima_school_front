import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Header from "../../Components/header/Header";
import Loading from "../../Components/ui/Loader/Loading";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import { getAllPartitionSalle } from "../../api/PartitionSalle";

export default function PartitionSalle() {
    const token = useSelector((state: RootState) => state.dataStorage.token);

    const { 
      data: PartitionSalleData, 
      isLoading: PartitionSalleIsLoading, 
      isError: PartitionSalleIsError 
    } = useQuery<any>({
      queryKey: ["PartitionSalle", token],
      queryFn: () => getAllPartitionSalle(token!),
  });
  
//   const {data,isLoading,isError} = useQuery<any>({
//     queryKey : ["salle-include-PartitionSalle" , token] ,
//     queryFn : () =>  getAllSallesPartitionSalles(token!)
//   })

  console.log(PartitionSalleData)

  if (PartitionSalleIsLoading  ) return <Loading />;
  if (PartitionSalleIsError ) return <div>Erreur lors du chargement des données.</div>;

  return (
      <div className="bg-[var(--font)] h-screen">
            <Header />
            <div className="mt-4 lg:pl-64">
                <div className="mt-8 flex justify-between items-center">
                    <TextHeaderTable text="Partition des étudiants pour leur salles " />
                    <ButtonLink link="/admin/partition-salles/add" text="Ajoute +"  />
                </div>
                <div className=" w-full bg-white mt-8 rounded-2xl">
                    
                    {
                            <div className="flex gap-4 mt-4">
                                {PartitionSalleData?.data.map((roomData : any, index : any) => (
                                    <div key={index} className="mb-8 rounded-lg shadow-sm flex">
                                        <div>
                                        
                                        <div className=" flex justify-between">
                                            <table className=" bg-white border border-gray-200 rounded-md h-[500px] overflow-auto">
                                                <thead>
                                                    <tr className="bg-[var(--color-primary)] text-[var(--white)]">
                                                        <th className="py-3 px-6 text-left">Nom Eleves</th>
                                                        <th className="py-3 px-6 text-left">Matricule</th>
                                                        <th className="py-3 px-6 text-left">Classe</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-gray-600 text-sm font-light ">
                                                    
                                                        <tr key={roomData.id} className="border-b border-gray-200 hover:bg-gray-100">
                                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                            Salle {roomData.Salle.nom}
                                                                                                        </td>
                                                            
                                                        </tr>
                                                            {
                                                                roomData?.students.map( (u : any ) => 

                                                        <tr  className="border-b border-gray-200 hover:bg-gray-100">                                          
                                                            <td className="py-3 px-6 text-left">{u.nom} {u.prenom} </td>
                                                            <td className="py-3 px-6 text-left">EL{u.id}2025 </td>
                                                            {/* <td className="py-3 px-6 text-left">{u.Classe.nom} </td> */}
                                                        </tr>
                                                                
                                                        )
                                                            }  
                                                </tbody>
                                            </table>
                                        </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                    }
                   
                </div>
            </div>
        </div>
  )
}
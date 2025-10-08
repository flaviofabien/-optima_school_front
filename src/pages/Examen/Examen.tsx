import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Header from "../../Components/header/Header";
import Loading from "../../Components/ui/Loader/Loading";
import { getAllExamens } from "../../api/Examen";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import { getAllSallesExamens } from "../../api/Salles";
import { useEffect, useState } from "react";
import DraggableUserListGet from "../../DragGet";

export default function Examen() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const [dataInclude,setrDataInclude] = useState({
        ecole : {
            status : false , id : 0
        },
        classe : {
            status : false , id : 0
        },
        niveau : {
            status : false , id : 0
        },
        salle : {
            status : false , id : 0
        },
    })

    const { 
      data: examenData, 
      isLoading: examenIsLoading, 
      isError: examenIsError 
    } = useQuery<any>({
      queryKey: ["examen", token],
      queryFn: () => getAllExamens(token!),
  });

  const [studentsByExamId, setStudentsByExamId] = useState<Record<number, any[]>>({});

  const {data,isLoading,isError} = useQuery<any>({
    queryKey : ["salle-include-examen" , token] ,
    queryFn : () =>  getAllSallesExamens(token!)
  })

  const HandleButton = (id : number ,event : any) => {
    if (event === "ecole") {
        setrDataInclude( (prev : any) => ( {...prev , ecole :  {
            id:id,
            status:true
        }}))
    }else if (event === "niveau") {
        setrDataInclude( (prev : any) => ( {...prev , niveau :  {
            id:id,
            status:true
        }}))
    }else if (event === "classe") {
        setrDataInclude( (prev : any) => ( {...prev , classe :  {
            id:id,
            status:true
        }}))
    }else if (event === "salle") {
        setrDataInclude( (prev : any) => ( {...prev , salle :  {
            id:id,
            status:true
        }}))
    }
  }

  useEffect(() => {
    if (examenData?.data) {
      const initData: Record<number, any[]> = {};
  
      examenData.data.forEach((exam: any) => {
        initData[exam.id] = exam.students;
      });
  
      setStudentsByExamId(initData);
    }
  }, [examenData?.data]);
  

  if (examenIsLoading || isLoading ) return <Loading />;
  if (examenIsError || isError) return <div>Erreur lors du chargement des données.</div>;

  return (
      <div className="bg-[var(--font)] h-screen">
            <Header />
            <div className="mt-4 lg:pl-64">
                <div className="mt-8 flex justify-between items-center">
                    <TextHeaderTable text="Affectation des étudiants pour l'examen" />
                    <ButtonLink link="/admin/examens/add" text="Ajoute +"  />
                </div>
                <div className=" w-full bg-white mt-8 rounded-2xl">
                    <div className="flex w-full ">
                        <div className="p-4 w-1/4">
                            <h2>Ecole</h2>
                            <div className=" flex flex-col justify-start items-start">
                            {
                                data?.ecole.map((e : any) => {
                                    const isActive = (e.id === dataInclude.ecole.id) && (dataInclude.ecole.status) ; 
                                    return <button className= {` mt-4 px-4 py-2 rounded-md  ${ isActive ? " bg-[var(--color-primary)] text-white " : "bg-gray-200" }  `}  type="button" onClick={ () => HandleButton(e.id,"ecole")}> {e.nom} </button>
                                }  
                                 )
                            }
                            </div>
                        </div>
                        {
                            dataInclude.ecole.status && 
                                <div className="p-4 w-1/4">
                                    <h2>Niveau</h2>
                                    <div className=" flex flex-col justify-start items-start">
                                    {
                                        data?.niveau.filter( (i : any) => i.ecoles.filter((o : any)  =>  o.id == dataInclude.ecole.id ) ).map((e : any) => {
                                            const isActive = (e.id === dataInclude.niveau.id) && (dataInclude.niveau.status) ; 
                                            return <button className= {` mt-4 px-4 py-2 rounded-md  ${isActive ? " bg-[var(--color-primary)] text-white " : "bg-gray-200" }  `}  type="button" onClick={ () => HandleButton(e.id,"niveau")}> {e.nom} </button>
                                        }   )
                                    }
                                    </div>
                                </div>
                        }
                        {
                            dataInclude.niveau.status && 
                                <div className="p-4 w-1/4">
                                    <h2>Classe</h2>
                                    <div className=" flex flex-col justify-start items-start">
                                    {
                                        data?.classe.filter( (i : any) => i.idNiveau == dataInclude.niveau.id ).map((e : any) => {
                                            const isActive = (e.id === dataInclude.classe.id) && (dataInclude.classe.status) ; 
                                            return <button className= {` mt-4 px-4 py-2 rounded-md  ${isActive ? " bg-[var(--color-primary)] text-white " : "bg-gray-200" }  `}  type="button" onClick={ () => HandleButton(e.id,"classe")}> {e.nom} </button>
                                        }    )
                                    }
                                    </div>
                                </div>
                        }
                        {
                            dataInclude.classe.status && 
                                <div className="p-4 w-1/4">
                                    <h2>Salle</h2>
                                    <div className=" flex flex-col justify-start items-start">
                                    {
                                        data?.salle.filter( (i : any) => i.idClasse == dataInclude.classe.id ).map((e : any) => {
                                            const isActive = (e.id === dataInclude.salle.id) && (dataInclude.salle.status) ; 
                                            return <button className= {` mt-4 px-4 py-2 rounded-md  ${isActive ? " bg-[var(--color-primary)] text-white " : "bg-gray-200" }  `}  type="button" onClick={ () => HandleButton(e.id,"salle")}> {e.nom} </button>
                                        }    )
                                    }
                                    </div>
                                </div>
                        }
                    </div>
                    {
                        dataInclude.salle.status && 
                            <div className="flex gap-4 mt-4 p-4">
                                {examenData?.data.filter(i => i.Salle.id == dataInclude.salle.id ).map((roomData : any, index : any) => {
                                        const items = studentsByExamId[roomData.id] ||[];                                    
                                        return (
                                        <div key={roomData.id} className="mb-8 rounded-lg shadow-sm bg-slate-200 ">
                                          <h2 className="p-4 text-2xl text-left">
                                            Salle {roomData.Salle.nom} - Examen {roomData.nom} Trimestre
                                          </h2>
                                          
                                          <DraggableUserListGet 
                                            items={items}
                                            setItems={(newItems: any[]) =>
                                              setStudentsByExamId((prev) => ({
                                                ...prev,
                                                [roomData.id]: newItems,
                                              }))
                                            }
                                          />
                                        </div>
                                      );
                                    })}
                            </div>
                        }
                </div>
            </div>
        </div>
    )
}
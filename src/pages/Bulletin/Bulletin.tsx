import { useSelector } from "react-redux";
import Header from "../../Components/header/Header";
import type { RootState } from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "../../api/Course";
import { useState } from "react";
import Loading from "../../Components/ui/Loader/Loading";
import type { DataCourse } from "../../typescript/Course";
import { getAllSallesExamens } from "../../api/Salles";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { getAllNotes } from "../../api/Notes";
import { IPLocal } from "../../api/IP";


export default function Bulletin() {
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

    const { data : notes, isLoading, isError } = useQuery<DataCourse>({
        queryKey: ["notes", token],
        queryFn: () => getAllNotes(token!),
    });
    
    const {data ,isLoading : isLoadingAllData,isError: isErrorAllData} = useQuery<any>({
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


    if (isLoading || isLoadingAllData) return <Loading />;
    if (isError || isErrorAllData) return <div>Error</div>;

    return (
        <div className="bg-[var(--font)] ">
            <Header />
                <div className="overflow-auto mt-8 px-8 lg:pl-64 items-start w-full h-screen">
                <TextHeaderTable text="Bulletin des Eleves" />
                    <div className="w-full bg-white p-4 flex mt-8 rounded-xl">
                        <div className=" w-1/4">
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
                                <div className=" w-1/4">
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
                                <div className=" w-1/4">
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
                                <div className=" w-1/4">
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
                        <div  className=" mt-8">

                            {
                                dataInclude.salle.status && 
                                <div>
                                   <table className="">
                                               <div className=" flex gap-8">
                                                    { 
                                                    notes?.data.map((i : any) => {
                                                        // bulletin
                                                        return (
                                                         <div className="flex  min-w-80 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                                                                                <div className="flex justify-between relative p-4 w-full">
                                                                                    <div>
                                                                                        <div>
                                                                                            <h3 className="text-xl font-bold text-gray-900"> {i.Student?.User?.nom} {i.Student?.User?.prenom}</h3>
                                                                                        </div>
                                                            
                                                                                        <div className="space-y-2 text-sm text-gray-700">
                                                                                        <div className="flex justify-between items-center text-lg ">
                                                                                            <span> 
                                                                                            </span>
                                                                                            
                                                                                        </div>  
                                                                                            <span className="text-sm"> Salle <b>{i.Salle.nom}</b> </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div>
                                                                                        <img className="w-20 h-20 rounded-full object-cover border-2 border-[var(--color-primary)" src={IPLocal +  i.Student.User.img } alt={IPLocal +  i.Student.User.img } />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                        )
                                                    }) }
                                                    

                                               </div>
                                             </table>
                                </div>
                            }
                            
                        </div>
                    </div>
        </div>
    );
}
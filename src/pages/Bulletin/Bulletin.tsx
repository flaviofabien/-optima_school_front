import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "../../Components/ui/Loader/Loading";
import { getAllSallesExamens } from "../../api/Salles";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { getAllBulletin } from "../../api/Notes";
import { IPLocal } from "../../api/IP";
import BulletinOneUser from "./BuletinOneUser";
import MenuLinkButton from "../../Components/ui/Menu/MenuLinkButton";


export default function Bulletin() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const user = useSelector((state: RootState) => state.dataStorage.user);

    const [view,setView] = useState<any>( {status : false , data : {}} )
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

    const { data : bulletins, isLoading, isError } = useQuery<any>({
        queryKey: ["bulletins", token],
        queryFn: () => getAllBulletin(token!),
    });
    
    const {data ,isLoading : isLoadingAllData,isError: isErrorAllData} = useQuery<any>({
        queryKey : ["salle-include-examen" , token] ,
        queryFn : () =>  getAllSallesExamens(token!)
      }) 


    if (
        isLoading || 
        isLoadingAllData) return <Loading />;
    if (
        isError || 
        isErrorAllData) return <div>Error</div>;

        
    return (
        <div className=" ">
                <div className="overflow-auto  items-start w-full h-screen">
                <TextHeaderTable text="Bulletin des Eleves" />
                {user.role === "admin" && <MenuLinkButton data={data} dataInclude={dataInclude} setrDataInclude={setrDataInclude} />}
                     
                        <div  className=" mt-8">

                            {
                                 ((dataInclude.salle.status && user.role === "admin") || ( user.role === "eleve") ) && 
                               <div>
                                   <div className="flex gap-8 flex-wrap"> {/* Ajout de flex-wrap pour un meilleur affichage */}
                                               {
                                                    bulletins?.data.filter( (i : any) =>  {
                                                        if (user.role == "eleve" ) {
                                                            return i.student.idUser === user.id
                                                        }
                                                    } ).map((b: any, index: number) => {
                                                        const { student, categories, rangGeneral, rangParCategorie , moyenneGenerale } = b;
                                                        const data = { student, categories, rangGeneral, rangParCategorie, moyenneGenerale }; 

                                                        return (
                                                        <div key={index} className="bg-white rounded-xl shadow-md p-6 my-4 w-96">
                                                                <div className="flex justify-between items-center mb-6">
                                                                    <div>
                                                                    <h3 className="text-xl font-bold">{student.User.nom} {student.User.prenom}</h3>
                                                                    <p className="text-sm">Salle : {student.Salle?.nom || dataInclude.salle.id}</p>
                                                                    <p className="text-sm">Rang Général : {rangGeneral}</p>
                                                                    <p className="text-sm">Moyenne Générale : {moyenneGenerale.toFixed(2)}</p> {/* Affichage formaté */}

                                                                    <p className="cursor-pointer mt-4 rounded-xl inline-block bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2"  
                                                                    onClick={() => setView({status : true , data})}> Voir bulletin </p>
                                                                    </div>
                                                                    <img src={IPLocal + student.User.img} className="w-20 h-20 object-cover rounded-full border-2 border-[var(--color-primary)]" alt={`Photo de ${student.User.nom}`} />
                                                                </div>
                                                            
                                                        </div>
                                                        )
                                                
                                                    })
                                                }

                                    </div>
                                </div>
                            }

                            {
                                view.status &&
                                 <BulletinOneUser 
                                 title="vfgf"
                                    rangParCategorie={view.data.rangParCategorie} 
                                    setView={setView} 
                                    rang={view.data.rangGeneral}  
                                    moyenneGenerale={view.data.moyenneGenerale} // ✅ Nouvelle prop
                                    categories={view.data.categories}  
                                    student={view.data.student}  
                                 />
                            }
                            
                        </div>
                    </div>
        </div>
    );
}
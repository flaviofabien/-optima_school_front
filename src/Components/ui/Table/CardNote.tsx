import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loader/Loading";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import CardConfirmDelete from "../Card/CardConfirmDelete";
import { getAllSallesExamens } from "../../../api/Salles";
import LenuLinkButtonPlus from "../Menu/LenuLinkButtonPlus";

type Props = {
    FnQueryGet: (token: string) => Promise<any>;
      query : string
      title : string
      functionMutation :  (id: number, token: string) => Promise<any>  ;
}

export default function CardNote({ FnQueryGet , query ,title , functionMutation}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const user = useSelector((state: RootState) => state.dataStorage.user);

    const [value,setValue] = useState("");

    const [dataInclude,setrDataInclude] = useState({
        ecole : { status : false , id : 0},
        classe : { status : false , id : 0},
        niveau : { status : false , id : 0 },
        salle : { status : false , id : 0 },
        matiere : { status : false , id : 0 },
    })

     const {data ,isLoading,isError} = useQuery<any>({
        queryKey : ["salle-include-examen" , token] ,
        queryFn : () =>  getAllSallesExamens(token!)
      })

    const { data : notes, isLoading : isLoadingNotes, isError : isErrorNotes } = useQuery<any[]>({
      queryKey: [query, token],
      queryFn: () => FnQueryGet(token!),
    });
  
    const [show, setShow] = useState({
      show: false,
      id: NaN
    });

    console.log(typeof(value),"testa".split("")  );
    console.log(value );

    console.log( "testa".split("").includes(value) );

    const navigate = useNavigate();
  
    if (isLoading  || isLoadingNotes) return <Loading />;
    if (isError || isErrorNotes) return <div>Error</div>;
  return (
    <div className=' w-full lg:pl-64 pt-8 pr-8  '>
        {
             (user.role == "admin" || user.role == "Enseignant") && <div>
                <LenuLinkButtonPlus data={data} dataInclude={dataInclude} setrDataInclude={setrDataInclude} />        
                <input onChange={(e) => setValue( (e.target.value).toLowerCase() )} value={value} type="text" placeholder="Recherche etudiant" 
                className="pl-2 mt-8 h-12 w-full border-b-4 border-[var(--color-primary)] outline-none focus:border-[var(--color-primary-hover)]"  />    
                <div className='flex flex-wrap gap-8 mt-8'> 
                {
                    notes?.data.filter(( o  ) =>  (o.idMatiere == dataInclude.matiere.id) && ((((o?.Student?.User?.nom).toLowerCase())).includes(value) )   ).map( i => (
                        <div className="flex  min-w-80 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                            <div className="relative p-4 w-full">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900"> {i.Student?.User?.nom} {i.Student?.User?.prenom}</h3>
                                </div>

                                <div className="space-y-2 text-sm text-gray-700">
                                <div className="flex justify-between items-center text-lg ">
                                    <span>{i.Matiere.nom}</span>
                                    <span className={` text-xl `}>  
                                        <span className={`${i.Matiere.coefficiant * 10 > i.note ? "text-red-500" : "text-blue-500"} `}> {i.note} </span> 
                                        <span> / {i.Matiere.coefficiant * 20} </span> 
                                    </span>
                                </div>  
                                <span className="text-sm"> Salle <b>{i.Salle.nom}</b> </span>
                                <span className="text-sm ml-4"> Coefficient <b>{i.Matiere.coefficiant}</b> </span>

                                <div className="">
                                    <BiEdit onClick={() => navigate(`/admin/${query}/edit/${i.id}`)} className="inline-block mr-4 text-2xl" />
                                    <MdDelete onClick={() => setShow({ id: i.id, show: true })} className="inline-block text-2xl" />
                                </div>
                                
                                
                                </div>
                            </div>
                        </div>
                
                    ) )
                }
                </div>
            </div>
        }
        {
            // Elleve 
        }
            <div className='flex flex-wrap gap-8 '> 
                {
                    notes?.data.filter(( o  ) =>  o.Student.User.id == user.id  ).map( i => (
                        <div className="flex  min-w-80 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                            <div className="relative p-4 w-full">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900"> {i.Student?.User?.nom} {i.Student?.User?.prenom}</h3>
                                </div>

                                <div className="space-y-2 text-sm text-gray-700">
                                <div className="flex justify-between items-center text-lg ">
                                    <span>{i.Matiere.nom}</span>
                                    <span className={` text-xl `}>  
                                        <span className={`${i.Matiere.coefficiant * 10 > i.note ? "text-red-500" : "text-blue-500"} `}> {i.note} </span> 
                                        <span> / {i.Matiere.coefficiant * 20} </span> 
                                    </span>
                                </div>  
                                <span className="text-sm"> Salle <b>{i.Salle.nom}</b> </span>
                                <span className="text-sm ml-4"> Coefficient <b>{i.Matiere.coefficiant}</b> </span>     
                                </div>
                            </div>
                        </div>
                
                    ) )
                }
                </div>


            {show.show && (
                <CardConfirmDelete
                navigate={`/admin/${query}`}
                functionMutation={functionMutation}
                show={show}
                setShow={setShow}
                title={title}
                />
            )}

    </div>  
    )
}
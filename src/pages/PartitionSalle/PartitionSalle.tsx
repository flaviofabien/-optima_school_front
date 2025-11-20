import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Loading from "../../Components/ui/Loader/Loading";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import { DeletePartitionSalle, getAllPartitionSalle, UpdatePartitionSalle } from "../../api/PartitionSalle";
import Button from "../../Components/ui/Button/Button";
import DraggableUserListGet from "../../DragGet";
import { MdDelete, MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { getAllSallesExamens } from "../../api/Salles";
import { getAllStudents } from "../../api/Student";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../../store/Users/Users";
import CardConfirmDelete from "../../Components/ui/Card/CardConfirmDelete";
import MenuLinkButton from "../../Components/ui/Menu/MenuLinkButton";

export default function PartitionSalle() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const dispatch = useDispatch(); 

    const [valueInput, setValueInput] = useState<string>("");
    const [edit, setEdit] = useState(false);
    const [load,setLoad] = useState(false);
  const [show, setShow] = useState<any>({
    show: false,
    id: NaN
  });  

  
    const {data,isLoading,isError} = useQuery<any>({
      queryKey : ["salle-include-examen" , token] ,
      queryFn : () =>  getAllSallesExamens(token!)
    }) 

   const {data : student,isLoading : isLoadingStudent,isError : isErrorStudent} = useQuery<any>({
        queryKey : ["students",token] ,
        queryFn : () =>  getAllStudents(token!,1,100000,"","desc","")
    })

    const { 
      data: PartitionSalleData, 
      isLoading: PartitionSalleIsLoading, 
      isError: PartitionSalleIsError 
    } = useQuery<any>({
      queryKey: ["PartitionSalle", token],
      queryFn: () => getAllPartitionSalle(token!),
  });
  
 
    const [dataInclude,setrDataInclude] = useState({
        ecole : { status : false , id : 0},
        classe : { status : false , id : 0},
        niveau : { status : false , id : 0 },
        salle : { status : false , id : 0 },
    })
    const [displayedUsers, setDisplayedUsers] = useState([]);

  const [studentsByTitleExamId, setStudentsByTitleExamId] = useState("");
  const [studentsByExamId, setStudentsByExamId] = useState<any>([]);
  const [idExamen, setIdExamen] = useState();
    const queryClient = useQueryClient();

   const Salle = data?.salle.find((p : any) => p.id == dataInclude.salle.id )

  useEffect(  () => {
    
    if (student?.data ) {
        setDisplayedUsers(student?.data)
    }       
    if (dataInclude.salle.status ) {
        const ExamenSalle = PartitionSalleData?.data.find((i : any) => i.Salle.id == dataInclude.salle.id );
        setIdExamen(ExamenSalle?.id)
        if(ExamenSalle) {
            setStudentsByTitleExamId(`Salle ${ExamenSalle.Salle.nom}`) 
            setStudentsByExamId(ExamenSalle?.students);
        } else {
            setStudentsByExamId([]) 
            setStudentsByTitleExamId('')
        }
      }
  } ,[PartitionSalleData,dataInclude.salle,student?.data]) 


    const navigate = useNavigate();


     const mutation = useMutation(
          {
          mutationFn: (newUser : any) => UpdatePartitionSalle(token, newUser ,idExamen),
          onSuccess: () => {
              dispatch(setAlert({status : true,message : `Examen a ete modifier avec succes`}))
              queryClient.invalidateQueries({ queryKey: ['examens'] });
              navigate("/admin");
              setLoad(false)
          },
          onError: (error : any ) => {
            console.log(error);
            setLoad(false)
          }
      });

  const handleEdit = () => {
    setLoad(true)
    mutation.mutate({
        idEleves : displayedUsers.map((i:any) => i.id)
    })
  }

  if (PartitionSalleIsLoading || isLoading || isLoadingStudent ) return <Loading />;
  if (PartitionSalleIsError || isError || isErrorStudent ) return <div>Erreur lors du chargement des données.</div>;

  return (
      <div className="">
            <div className="">
                <div className="flex justify-between items-center">
                    <TextHeaderTable text="Partition des étudiants pour leur salles " />
                    <ButtonLink link="/admin/partition-salles/add" text="Ajoute +"  />
                </div>
                 <div className=" w-full bg-white mt-8 rounded-2xl">
                 
                            <MenuLinkButton data={data} dataInclude={dataInclude} setrDataInclude={setrDataInclude} />
                        
                                  {
                                      edit && <div className="p-4">
                                      <h2>Rechercher eleves </h2>
                                      <input onChange={(e) => setValueInput(e.target.value)} value={valueInput} type="text" className="border-2 border-[var(--color-primary)] pl-4 w-full h-12 my-4" />
                                       <div className="max-h-96 border-2 overflow-auto  bg-white w-full pr-20 absolute z-10 -translate-y-4">
                                                              {
                                                                  (valueInput && displayedUsers.length !== 0) && displayedUsers?.filter((i : any , index : any)  => 
                                                                  (
                                                                      (i.User?.nom).toLowerCase()
                                                                      ).includes(valueInput.toLowerCase()) && (i.idNiveau == dataInclude.niveau.id)  && (index  < Salle?.effectif) && !( (studentsByExamId).includes(i)) ).map( (o : any) => <p className="flex flex-col px-4 py-2 border-b-2 cursor-pointer hover:bg-slate-200" 
                                                                  onClick={() => {
                                                                          setStudentsByExamId( [...studentsByExamId , o] );
                                                                          setValueInput("");
                                                                  }}>  <span> {o.User?.nom}</span> <span className="text-xs">{o.Classe.nom} </span> </p> )  
                                                              }
                                                          </div>
                                  </div>
                                  }
                                  
                                  <div className={`  `}>
                                      
                                      {
                                     ( ( dataInclude.salle.status )  && (PartitionSalleData?.data.filter((i : any) => i.Salle.id == dataInclude.salle.id )).length > 0  ) && <div>
                                         <h2 className="text-lg text-center bg-[var(--color-primary)] text-white p-4"> {studentsByTitleExamId} </h2>
                                         <div className= {`bg-[var(--font)] relative group`}>
                                              {
                                                  edit === false && <div className= {` bg-black bg-opacity-20 z-[122334] absolute top-0 left-0  flex w-full h-full justify-end items-center`}>
                                                 { // <Button text="Modifier" style={1} type="button"   />
                                                 }
                                                 <span onClick={() => setEdit(true) }>
                                                      <MdEdit size={40} className="cursor-pointer  " />
                                                 </span>
                                                  <MdDelete onClick={() => setShow({ id: idExamen, show: true })} className="inline-block text-[50px] text-red-500" />
              
                                              </div>
                                              }
                                              
              
                                              <DraggableUserListGet 
                                              items={studentsByExamId}
                                              setItems={setStudentsByExamId}   
                                              />
                                         </div>
                                      </div>
                                      }
                                  </div>
              
                                      <div className="flex justify-center">
                                          {
                                              edit && <Button text="Enregistement" type="button" load={load}  onClick={handleEdit }  />
                                          }
                                      </div>
                                  
              
 
                              </div>
               </div>
                        {show.show && (
                             <CardConfirmDelete
                             navigate={`/admin/patition-salles`}
                             functionMutation={DeletePartitionSalle}
                             show={show}
                             setShow={setShow}
                             title={"partition-salles"}
                             />
                         )}
        </div>
  )
}
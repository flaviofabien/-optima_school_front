import Button from "../../Components/ui/Button/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { ErrorServerForm } from "../../typescript/ErrorServer"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import { setAlert } from "../../store/Users/Users"
import Validation from "../../Components/ui/Error/Validation"
import Loading from "../../Components/ui/Loader/Loading"
import { getAllSallesExamens } from "../../api/Salles"
import SelectCustomDataFieldsSimple from "../../Components/ui/Fields/SelectCustomDataFieldsSimple"
import { ExamenSchema } from "../../Zod-Validation/Examen"
import { CreateExamens, getAllStudentExtendExamen } from "../../api/Examen"
import { shuffleArray } from "../../Utils/ArraySuffly"
import DraggableUserList from "../../Drag"

export default function AddExamen() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const {data,isLoading,isError} = useQuery<any>({
      queryKey : ["salle-include-examen" , token] ,
      queryFn : () =>  getAllSallesExamens(token!)
    })

    const {data : student,isLoading : isLoadingStudent,isError : isErrorStudent} = useQuery<any>({
        queryKey : ["students",token] ,
        queryFn : () =>  getAllStudentExtendExamen(token!)
    })
    
    const {watch , register, formState: { errors }, handleSubmit } = useForm<any>({
        resolver : zodResolver(ExamenSchema)
    });

    const watchEcole = watch("idEcole")
    const watchNiveau = watch("idNiveau")
    const watchClasse = watch("idClasse")
    const watchSalle = watch("idSalle")

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const [valueInput, setValueInput] = useState<string>("");
    const [value, setValue] = useState<any>([]);
    const queryClient = useQueryClient();
    const [displayedUsers, setDisplayedUsers] = useState<any>([]);


    // const [items, setItems] = useState(value);    

    // const handleOnDragEnd = (result : any) => {
    //     if (!result.destination) return;
    
    //     const newItems = Array.from(items);
    //     const [reorderedItem] = newItems.splice(result.source.index, 1);
    //     newItems.splice(result.destination.index, 0, reorderedItem);
    
    //     setItems(newItems);
    // };

    const mutation = useMutation(
        {
        mutationFn: (newUser : any) => CreateExamens(token,newUser),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Examen a ete ajouter avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['examens'] });
            navigate("/admin/examens");
        },
        onError: (error : ErrorServerForm ) => {
            if (error.response && error.response.data) {
            setErrorServer(error.response.data.message);
            } else {
            setErrorServer("An unexpected error occurred");
            }
            setLoad(false)
        }
    });

     useEffect(() =>  {
        if (student?.data) setDisplayedUsers(student?.data)
    } , [student?.data])
    
    const Salle = data?.salle.find((p : any) => p.id == watchSalle )
            
    const onSubmit = async (formData: any) => {
        setLoad(true)
        setErrorServer("");

        const newUser = { 
            idSalle : formData.idSalle , 
            idCategorie : formData.idCategorie  , 
            idEleves : value.map( (i:any) => i.id)
        }
        
        mutation.mutate(newUser);
     }

     const HandleClickAleatoire = () => {
        const max = Salle?.effectif ?? 0;
        const currentLength = value.length;
      
        if (currentLength < max) {
          const remaining = displayedUsers
            .filter((u: any) =>
              u.idNiveau == watchNiveau && 
              !value.some((v: any) => v.id == u.id) 
            )
            .slice(0, max - currentLength); 
          setValue([...value, ...remaining]);          
        } else {
          setValue(shuffleArray(value));
        }
      };

    if (isLoading || isLoadingStudent) return <Loading  />
    if (isError || isErrorStudent) return <div>Error</div>
    
  return (
    <div className="">
        <div className="flex justify-between  items-center">
            <div className="w-full h-[700px] flex justify-center items-center" >
                <form className="h-full w-[1500px]  bg-white relative rounded-3xl" onSubmit={handleSubmit(onSubmit)} >
                    <div className="w-full  rounded-2xl pt-8 px-4">
                        {errorServer  && <Validation errorServer={errorServer} /> }
                        <h1 className="text-2xl font-semibold ">
                            Selectionner les options suivants
                        </h1>
                        <div className=" flex gap-8">
                            <div className="flex w-1/4">
                                <SelectCustomDataFieldsSimple 
                                item={data?.ecole.map(  (u : any) => <option value={u.id} > {u.nom}    </option>)}
                                register={register("idEcole")}
                                label="Ecole"
                                error={errors.idEcole?.message}
                                />
                            </div>
                            <div className="flex">
                                {
                                    watchEcole && <SelectCustomDataFieldsSimple 
                                    item={data?.niveau.filter( (i : any) =>  i.ecoles?.map( (um : any) =>  String(um.id) ).includes(watchEcole)).map(  (u : any) => <option value={u.id} > {u.nom}    </option>)}
                                    register={register("idNiveau")}
                                    label="Niveau"
                                    error={errors.idNiveau?.message}
                                    /> 
                                } 
                            </div>
                            <div className="flex w-1/4">
                                {
                                    ( watchEcole && watchNiveau) && <SelectCustomDataFieldsSimple 
                                    item={data?.classe.filter( (i : any) => i.idNiveau == watchNiveau && i.idEcole == watchEcole ).map(  (u : any) => <option value={u.id} > {u.nom}    </option>)}
                                    register={register("idClasse")}
                                    label="Classe"
                                    error={errors.idClasse?.message}
                                    /> 
                                } 
                            </div>
                            <div className="flex w-1/4">
                                {
                                    (watchEcole && watchClasse&& watchNiveau ) &&
                                    <SelectCustomDataFieldsSimple 
                                    item={data?.salle.filter((i : any) => i.idClasse == watchClasse).map(  (u : any) => <option value={u.id} > {u.nom}    </option>)}
                                    register={register("idSalle")}
                                    label="Salle"
                                    error={errors.idSalle?.message}
                                    />  
                                }
                            </div>
                        </div>
                            {
                                 (watchEcole && watchClasse && watchSalle && watchNiveau) &&  <SelectCustomDataFieldsSimple 
                                 item={data?.categorie.map(  (u : any) => <option value={u.id} > {u.nom}    </option>)}
                                 register={register("idCategorie")}
                                 label="Type"
                                 error={errors.idCategorie?.message}
                                 />  
                            }

                            {
                                  (watchEcole && watchClasse && watchSalle && watchNiveau) && <div className="relative">
                                        <input onChange={(e) => setValueInput(e.target.value)} value={valueInput} type="text" className="border-2 border-gray-200 pl-4 w-full h-12 my-4" />
                                        
                                            <div className="max-h-96 border-2 overflow-auto  bg-white w-full pr-20 absolute z-10 -translate-y-4">
                                                {
                                                    (valueInput && displayedUsers.length !== 0) && displayedUsers?.filter((i : any , index : any)  => 
                                                    (
                                                        (i.User?.nom).toLowerCase()
                                                        ).includes(valueInput.toLowerCase()) && (i.idNiveau == watchNiveau)  && (index  < Salle?.effectif) && !( (value).includes(i)) ).map( (o  : any) => <p className="flex flex-col px-4 py-2 border-b-2 cursor-pointer hover:bg-slate-200" 
                                                    onClick={() => {
                                                            setValue( [...value , o] );
                                                            setValueInput("");
                                                    }}>  <span> {o.User?.nom}</span> <span className="text-xs">{o.Classe.nom} </span> </p> )  
                                                }
                                            </div>
                                        
                                        <h2> nombre max : { Salle?.effectif} </h2>
                                        <div className="bg-[var(--font)] p-8 " >
                                        
                                            <DraggableUserList 
                                            items={value.filter((i: any,dex : any) => i.idNiveau == watchNiveau && ( dex < Salle?.effectif ))}
                                            setItems={setValue}
                                        />
                                        </div>
                                  </div>
                            }

                                {
                                    (watchEcole && watchClasse && watchSalle && watchNiveau) && <div className="mt-8 w-full flex justify-between items-start">
                                            <div className="lg:flex gap-8 justify-between items-start mb-8">
                                                <Button text="Ajouter" type="submit" load={load}  />
                                            </div>
                                            <Button onClick={HandleClickAleatoire} text="Changer aleatoire / Complete" type="button"  />
                                    </div>
                                }
                            
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
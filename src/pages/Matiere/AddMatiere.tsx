import Header from "../../Components/header/Header"
import Fields from "../../Components/ui/Fields/Fields"
import TitleForm from "../../Components/ui/Text/TitleForm"
import Button from "../../Components/ui/Button/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { ErrorServerForm } from "../../typescript/ErrorServer"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import SelectCustomDataFields from "../../Components/ui/Fields/SelectCustomDataFields"
import { getAllClasses } from "../../api/Classes"
import { MatiereSchema, type FormDataMatiereType } from "../../Zod-Validation/Matiere"
import { CreateMatieres } from "../../api/Matieres"
import { setAlert } from "../../store/Users/Users"
import { MdNumbers, MdSubject } from "react-icons/md"
import { BsType } from "react-icons/bs"
import type { FormDataClasseType } from "../../Zod-Validation/Classe"
import Loading from "../../Components/ui/Loader/Loading"
import Validation from "../../Components/ui/Error/Validation"

export default function AddMatiere() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const {data,isLoading,isError} = useQuery<FormDataClasseType[]>({
        queryKey: ["users",token],
        queryFn: () => getAllClasses(token!),
    })
    
    const { register, formState: { errors }, handleSubmit } = useForm<FormDataMatiereType>({
        resolver : zodResolver(MatiereSchema)
      });

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataMatiereType) => CreateMatieres(token,newUser),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Matiere a ete modifier avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['matieres'] });
            navigate("/admin/matieres");
            setLoad(false)        

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

    const onSubmit = async (formData: FormDataMatiereType) => {
        setLoad(true)        
        setErrorServer("");
        mutation.mutate(formData);
    }

    if (isLoading) return <Loading />
    if (isError) return <div>Error</div>

  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
            <div className="w-full mt-8 flex justify-center items-center" >
                <form className="w-80 lg:w-[600px] bg-white flex justify-center items-center relative rounded-2xl" onSubmit={handleSubmit(onSubmit)} >
                    <TitleForm title="Ajouter Matiere" />
                    <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
                        {errorServer  && <Validation errorServer={errorServer} /> }
                        <SelectCustomDataFields 
                        icons={<MdNumbers size={24} />} 
                        data={data}
                        register={register("idClasse",{
                            valueAsNumber : true
                        })}
                        label="classe"
                        error={errors.idClasse?.message}/> 

                        <Fields 
                        icons={<MdSubject size={24} />} 
                        label="nom" 
                        register={register("nom")}
                        error={errors.nom?.message}/>
                        <Fields 
                        icons={<BsType size={24} />} 
                        label="coefficiant" 
                        type="number"
                        register={register("coefficiant",{
                            valueAsNumber : true
                        })}
                        error={errors.coefficiant?.message}/>
                        <div className="lg:flex gap-8 justify-between items-start mb-8">
                            <Button text="Ajouter" type="submit" load={load} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
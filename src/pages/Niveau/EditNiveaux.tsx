import Header from "../../Components/header/Header"
import Fields from "../../Components/ui/Fields/Fields"
import TitleForm from "../../Components/ui/Text/TitleForm"
import Button from "../../Components/ui/Button/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { ErrorServerForm } from "../../typescript/ErrorServer"
import { useNavigate, useParams } from "react-router-dom"
import {  useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import { UpdateSalles } from "../../api/Salles"
import { SalleEditSchema, type FormDataSalleEditType } from "../../Zod-Validation/Salles"
import { setAlert } from "../../store/Users/Users"
import Validation from "../../Components/ui/Error/Validation"
import Loading from "../../Components/ui/Loader/Loading"
import { UpdateNiveau, getOneNiveau } from "../../api/Niveau"
import ImgFontLogo from "../../assets/pexels-camcasey-1722183.jpg"
import { NiveauEditSchema } from "../../Zod-Validation/Niveau"

export default function EditNiveau() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const {data,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<FormDataSalleEditType>({
        queryKey: ["niveaux",token,id],
        queryFn: () => getOneNiveau(token!,id!),
    });

    
    const { register,setValue, formState: { errors }, handleSubmit } = useForm<FormDataSalleEditType>({
        resolver : zodResolver(NiveauEditSchema)
    });

    useEffect(() => {
    if (data) {
        setValue("nom", data.nom);
    }
    }, [data, setValue]);


    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataSalleEditType) => UpdateNiveau(token,newUser,id!),
        onSuccess: () => {
            setLoad(true)
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Niveau a ete modifier avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['niveaux'] });
            navigate("/admin/niveaux");
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

    const onSubmit = async (formData: FormDataSalleEditType) => {
        setLoad(true)
        setErrorServer("");
        mutation.mutate(formData);
    }

    if ( userOneIsLoading  ) return <Loading />
    if ( userOneIsError ) return <div>Error</div>
   
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-4 w-full flex justify-center px-8 lg:pl-[280px] items-center">
            <div className="w-full max-w-[1200px] rounded-3xl bg-white mt-8 flex justify-center items-center" >
                <form className=" h-full w-[500px] relative rounded-s-3xl" onSubmit={handleSubmit(onSubmit)} >
                    <div className="w-full   rounded-2xl pt-20 px-8">
                    <TitleForm title="Modification Niveau" />
                    {errorServer  && <Validation errorServer={errorServer} /> }
                        <Fields 
                        label="nom" 
                        register={register("nom")}
                        error={errors.nom?.message}/>
                        <div className="lg:flex gap-8 mt-8 justify-between items-start mb-8">
                            <Button text="Modification" type="submit" load={load}  />
                        </div>
                    </div>
                </form>
                <img src={ImgFontLogo} className="w-[1000px] h-[662px]  object-cover  rounded-e-3xl" alt="" />
            </div>
        </div>
    </div>
  )
}
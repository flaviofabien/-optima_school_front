import Header from "../../Components/header/Header"
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
import { CreateCourses, getAllIncludeCourses } from "../../api/Course"
import { CoursesSchema, type FormDataCoursesType } from "../../Zod-Validation/Course"
import SelectFields from "../../Components/ui/Fields/SelectFields"
import { setAlert } from "../../store/Users/Users"
import Loading from "../../Components/ui/Loader/Loading"
import { MdNumbers, MdRoom, MdSubject } from "react-icons/md"
import { GiTeacher } from "react-icons/gi"
import { CgViewDay } from "react-icons/cg"
import { BsHourglass } from "react-icons/bs"
import type { DataCourseInclude } from "../../typescript/Course"
import Fields from "../../Components/ui/Fields/Fields"

export default function AddCourse() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const dispatch = useDispatch(); 
    const [load,setLoad] = useState(false);

    const {data,isLoading,isError,} = useQuery<DataCourseInclude>({
        queryKey: ["include-course", token],
        queryFn: () => getAllIncludeCourses(token!),
    })      
    
    const { watch , register, formState: { errors }, handleSubmit } = useForm<FormDataCoursesType>({
        resolver : zodResolver(CoursesSchema),
      });

    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataCoursesType) => CreateCourses(token,newUser),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Cours a ete ajouter avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            navigate("/admin/courses");

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


    const watchClasse = watch("idClasse");
    const watchSalle = watch("idSalle");
    const watchMatiere = watch("idMatiere");
    const watchTeach = watch("idTeacher");

    const onSubmit = async (formData: FormDataCoursesType) => {   
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
                    <TitleForm title="Ajouter Eleve" />
                    <div className="w-full  border-4 border-[var(--color-primary-transparent)] rounded-2xl pt-20 px-8">
                    {errorServer  && <p className="bg-red-400 max-w-64 text-sm text-white text-center p-2 my-2"> {errorServer} </p> }
                            <SelectCustomDataFields 
                            icons={<MdNumbers size={24} />} 
                            data={data?.classe}
                            register={register("idClasse")}
                            label="classe"
                            error={errors.idClasse?.message}/>
                            {
                              watchClasse && <SelectCustomDataFields 
                              icons={<MdRoom size={24} />} 
                              data={data?.salle?.filter(i =>  (i.idClasse).toString() == watchClasse  )}
                              register={register("idSalle")}
                              label="salle"
                              error={errors.idSalle?.message}/> 
                            } 

                            {
                               (watchSalle && watchClasse) &&  <SelectCustomDataFields 
                              icons={<GiTeacher size={24} />} 
                              data={data?.teacher}
                              register={register("idTeacher")}
                              label="enseignant"
                              error={errors.idTeacher?.message}/> 
                            }
                            
                           {
                             (watchClasse && watchSalle) && <SelectCustomDataFields 
                            icons={<MdSubject size={24} />} 
                            data={data?.matiere?.filter(i =>  (i.idClasse).toString()  == watchClasse)}
                            register={register("idMatiere")}
                            label="matiere"
                            error={errors.idMatiere?.message}/> 
                           }

                           {
                             (watchMatiere && watchTeach && watchClasse && watchSalle) && (
                              <div>
                                <SelectFields 
                                icons={<CgViewDay size={24} />} 
                                label="jour" 
                                data={["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"]}
                                register={register("jour")}
                                error={errors.jour?.message}/>
                                <div className="lg:flex justify-between items-end">
                                    <Fields 
                                    icons={<BsHourglass size={24} />} 
                                    label="heureDebut" 
                                    type="time"
                                    register={register("heureDebut")}
                                    error={errors.heureDebut?.message}/>
                                    <Fields 
                                    type="time"
                                    icons={<BsHourglass size={24} />} 
                                    label="heureFin" 
                                    register={register("heureFin")}
                                    error={errors.heureFin?.message}/> 
                                    
                                </div>

                              </div>
                             )
                           }
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
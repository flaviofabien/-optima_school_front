import Header from "../../Components/header/Header"
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
import FieldCheckBoxCustom from "../../Components/ui/Fields/FieldsCheckBoxCustom"
import SelectCustomDataFields from "../../Components/ui/Fields/SelectCustomDataFields"
import { UpdateCourses, getAllIncludeCourses, getOneCourses } from "../../api/Course"
import { CoursesEditSchema, type FormDataCoursesEditType } from "../../Zod-Validation/Course"
import { Heure } from "../../Utils/Heure"
import SelectFields from "../../Components/ui/Fields/SelectFields"
import { setAlert } from "../../store/Users/Users"
import type { DataCourseInclude } from "../../typescript/Course"
import Loading from "../../Components/ui/Loader/Loading"
import { MdNumbers, MdRoom, MdSubject } from "react-icons/md"
import { GiTeacher } from "react-icons/gi"
import { PiStudent } from "react-icons/pi"
import { CgViewDay } from "react-icons/cg"
import { BsHourglass } from "react-icons/bs"

type Props = {}

export default function EditCourse({}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()
    const dispatch = useDispatch(); 


    const {data,isLoading,isError,} = useQuery<DataCourseInclude>({
      queryKey: ["include-course", token],
      queryFn: () => getAllIncludeCourses(token!),
  })      
  

    const {data : userOne,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<FormDataCoursesEditType>({
        queryKey: ["course",token,id],
        queryFn: () => getOneCourses(token!,id!),
    });
    
    const { watch ,  register,setValue, formState: { errors }, handleSubmit } = useForm<FormDataCoursesEditType>({
        resolver : zodResolver(CoursesEditSchema)
      });

    useEffect(() => {
    if (userOne) {
        setValue("idSalle", userOne.idSalle);
        setValue("idTeacher", userOne.idTeacher);
        setValue("idMatiere", userOne.idMatiere);
        setValue("eleveIds", userOne.eleveIds );
        setValue("jour", userOne.jour);
        setValue("heureDebut", userOne.heureDebut);
        setValue("heureFin", userOne.heureFin);
    }
    }, [userOne, setValue]);


    const navigate = useNavigate();

    const [errorServer, setErrorServer] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn: (newUser : FormDataCoursesEditType) => UpdateCourses(token,newUser,id!),
        onSuccess: () => {
            setErrorServer("");
            dispatch(setAlert({status : true,message : `Course a ete modifier avec succes`}))
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            navigate("/admin/courses");
        },
        onError: (error : ErrorServerForm ) => {
            if (error.response && error.response.data) {
            setErrorServer(error.response.data.message);
            } else {
            setErrorServer("An unexpected error occurred");
            }
        }
    });

    const watchClasse = watch("idClasse");
    const watchSalle = watch("idSalle");
    const watchMatiere = watch("idMatiere");
    const watchTeach = watch("idTeacher");


    const onSubmit = async (formData: FormDataCoursesEditType) => {        
        setErrorServer("");
        mutation.mutate(formData);
    }

    if (isLoading || userOneIsLoading) return <Loading />
    if (isError || userOneIsError) return <div>Error</div>
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
                              <FieldCheckBoxCustom
                              icons={<PiStudent size={24} />} 
                              data={data?.student}
                              register={register("eleveIds"
                              ,{
                                  valueAsNumber : true
                              }
                              )}
                              label="Eleves"
                              error={errors.eleveIds?.message}/> 
                              <SelectFields 
                              icons={<CgViewDay size={24} />} 
                              label="jour" 
                              data={["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"]}
                              register={register("jour")}
                              error={errors.jour?.message}/>
                              <div className="lg:flex justify-between items-end">
                                  <SelectCustomDataFields 
                                  icons={<BsHourglass size={24} />} 
                                  label="heureDebut" 
                                  register={register("heureDebut",{
                                    valueAsNumber : true
                                })}
                                  data={Heure}
                                  error={errors.heureDebut?.message}/>
                                  <SelectCustomDataFields 
                                  icons={<BsHourglass size={24} />} 
                                  label="heureFin" 
                                  register={register("heureFin",{
                                    valueAsNumber : true
                                })}
                                  data={Heure}
                                  error={errors.heureFin?.message}/> 
                              </div>

                            </div>
                          )
                        }
                      <div className="lg:flex gap-8 justify-between items-start mb-8">
                          <Button text="Ajouter" type="submit" />
                      </div>
                  </div>
              </form>
          </div>
      </div>
  </div>
  )
}
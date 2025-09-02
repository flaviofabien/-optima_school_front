import { HiOutlineMail } from "react-icons/hi"
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
import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import {  type FormDataStudentType, type FormDataStudentEditType, studentEditSchema } from "../../Zod-Validation/Students"
import {  UpdateStudents, getAllStudents, getOneStudents } from "../../api/Student"
import FieldCheckBoxCustom from "../../Components/ui/Fields/FieldsCheckBoxCustom"
import SelectCustomDataFields from "../../Components/ui/Fields/SelectFieldsCustom"
import { UpdateCourses, getOneCourses } from "../../api/Course"
import { CoursesEditSchema, type FormDataCoursesEditType } from "../../Zod-Validation/Course"
import { getAllSalles } from "../../api/Salles"
import { getAllTeachs } from "../../api/Teach"
import { getAllMatieres } from "../../api/Matieres"
import { Heure } from "../../Utils/Heure"
import SelectFields from "../../Components/ui/Fields/SelectFields"



type Props = {}

export default function EditCourse({}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const { id } = useParams()

    const {
        data: salles,
        isLoading: isLoadingSalles,
        isError: isErrorSalles,
      } = useQuery<userType[]>({
        queryKey: ["salles", token],
        queryFn: () => getAllSalles(token!),
      })
      
      const {
        data: teachs,
        isLoading: isLoadingTeachs,
        isError: isErrorTeachs,
      } = useQuery<userType[]>({
        queryKey: ["teachs", token],
        queryFn: () => getAllTeachs(token!),
      })
      
      const {
        data: matieres,
        isLoading: isLoadingMatieres,
        isError: isErrorMatieres,
      } = useQuery<userType[]>({
        queryKey: ["matieres", token],
        queryFn: () => getAllMatieres(token!),
      })
      
      const {
        data: students,
        isLoading: isLoadingStudents,
        isError: isErrorStudents,
      } = useQuery<userType[]>({
        queryKey: ["students", token],
        queryFn: () => getAllStudents(token!), 
      })
    

    const {data : userOne,isLoading : userOneIsLoading ,isError : userOneIsError} = useQuery<FormDataCoursesEditType>({
        queryKey: ["course",token,id],
        queryFn: () => getOneCourses(token!,id!),
    });
    
    const { register,setValue, formState: { errors }, handleSubmit } = useForm<FormDataCoursesEditType>({
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

    const onSubmit = async (formData: FormDataCoursesEditType) => {
        console.log(formData);
        
        setErrorServer("");
        mutation.mutate(formData);
    }
    if (isLoadingSalles || isLoadingTeachs || isLoadingMatieres || isLoadingStudents || userOneIsLoading) {
        return "Chargement..."
      }
      
      if (isErrorSalles || isErrorTeachs || isErrorMatieres || isErrorStudents || userOneIsError) {
            return <div>...erreur</div>
      }


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
                          icons={<HiOutlineMail size={24} />} 
                          data={salles}
                          register={register("idSalle",{
                              valueAsNumber : true
                          })}
                          label="salle"
                          error={errors.idSalle?.message}/> 
                          <SelectCustomDataFields 
                          icons={<HiOutlineMail size={24} />} 
                          data={teachs}
                          register={register("idTeacher",{
                              valueAsNumber : true
                          })}
                          label="enseignant"
                          error={errors.idTeacher?.message}/> 
                          <SelectCustomDataFields 
                          icons={<HiOutlineMail size={24} />} 
                          data={matieres}
                          register={register("idMatiere",{
                              valueAsNumber : true
                          })}
                          label="matiere"
                          error={errors.idMatiere?.message}/> 
                          <FieldCheckBoxCustom
                          icons={<HiOutlineMail size={24} />} 
                          data={students}
                          register={register("eleveIds"
                          ,{
                              valueAsNumber : true
                          }
                          )}
                          label="Eleves"
                          error={errors.eleveIds?.message}/> 
                          <SelectFields 
                          icons={<HiOutlineMail size={24} />} 
                          label="jour" 
                          data={["lundi","mardi","mercredit","jeudi","vendredi","samedi","dimanche"]}
                          register={register("jour")}
                          error={errors.jour?.message}/>
                      <div className="lg:flex justify-between items-end">
                          <SelectCustomDataFields 
                          icons={<HiOutlineMail size={24} />} 
                          label="heureDebut" 
                          register={register("heureDebut",{
                            valueAsNumber : true
                        })}
                          data={Heure}
                          error={errors.heureDebut?.message}/>
                          <SelectCustomDataFields 
                          icons={<HiOutlineMail size={24} />} 
                          label="heureFin" 
                          register={register("heureFin",{
                            valueAsNumber : true
                        })}
                          data={Heure}
                          error={errors.heureFin?.message}/> 
                      </div>
                    
                      
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
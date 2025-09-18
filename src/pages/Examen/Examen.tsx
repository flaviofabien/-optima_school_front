import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Header from "../../Components/header/Header";
import {  getAllExamen } from "../../api/Course";
import { getAllClasses } from "../../api/Classes";
import { useState } from "react";
import Loading from "../../Components/ui/Loader/Loading";

export default function Examen() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const [classId,setClasseID] = useState(1);

    const { 
      data: examenData, 
      isLoading: examenIsLoading, 
      isError: examenIsError 
  } = useQuery<any>({
      queryKey: ["examen", token, classId],
      queryFn: () => getAllExamen(token!, classId),
  });

  const  [paramsPatient ] = useState( {
    limit : 50,
    page : 1,
    sortBy : "nom",
    order : "desc",
    search : ""
  } )  


  const { 
      data: classesData, 
      isLoading: classesIsLoading, 
      isError: classesIsError 
  } = useQuery<any>({
    queryKey : ["classes",token,paramsPatient.page,paramsPatient.limit,paramsPatient.search,paramsPatient.order,paramsPatient.sortBy] ,
    queryFn : () =>  getAllClasses(token! , paramsPatient.page!,paramsPatient.limit!,paramsPatient.search!,paramsPatient.order!,paramsPatient.sortBy!)
  });

  if (examenIsLoading || classesIsLoading) return <Loading />;
  

  if (examenIsError || classesIsError) {
      return <div>Erreur lors du chargement des données.</div>;
  }
  return (
      <div className="bg-[var(--font)] h-screen">
            <Header />
            <div className="mt-8 px-8 lg:pl-60">
                <h1 className="text-2xl font-bold mb-6">Affectation des étudiants pour l'examen</h1>
                <select name="" id="" onChange={(e : any) => setClasseID(e.target.value)}>
                  {
                    classesData.map( (i : any) => <option value={i.id} > {i.nom} </option>)
                  }
                </select>
                <div className="flex">
                  {examenData?.map((roomData : any, index : any) => (
                      <div key={index} className="mb-8 p-4 rounded-lg shadow-sm flex">
                        <div>
                          <h2 className="text-xl font-semibold mb-4">Salle: {roomData.salle}</h2>
                          
                          <div className=" flex justify-between">
                              <table className=" bg-white border border-gray-200 rounded-md">
                                  <thead>
                                      <tr className="bg-[var(--color-primary)] text-[var(--white)]">
                                          <th className="py-3 px-6 text-left">Nom et Prénom</th>
                                          <th className="py-3 px-6 text-left">Matricule</th>
                                          <th className="py-3 px-6 text-left">Sexe</th>
                                      </tr>
                                  </thead>
                                  <tbody className="text-gray-600 text-sm font-light">
                                      {roomData.students.map((student : any)  => (
                                          <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-100">
                                              <td className="py-3 px-6 text-left whitespace-nowrap">
                                                  {student.prenom} {student.nom}
                                              </td>
                                              <td className="py-3 px-6 text-left">{student.matricule}</td>
                                              <td className="py-3 px-6 text-left">{student.sex}</td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
            </div>
        </div>
  )
}
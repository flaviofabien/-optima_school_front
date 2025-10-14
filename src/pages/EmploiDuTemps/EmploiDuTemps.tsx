import { useSelector } from "react-redux";
import Header from "../../Components/header/Header";
import type { RootState } from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "../../api/Course";
import { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Loading from "../../Components/ui/Loader/Loading";
import type { DataCourse } from "../../typescript/Course";
import type { EventInput } from "@fullcalendar/core/index.js";
import { getAllSallesExamens } from "../../api/Salles";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";

const getDayNumber = (day: string): number | undefined => {
    const days: Record<string, number> = {
      'lundi': 1,
      'mardi': 2,
      'mercredi': 3,
      'jeudi': 4,
      'vendredi': 5,
      'samedi': 6,
      'dimanche': 0
    };
    return days[day.toLowerCase()];
  };

export default function EmploiDuTemps() {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const [events, setEvents] = useState<EventInput[]>([]);    
    const [currentViewDate, setCurrentViewDate] = useState(new Date());

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

    const { data : dataCourse, isLoading, isError } = useQuery<DataCourse>({
        queryKey: ["course", token],
        queryFn: () => getAllCourses(token!),
    });
    
    const {data ,isLoading : isLoadingAllData,isError: isErrorAllData} = useQuery<any>({
        queryKey : ["salle-include-examen" , token] ,
        queryFn : () =>  getAllSallesExamens(token!)
      }) 

    useEffect(() => {
        if (dataCourse && currentViewDate) {
            const formattedEvents = dataCourse.map((course): EventInput | null => {
                const dayOfWeek = getDayNumber(course.jour);
                if (dayOfWeek === undefined) return null;
    
                const baseDate = new Date(currentViewDate);
                const currentDay = baseDate.getDay();
                const diff = (dayOfWeek - currentDay + 7) % 7;
    
                const eventDate = new Date(baseDate);
                eventDate.setDate(baseDate.getDate() + diff);
    
                const [startHour, startMinute] = course.heureDebut.split(':').map(Number);
                const [endHour, endMinute] = course.heureFin.split(':').map(Number);
    
                const startDateTime = new Date(eventDate);
                startDateTime.setHours(startHour, startMinute, 0, 0);
    
                const endDateTime = new Date(eventDate);
                endDateTime.setHours(endHour, endMinute, 0, 0);
    
                return {
                    title: `${course?.Matiere?.nom} - Salle ${course.Salle?.nom}`,
                    start: startDateTime.toISOString(),
                    end: endDateTime.toISOString(),
                    extendedProps: {
                        professeur: `${course?.Teacher?.prenom} ${course.Teacher?.nom}`
                    }
                };
            }).filter((event): event is EventInput => event !== null);
    
            setEvents(formattedEvents);
        }
    }, [dataCourse, currentViewDate]);

    const HandleButton = (id : number ,event : any) => {
        if (event === "ecole") {
            setrDataInclude( (prev : any) => ( {...prev , ecole :  {
                id:id,
                status:true
            }}))
        }else if (event === "niveau") {
            setrDataInclude( (prev : any) => ( {...prev , niveau :  {
                id:id,
                status:true
            }}))
        }else if (event === "classe") {
            setrDataInclude( (prev : any) => ( {...prev , classe :  {
                id:id,
                status:true
            }}))
        }else if (event === "salle") {
            setrDataInclude( (prev : any) => ( {...prev , salle :  {
                id:id,
                status:true
            }}))
        }
      }

    const handleDatesSet = (info : any) => {
        setCurrentViewDate(info.view.currentStart);
    };

    if (isLoading || isLoadingAllData) return <Loading />;
    if (isError || isErrorAllData) return <div>Error</div>;

    return (
        <div className="bg-[var(--font)] ">
            <Header />
                <div className="overflow-auto mt-8 px-8 lg:pl-64 items-start w-full h-screen">
                <TextHeaderTable text="Emploi du temps" />
                    <div className="w-full bg-white p-4 flex mt-8 rounded-xl">
                        <div className=" w-1/4">
                            <h2>Ecole</h2>
                            <div className=" flex flex-col justify-start items-start">
                            {
                                data?.ecole.map((e : any) => {
                                    const isActive = (e.id === dataInclude.ecole.id) && (dataInclude.ecole.status) ; 
                                    return <button className= {` mt-4 px-4 py-2 rounded-md  ${ isActive ? " bg-[var(--color-primary)] text-white " : "bg-gray-200" }  `}  type="button" onClick={ () => HandleButton(e.id,"ecole")}> {e.nom} </button>
                                }  
                                 )
                            }
                            </div>
                        </div>
                        {
                            dataInclude.ecole.status && 
                                <div className="p-4 w-1/4">
                                    <h2>Niveau</h2>
                                    <div className=" flex flex-col justify-start items-start">
                                    {
                                        data?.niveau.filter( (i : any) => i.ecoles.filter((o : any)  =>  o.id == dataInclude.ecole.id ) ).map((e : any) => {
                                            const isActive = (e.id === dataInclude.niveau.id) && (dataInclude.niveau.status) ; 
                                            return <button className= {` mt-4 px-4 py-2 rounded-md  ${isActive ? " bg-[var(--color-primary)] text-white " : "bg-gray-200" }  `}  type="button" onClick={ () => HandleButton(e.id,"niveau")}> {e.nom} </button>
                                        }   )
                                    }
                                    </div>
                                </div>
                        }
                        {
                            dataInclude.niveau.status && 
                                <div className="p-4 w-1/4">
                                    <h2>Classe</h2>
                                    <div className=" flex flex-col justify-start items-start">
                                    {
                                        data?.classe.filter( (i : any) => i.idNiveau == dataInclude.niveau.id ).map((e : any) => {
                                            const isActive = (e.id === dataInclude.classe.id) && (dataInclude.classe.status) ; 
                                            return <button className= {` mt-4 px-4 py-2 rounded-md  ${isActive ? " bg-[var(--color-primary)] text-white " : "bg-gray-200" }  `}  type="button" onClick={ () => HandleButton(e.id,"classe")}> {e.nom} </button>
                                        }    )
                                    }
                                    </div>
                                </div>
                        }
                        {
                            dataInclude.classe.status && 
                                <div className="p-4 w-1/4">
                                    <h2>Salle</h2>
                                    <div className=" flex flex-col justify-start items-start">
                                    {
                                        data?.salle.filter( (i : any) => i.idClasse == dataInclude.classe.id ).map((e : any) => {
                                            const isActive = (e.id === dataInclude.salle.id) && (dataInclude.salle.status) ; 
                                            return <button className= {` mt-4 px-4 py-2 rounded-md  ${isActive ? " bg-[var(--color-primary)] text-white " : "bg-gray-200" }  `}  type="button" onClick={ () => HandleButton(e.id,"salle")}> {e.nom} </button>
                                        }    )
                                    }
                                    </div>
                                </div>
                        }
                    </div>
                        <div  className="bg-white p-8 mt-8">

                            {
                                dataInclude.salle.status && 
                                <FullCalendar
                                    plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                                    locale="fr"
                                    events={events}
                                    headerToolbar={{}} 
                                    datesSet={handleDatesSet}
                                />
                            }
                            
                        </div>
                    </div>
        </div>
    );
}
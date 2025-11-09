import { useSelector } from "react-redux";
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
import MenuLinkButton from "../../Components/ui/Menu/MenuLinkButton";

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
    const user = useSelector((state: RootState) => state.dataStorage.user);

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

    console.log(dataCourse);
    
    const Student = data?.student?.find((i : any) => i.idUser ==  user.id  )
    const Teach = data?.teacher?.find((i : any) => i.idUser ==  user.id  )
    
    useEffect(() => {
        if (dataCourse && currentViewDate) {
            const formattedEvents = dataCourse.filter((i :  any ) => {
                if( Student?.idSalle && Student ) {
                    return  i.Salle.id === Student?.idSalle ;
                }else if (Teach ) {
                    return  i.idTeacher ==  Teach.id ;
                }
                else{
                    return i.Salle.id == dataInclude.salle.id; 
                }
            } 
             ).map((course : any ): any => {
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
                    title: `${course?.Matiere?.nom} - Salle ${course.Salle?.nom} - ${course.Teacher?.User?.nom}`,
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

   
    const handleDatesSet = (info : any) => {
        setCurrentViewDate(info.view.currentStart);
    };

    if (isLoading || isLoadingAllData) return <Loading />;
    if (isError || isErrorAllData) return <div>Error</div>;

    return (
        <div className="">
                <div className="overflow-auto  items-start w-full h-screen">
                <TextHeaderTable text="Emploi du temps" />
             
                        {
                           user.role === "admin" && <MenuLinkButton data={data} dataInclude={dataInclude} setrDataInclude={setrDataInclude} />
                        }
                            {
                                  ((dataInclude.salle.status && user.role === "admin" )  ||  (user.role === "eleve") || (user.role === 'Enseignant') )  &&
                                <div  className="bg-white p-8 mt-8">
                                    <FullCalendar
                                        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                                        locale="fr"
                                        events={events}
                                        headerToolbar={{}} 
                                        datesSet={handleDatesSet}
                                    />
                                </div>
                            }
                    </div>
        </div>
    );
}
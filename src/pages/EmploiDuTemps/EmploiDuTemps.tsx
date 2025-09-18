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

    
    const { data, isLoading, isError } = useQuery<DataCourse>({
        queryKey: ["course", token],
        queryFn: () => getAllCourses(token!),
    });

    useEffect(() => {
        if (data && currentViewDate) {
            const formattedEvents = data.map((course): EventInput | null => {
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
    }, [data, currentViewDate]);
    

    const handleDatesSet = (info : any) => {
        setCurrentViewDate(info.view.currentStart);
    };

    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div className="bg-[var(--font)] ">
            <Header />
                <div className="overflow-auto mt-8 flex justify-center px-8 lg:pl-60 items-start w-full h-screen">
                    <div className="w-full bg-white p-8 ">
                        <FullCalendar
                            plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                            locale="fr"
                            events={events}
                            headerToolbar={{}} 
                            datesSet={handleDatesSet}
                        />
                    </div>
                </div>
        </div>
    );
}
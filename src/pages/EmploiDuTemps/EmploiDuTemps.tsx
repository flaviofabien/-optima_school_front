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

const getDayNumber = (day) => {
    const days = {
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
    const [events, setEvents] = useState([]);
    const [currentViewDate, setCurrentViewDate] = useState(new Date());

    const { data, isLoading, isError } = useQuery({
        queryKey: ["course", token],
        queryFn: () => getAllCourses(token!),
    });

    console.log(data);

    useEffect(() => {
        if (data  && currentViewDate) {
            const formattedEvents = data?.map(course => {

                const dayOfWeek = getDayNumber(course.jour);
                const baseDate = new Date(currentViewDate);
                const currentDay = baseDate.getDay();
                const diff = dayOfWeek - currentDay;
                
                const eventDate = new Date(baseDate.setDate(baseDate.getDate() + diff));
                
                const startDateTime = new Date(eventDate);
                startDateTime.setHours(parseInt(course.heureDebut, 10), 0, 0, 0);

                const endDateTime = new Date(eventDate);
                endDateTime.setHours(parseInt(course.heureFin, 10), 0, 0, 0);

                return {
                    title: `${course.Matiere.nom} - Salle ${course.Salle.nom}`,
                    start: startDateTime.toISOString(),
                    end: endDateTime.toISOString(),
                    extendedProps: {
                        professeur: `${course.Teacher.prenom} ${course.Teacher.nom}`
                    }
                };

            });
            setEvents(formattedEvents);
        }
    }, [data, currentViewDate]);

    const handleDatesSet = (info) => {
        setCurrentViewDate(info.view.currentStart);
    };

    if (isLoading) {
        return <div>...loading</div>;
    }
    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div className="bg-[var(--font)] h-screen">
            <Header />
            <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
                <div style={{ padding: '20px', width: "50%"}}>
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
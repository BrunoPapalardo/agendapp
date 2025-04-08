"use client";
import { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import addMinutes from 'date-fns/addMinutes';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'tailwindcss/tailwind.css';

const locales = {
  'pt-BR': require('date-fns/locale/pt-BR'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Exemplo de agendamentos vindo do JSON
const appointments = [
  {
    id: 6,
    dateTime: "2025-04-09T12:44:49.363Z",
    serviceDuration: 3600, // 0 indica duração padrão de 30 minutos
    employeeId: 1,
    companyId: 1,
    userId: 1,
  },
  {
    id: 11,
    dateTime: "2025-04-10T11:43:58.401Z",
    serviceDuration: 10,
    employeeId: 1,
    companyId: 1,
    userId: 1,
  },
  {
    id: 1,
    dateTime: "2025-04-09T08:44:42.000Z",
    serviceDuration: 3600, // duração em segundos
    employeeId: 1,
    companyId: 1,
    userId: 1,
  },
];

// Converte os agendamentos para o formato esperado pelo react-big-calendar
const events = appointments.map(app => {
  const start = new Date(app.dateTime);
  // Se não tiver duração definida, assume 30 minutos (1800 segundos)
  const duration = app.serviceDuration || 1800;
  const end = addMinutes(start, duration / 60);
  return {
    id: app.id,
    title: `Reservado${app.serviceDuration ? '' : ' (padrão)'}`,
    start,
    end,
    allDay: false,
  };
});

export default function AgendaCalendar() {
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const handleViewChange = newView => setView(newView);
  const handleNavigate = newDate => setDate(newDate);

  return (
    <div className="p-4">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={view}
        views={['week', 'day']}
        date={date}
        onView={handleViewChange}
        onNavigate={handleNavigate}
        style={{ height: 600 }}
        className="bg-white shadow rounded"
      />
    </div>
  );
}




// "use client";
// import { useState, useEffect, useMemo, useCallback } from 'react';
// import {
//   format,
//   startOfWeek,
//   endOfWeek,
//   addWeeks,
//   subWeeks,
//   addDays,
//   subDays,
//   parseISO,
//   startOfDay,
//   endOfDay,
//   eachHourOfInterval,
//   setHours,
//   setMinutes,
//   isSameHour,
//   isSameDay
// } from 'date-fns';
// import ptBR from 'date-fns/locale/pt-BR';

// interface Appointment {
//   id: number;
//   dateTime: string;
//   serviceDuration: number;
//   employeeId: number;
//   companyId: number;
//   userId: number;
// }

// const WORKING_HOURS = { start: 8, end: 20 };

// const toLocalDate = (dateString: string) => {
//   const date = new Date(dateString);
//   return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
// };

// export default function SchedulePage() {
//   const [filters, setFilters] = useState({
//     companyId: '',
//     employeeId: '',
//     userId: ''
//   });
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Cálculo de datas visíveis
//   const { days, timeSlots } = useMemo(() => {
//     const start = viewMode === 'week' 
//       ? startOfWeek(currentDate, { weekStartsOn: 1 })
//       : startOfDay(currentDate);
    
//     const end = viewMode === 'week'
//       ? endOfWeek(currentDate, { weekStartsOn: 1 })
//       : endOfDay(currentDate);

//     const daysArray = Array.from({ length: viewMode === 'week' ? 7 : 1 }).map((_, i) =>
//       addDays(start, i)
//     );

//     const slots = eachHourOfInterval({
//       start: setHours(setMinutes(start, 0), WORKING_HOURS.start),
//       end: setHours(setMinutes(start, 0), WORKING_HOURS.end)
//     });

//     return { days: daysArray, timeSlots: slots };
//   }, [currentDate, viewMode]);

//   // Buscar agendamentos
//   const fetchAppointments = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError('');
      
//       const params = new URLSearchParams();
//       if (filters.companyId) params.append('companyId', filters.companyId);
//       if (filters.employeeId) params.append('employeeId', filters.employeeId);
//       if (filters.userId) params.append('userId', filters.userId);

//       const response = await fetch(`/api/appointments?${params.toString()}`);
      
//       if (!response.ok) throw new Error('Erro na busca');
//       const data = await response.json();
      
//       console.log('Agendamentos recebidos:', data);
//       setAppointments(data);

//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Erro desconhecido');
//     } finally {
//       setLoading(false);
//     }
//   }, [filters]);

//   useEffect(() => {
//     fetchAppointments();
//   }, [fetchAppointments]);

//   // Atualizar visualização
//   const handleDateNavigation = (direction: 'next' | 'prev') => {
//     setCurrentDate(prev => {
//       const modifier = viewMode === 'week' ? addWeeks : addDays;
//       const subtractor = viewMode === 'week' ? subWeeks : subDays;
//       return direction === 'next' ? modifier(prev, 1) : subtractor(prev, 1);
//     });
//   };

//   // Encontrar agendamentos para cada slot
//   const getAppointmentsForSlot = (day: Date, slotTime: Date) => {
//     return appointments.filter(app => {
//       const appDate = toLocalDate(app.dateTime);
//       return isSameDay(appDate, day) && isSameHour(appDate, slotTime);
//     });
//   };

//   return (
//     <div className="container">
//       {/* Filtros */}
//       <div className="filters">
//         <input
//           type="number"
//           placeholder="ID Empresa"
//           value={filters.companyId}
//           onChange={e => setFilters(prev => ({ ...prev, companyId: e.target.value }))}
//         />
//         <input
//           type="number"
//           placeholder="ID Funcionário"
//           value={filters.employeeId}
//           onChange={e => setFilters(prev => ({ ...prev, employeeId: e.target.value }))}
//         />
//         <input
//           type="number"
//           placeholder="ID Cliente"
//           value={filters.userId}
//           onChange={e => setFilters(prev => ({ ...prev, userId: e.target.value }))}
//         />
//       </div>

//       {/* Controles */}
//       <div className="controls">
//         <button onClick={() => handleDateNavigation('prev')}>‹</button>
        
//         <h2>
//           {viewMode === 'week' 
//             ? format(currentDate, "MMMM yyyy", { locale: ptBR })
//             : format(currentDate, "dd MMMM yyyy", { locale: ptBR })}
//         </h2>
        
//         <button onClick={() => handleDateNavigation('next')}>›</button>
        
//         <select 
//           value={viewMode}
//           onChange={e => setViewMode(e.target.value as 'day' | 'week')}
//         >
//           <option value="day">Dia</option>
//           <option value="week">Semana</option>
//         </select>
//       </div>

//       {/* Tabela */}
//       <div className="table-wrapper">
//         <table className="schedule-table">
//           <thead>
//             <tr>
//               <th>Horário</th>
//               {days.map(day => (
//                 <th key={day.toISOString()}>
//                   {format(day, 'EEEEEE dd/MM', { locale: ptBR })}
//                 </th>
//               ))}
//             </tr>
//           </thead>
          
//           <tbody>
//             {timeSlots.map(slotTime => (
//               <tr key={slotTime.getTime()}>
//                 <td>{format(slotTime, 'HH:mm')}</td>
                
//                 {days.map(day => {
//                   const appointments = getAppointmentsForSlot(day, slotTime);
//                   return (
//                     <td key={`${day.toISOString()}-${slotTime.getTime()}`}>
//                       {appointments.map(app => (
//                         <div key={app.id} className="appointment">
//                           <div>{format(toLocalDate(app.dateTime), 'HH:mm')}</div>
//                           <div>{app.serviceDuration} minutos</div>
//                           <div>Cliente #{app.userId}</div>
//                         </div>
//                       ))}
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Estados */}
//       {loading && <div className="loading">Carregando...</div>}
//       {error && <div className="error">{error}</div>}
//       {!loading && !error && appointments.length === 0 && (
//         <div className="empty">Nenhum agendamento encontrado</div>
//       )}

//       <style jsx>{`
//         .container {
//           padding: 20px;
//           max-width: 100%;
//           overflow-x: auto;
//         }

//         .filters {
//           display: grid;
//           gap: 10px;
//           grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
//           margin-bottom: 20px;
//         }

//         .filters input {
//           padding: 8px;
//           border: 1px solid #ccc;
//           border-radius: 4px;
//         }

//         .controls {
//           display: flex;
//           align-items: center;
//           gap: 15px;
//           margin-bottom: 20px;
//         }

//         .controls button, .controls select {
//           padding: 8px 15px;
//           border: 1px solid #0070f3;
//           border-radius: 4px;
//           background: #0070f3;
//           color: white;
//           cursor: pointer;
//         }

//         .table-wrapper {
//           background: white;
//           border-radius: 8px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//         }

//         .schedule-table {
//           width: 100%;
//           border-collapse: collapse;
//           min-width: 800px;
//         }

//         th, td {
//           padding: 12px;
//           border: 1px solid #eee;
//           text-align: center;
//           vertical-align: top;
//         }

//         th {
//           background: #f8f8f8;
//           font-weight: 500;
//         }

//         .appointment {
//           background: #e6f4ff;
//           margin: 4px;
//           padding: 8px;
//           border-radius: 4px;
//           font-size: 0.9em;
//         }

//         .loading, .error, .empty {
//           padding: 20px;
//           text-align: center;
//           margin-top: 20px;
//         }

//         .error {
//           color: #dc3545;
//           background: #ffeef0;
//         }

//         .empty {
//           color: #666;
//         }
//       `}</style>
//     </div>
//   );
// }
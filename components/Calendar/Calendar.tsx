import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import addMinutes from 'date-fns/addMinutes';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configuração do localizador para português
const locales = { 'pt-BR': ptBR };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Exemplo dos agendamentos (pode vir de um JSON ou API)
const appointments = [
  {
    id: 6,
    dateTime: "2025-02-22T12:44:49.363Z",
    serviceDuration: 0, // 0 indica duração padrão de 30 minutos
    employeeId: 1,
    companyId: 1,
    userId: 1
  },
  {
    id: 11,
    dateTime: "2025-02-25T11:43:58.401Z",
    serviceDuration: 0,
    employeeId: 1,
    companyId: 1,
    userId: 1
  },
  {
    id: 1,
    dateTime: "2025-04-09T08:44:42.000Z",
    serviceDuration: 3600, // duração em segundos
    employeeId: 1,
    companyId: 1,
    userId: 1
  }
];

// Converte os agendamentos para o formato esperado pelo react-big-calendar
const events = appointments.map(app => {
  const start = new Date(app.dateTime);
  // Se não tiver duração definida, assume 30 minutos (1800 segundos)
  const duration = app.serviceDuration || 1800;
  const end = addMinutes(start, duration / 60);
  return {
    id: app.id,
    title: `Reservado`,
    start,
    end,
    allDay: false,
  };
});

interface AgendaModalProps {
  showCalendar: boolean;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AgendaModal({ showCalendar, setShowCalendar }: AgendaModalProps) {
  // Define a visualização padrão como semana
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const handleViewChange = (newView: Views) => setView(newView);
  const handleNavigate = (newDate: Date) => setDate(newDate);

  if (!showCalendar) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-gray-900 rounded-lg shadow max-h-[80vh] w-full max-w-3xl flex flex-col">
        {/* Cabeçalho do modal */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-purple-600">Agenda</h2>
          {/* <button 
            className="text-red-500 hover:text-red-700" 
            onClick={() => setShowCalendar(false)}
          >
            Fechar
          </button> */}
        </div>
        {/* Conteúdo rolável com a agenda */}
        <div className="p-4 flex-1 overflow-y-auto">
          <Calendar
            localizer={localizer}
            events={events}
            view={view}
            onView={handleViewChange}
            date={date}
            onNavigate={handleNavigate}
            views={['week', 'day']}
            style={{ height: 500 }}
            messages={{
              week: 'Semana',
              day: 'Dia',
              previous: 'Anterior',
              next: 'Próximo',
              today: 'Hoje',
              month: 'Mês',
              agenda: 'Agenda'
            }}
          />
        </div>
        {/* Rodapé com botão de fechar */}
        <div className="p-4 border-t flex justify-end">
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 focus:outline-none"
            onClick={() => setShowCalendar(false)}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Loader2, Calendar, Clock, ReceiptText } from 'lucide-react';
import { addMinutes, format, isWithinInterval, parse, isSameDay, isBefore } from "date-fns";

import SubHeader from "@/components/SubHeader/SubHeader";

interface Service {
  id: number;
  name: string;
  companyId: number;
  duration: number;
  prepareTime: number;
  intervalTime: number;
  image: string;
}

interface Employee {
  id: number;
  name: string;
  image: string;
}

const getAvailableSlots = (businessHours: any[], appointments: any[], service: Service, selectedDate: Date) => {
  const adjustedDate = new Date(selectedDate);
  adjustedDate.setMinutes(adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset());
  const selectedDayOfWeek = adjustedDate.getDay();
  const dailyBusinessHours = businessHours.filter(bh => bh.dayOfWeek === selectedDayOfWeek);
  const currentDate = new Date();
  const currentTimeInMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();

  return dailyBusinessHours.flatMap(({ startTime, endTime }) => {
    let slots: string[] = [];
    let currentSlotTime = parse(startTime, "HH:mm", selectedDate);
    const closingTime = parse(endTime, "HH:mm", selectedDate);

    while (isBefore(currentSlotTime, closingTime)) {
      const currentSlotTimeInMinutes = currentSlotTime.getHours() * 60 + currentSlotTime.getMinutes();
      const isToday = isSameDay(selectedDate, currentDate);

      if (isToday && currentSlotTimeInMinutes <= currentTimeInMinutes) {
        currentSlotTime = addMinutes(currentSlotTime, service.duration + service.prepareTime + service.intervalTime);
        continue;
      }

      const overlappingAppointment = appointments.find(app =>
        isSameDay(new Date(app.dateTime), selectedDate) &&
        isWithinInterval(currentSlotTime, {
          start: new Date(app.dateTime),
          end: addMinutes(new Date(app.dateTime), app.serviceDuration)
        })
      );

      if (!overlappingAppointment) {
        slots.push(format(currentSlotTime, "HH:mm"));
      }

      currentSlotTime = addMinutes(currentSlotTime, service.duration + service.prepareTime + service.intervalTime);
    }

    return slots;
  });
};

export default function Booking() {
  const { serviceId } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [observation, setObservation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const fetchBusiness = useCallback(async () => {
    if (!serviceId) {
      setError("ID do serviço não encontrado.");
      setLoading(false);
      return;
    }
    
    try {
      // Chamada à API para buscar dados do serviço
      const response = await fetch("/api/services/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId }),
      });

      if (!response.ok) throw new Error("Serviço não encontrado");

      const data = await response.json();
      setService(data);
      setEmployees(data.employees);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, [serviceId]);
  
  useEffect(() => {
    fetchBusiness();
  }, [fetchBusiness]);

  useEffect(() => {
    if (service && selectedDate) {
      const fetchAvailabilityData = async () => {
        try {
          // const businessHours = [
          //   { dayOfWeek: 0, startTime: "09:00", endTime: "23:50" },
          //   { dayOfWeek: 5, startTime: "10:00", endTime: "11:00" },
          //   { dayOfWeek: 5, startTime: "15:00", endTime: "17:00" },
          // ];
          const businessHours = await fetch(`/api/business-hours?companyId=${service.companyId}`)
            .then((res) => res.json());

          // const appointments = [
          //   { dateTime: "2025-03-23T14:30:00", serviceDuration: 45 },
          // ];
          const appointments = await fetch(`/api/appointments?companyId=${service.companyId}&employeeId=1`)
          .then((res) => res.json());
          
          setAvailableSlots(
            getAvailableSlots(
              businessHours,
              appointments,
              service,
              new Date(selectedDate)
            )
          );
        } catch (error) {
          console.error("Erro ao buscar disponibilidade:", error);
          setError("Erro ao carregar horários disponíveis");
        }
      };

      fetchAvailabilityData();
    }
  }, [service, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Agendamento confirmado!\n\nServiço: ${service?.name}\nData: ${selectedDate}\nHorário: ${selectedTime}\nObservação: ${observation}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SubHeader />
      {loading && (
        <div className="flex justify-center mt-4">
          <Loader2 className="animate-spin text-gray-600" size={24} />
        </div>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      {service && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Agendar Serviço</h1>
            <div className="mb-6">
              <p className="text-lg font-semibold text-gray-900">{service.name}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <label className="block text-sm font-medium text-gray-700">Selecione a data</label>
                </div>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <label className="block text-sm font-medium text-gray-700">Horários disponíveis</label>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {availableSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm rounded-md transition-colors ${
                        selectedTime === time 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ReceiptText className="h-5 w-5 text-purple-600" />
                  <label className="block text-sm font-medium text-gray-700">Observações</label>
                </div>
                <textarea
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  placeholder="Adicione alguma observação importante..."
                  className="w-full p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 h-24"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedTime}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar agendamento
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
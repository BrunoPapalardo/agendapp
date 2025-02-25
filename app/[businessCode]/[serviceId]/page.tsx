"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Loader2, Calendar, Clock, ReceiptText } from 'lucide-react';

import SubHeader from "@/components/SubHeader/SubHeader";

interface Service {
  id: number;
  name: string;
  companyId: number;
  // duration: string;
  image: string;
  // price: number;
}

interface Employee {
  id: number;
  name: string;
  image: string;
}

const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

export default function Booking() {
  const { serviceId } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [observation, setObservation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusiness = useCallback(async () => {
    if (!serviceId) {
      setError("ID do serviço não encontrado.");
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch("/api/services/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId }),
      });

      if (!response.ok) {
        throw new Error("Serviço não encontrado");
      }

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Agendamento confirmado!\n\nServiço: ${service?.name}\nColaborador: ${selectedEmployee ? employees.find(e => e.id === selectedEmployee)?.name : 'Não selecionado'}\nData: ${selectedDate}\nHorário: ${selectedTime}\nObservação: ${observation}`);
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
            <p className="text-lg text-gray-900">{service.name}</p>
            {/* <p className="text-sm text-gray-500">Duração: {service.duration}</p>
            <p className="text-sm text-gray-500">Preço: R$ {service.price}</p> */}
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div>
                {/* <label className="block text-sm font-medium text-gray-700">Profissional</label> */}
                {/* <div className="grid grid-cols-2 gap-2"> */}
                  {/* {employees.map((employee) => (
                    <button
                      key={employee.id}
                      type="button"
                      onClick={() => setSelectedEmployee(employee.id)}
                      className={`flex items-center gap-2 p-2 rounded-md transition ${selectedEmployee === employee.id ? 'bg-purple-500 text-white' : 'bg-white border-gray-300 hover:bg-gray-100'}`}
                    >
                      <img src={employee.image} alt={employee.name} className="w-10 h-10 rounded-full object-cover" />
                      <span>{employee.name}</span>
                    </button>
                  ))} */}
                {/* </div> */}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-600" />
                <label className="block text-sm font-medium text-gray-700">Data</label>
              </div>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>
              <div>
              <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <label className="text-sm font-medium text-gray-700">Horário</label>
              </div>

                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm rounded-md ${selectedTime === time ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <ReceiptText className="h-4 w-4 text-purple-600" />
                  <label className="block text-sm font-medium text-gray-700">Observação</label>
                </div>
                <input
                  type="text"
                  value={observation}
                  placeholder="Escreva aqui..."
                  onChange={(e) => setObservation(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
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
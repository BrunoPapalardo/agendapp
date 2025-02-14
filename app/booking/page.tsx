// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Calendar, Clock, ReceiptText } from 'lucide-react';
// import { businesses } from '@/public/data';
// import SubHeader from '@/components/SubHeader/SubHeader';

// const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

// export function Booking() {
//   const { businessCode, serviceId } = useParams();
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedTime, setSelectedTime] = useState('');
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [observation, setObservation] = useState('');

//   const business = businesses.find(b => b.code === businessCode);
//   const service = business?.services.find(s => s.id === Number(serviceId));
//   const employees = business?.employees.filter(e => e.services.includes(Number(serviceId))) || [];

//   if (!business || !service) {
//     return <div>Serviço não encontrado</div>;
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Agendamento confirmado!\n\nServiço: ${service.name}\nEstabelecimento: ${business.name}\nColaborador: ${selectedEmployee ? employees.find(e => e.id === selectedEmployee)?.name : 'Não selecionado'}\nData: ${selectedDate}\nHorário: ${selectedTime}\nObservação: ${observation}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <SubHeader />
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white rounded-lg shadow-sm p-6">
//           <h1 className="text-2xl font-bold text-gray-900 mb-6">Agendar Serviço</h1>
//           <div className="mb-6">
//             <h2 className="text-lg font-medium text-gray-900">Detalhes do serviço</h2>
//             <div className="mt-2 text-sm text-gray-500">
//               <p>Estabelecimento: {business.name}</p>
//               <p>Serviço: {service.name}</p>
//               <p>Duração: {service.duration}</p>
//               <p>Preço: R$ {service.price}</p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Profissional</label>
//               <div className="grid grid-cols-2 gap-2">
//                 {employees.map((employee) => (
//                   <button
//                     key={employee.id}
//                     type="button"
//                     onClick={() => setSelectedEmployee(employee.id)}
//                     className={`flex items-center gap-2 p-2 rounded-md transition ${
//                       selectedEmployee === employee.id ? 'bg-purple-500 text-white' : 'bg-white border-gray-300 hover:bg-gray-100'
//                     }`}
//                   >
//                     <img src={employee.image} alt={employee.name} className="w-10 h-10 rounded-full object-cover" />
//                     <span>{employee.name}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Data</label>
//               <input
//                 type="date"
//                 required
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 min={new Date().toISOString().split('T')[0]}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Horário</label>
//               <div className="grid grid-cols-4 gap-2">
//                 {timeSlots.map((time) => (
//                   <button
//                     key={time}
//                     type="button"
//                     onClick={() => setSelectedTime(time)}
//                     className={`p-2 text-sm rounded-md ${
//                       selectedTime === time ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     }`}
//                   >
//                     {time}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Observação</label>
//               <input
//                 type="text"
//                 value={observation}
//                 placeholder="Escreva aqui..."
//                 onChange={(e) => setObservation(e.target.value)}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//             >
//               Confirmar agendamento
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
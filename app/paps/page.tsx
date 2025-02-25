"use client";

import { useState } from "react";
import Modal from "@/components/MainModal/MainModal";

export default function ModalExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button 
                onClick={() => setIsOpen(true)} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Abrir Modal
            </button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Meu Modal">
                <p>Este é um modal reutilizável!!!!!!</p>
            </Modal>
        </div>
    );
}



// "use client";
// import { useState, useEffect } from "react";

// const days = [
//   "Domingo",
//   "Segunda-feira",
//   "Terça-feira",
//   "Quarta-feira",
//   "Quinta-feira",
//   "Sexta-feira",
//   "Sábado",
// ];

// export default function BusinessHours({ companyId }: { companyId: number }) {
//   const [hours, setHours] = useState([]);

//   useEffect(() => {
//     fetch(`/api/business-hours?companyId=${companyId}`)
//       .then((res) => res.json())
//       .then(setHours);
//   }, [companyId]);

//   const handleAddPeriod = async (day: number) => {
//     await fetch("/api/business-hours", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         companyId,
//         dayOfWeek: day,
//         startTime: "08:00",
//         endTime: "12:00",
//       }),
//     });

//     fetch(`/api/business-hours?companyId=${companyId}`)
//       .then((res) => res.json())
//       .then(setHours);
//   };

//   const handleDelete = async (id: number) => {
//     await fetch(`/api/business-hours?id=${id}`, { method: "DELETE" });

//     fetch(`/api/business-hours?companyId=${companyId}`)
//       .then((res) => res.json())
//       .then(setHours);
//   };

//   return (
//     <div className="p-4 bg-gray-900 text-white">
//       {days.map((day, index) => (
//         <div key={index} className="mb-4">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-lg font-bold">{day}</span>
//             <button
//               onClick={() => handleAddPeriod(index)}
//               className="bg-blue-500 px-2 py-1 text-white rounded"
//             >
//               + Adicionar período
//             </button>
//           </div>
//           {hours
//             .filter((h) => h.dayOfWeek === index)
//             .map((h) => (
//               <div key={h.id} className="flex gap-4 items-center bg-gray-800 p-2 rounded mb-2">
//                 <span>{h.startTime} - {h.endTime}</span>
//                 <button
//                   onClick={() => handleDelete(h.id)}
//                   className="bg-red-500 px-2 py-1 text-white rounded"
//                 >
//                   Remover
//                 </button>
//               </div>
//             ))}
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";

type BusinessHour = {
  id?: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

const days = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

export default function ConfigurarHorarios() {
  const [horarios, setHorarios] = useState<Record<number, BusinessHour[]>>({});
  const [companyId] = useState(1);

  useEffect(() => {
    fetch(`/api/business-hours?companyId=${companyId}`)
      .then((res) => res.json())
      .then((data) => {
        const agrupado: Record<number, BusinessHour[]> = {};
        data.forEach((h: BusinessHour) => {
          if (!agrupado[h.dayOfWeek]) agrupado[h.dayOfWeek] = [];
          agrupado[h.dayOfWeek].push(h);
        });
        setHorarios(agrupado);
      });
  }, [companyId]);

  const adicionarHorario = (dayOfWeek: number) => {
    const novoHorario = { dayOfWeek, startTime: "08:00", endTime: "18:00" };
    setHorarios({ ...horarios, [dayOfWeek]: [...(horarios[dayOfWeek] || []), novoHorario] });
  };

  const excluirHorario = (dayOfWeek: number, index: number) => {
    const novosHorarios = [...(horarios[dayOfWeek] || [])];
    novosHorarios.splice(index, 1);
    setHorarios({ ...horarios, [dayOfWeek]: novosHorarios });
  };

  const salvarHorarios = () => {
    const horariosData = Object.values(horarios).flat();  // Transforma o objeto de horários em uma lista
    fetch(`/api/business-hours`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyId, horarios: horariosData }),  // Envia a lista completa
    })
      .then(() => alert("Horários salvos com sucesso!"))
      .catch((error) => alert("Erro ao salvar horários: " + error.message));
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white text-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-purple-600">Horário Comercial</h1>

      <div className="space-y-4">
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="border-b pb-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{day}</span>
              {!(horarios[dayIndex] && horarios[dayIndex].length > 0) ? (
                <span className="text-gray-400">Folga</span>
              ) : null}
              <button
                className="text-sm text-purple-600 hover:underline"
                onClick={() => adicionarHorario(dayIndex)}
              >
                +
              </button>
            </div>

            {horarios[dayIndex]?.map((h, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <input
                  type="time"
                  className="bg-gray-200 p-1 rounded text-gray-900"
                  value={h.startTime}
                  onChange={(e) =>
                    setHorarios({
                      ...horarios,
                      [dayIndex]: horarios[dayIndex].map((item, i) =>
                        i === index ? { ...item, startTime: e.target.value } : item
                      ),
                    })
                  }
                />
                <input
                  type="time"
                  className="bg-gray-200 p-1 rounded text-gray-900"
                  value={h.endTime}
                  onChange={(e) =>
                    setHorarios({
                      ...horarios,
                      [dayIndex]: horarios[dayIndex].map((item, i) =>
                        i === index ? { ...item, endTime: e.target.value } : item
                      ),
                    })
                  }
                />
                <button
                  className="text-red-500 text-sm hover:underline"
                  onClick={() => excluirHorario(dayIndex, index)}
                >
                  🗑
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      <button
        className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        onClick={salvarHorarios}
      >
        Salvar Horários
      </button>
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import BusinessHours from "@/components/BusinessHours/BusinessHours";

// export default function BusinessHoursPage() {
//   const params = useParams();
//   const businessCode = params?.businessCode;

//   const [company, setCompany] = useState<number | null>(null);

//   useEffect(() => {
//     async function fetchCompany() {
//       const res = await fetch("/api/companies/search", {
//         method: "POST",
//         body: JSON.stringify({ code: params.businessCode }),
//       });
//       const data = await res.json();
//       if (data.error) return;
//       setCompany(data);
//       fetchBusinessHours(data.id);
//     }
//     fetchCompany();
//   }, [params.businessCode]);

//   if (!companyId) return <p>Carregando...</p>;

//   return <BusinessHours companyId={companyId} />;
// }
// // "use client";
// // import { useEffect, useState } from "react";
// // import { useParams } from "next/navigation";
// // import BusinessHours from "@/components/BusinessHours/BusinessHours";

// // export default function BusinessHoursPage() {
// //   const params = useParams();
// //   const businessCode = params?.businessCode;

// //   const [companyId, setCompanyId] = useState<number | null>(null);

// //   useEffect(() => {
// //     if (!businessCode) return;

// //     fetch(`/api/company?code=${businessCode}`)
// //       .then((res) => res.json())
// //       .then((data) => setCompanyId(data?.id));
// //   }, [businessCode]);

// //   if (!companyId) return <p>Carregando...</p>;

// //   return <BusinessHours companyId={companyId} />;
// // }
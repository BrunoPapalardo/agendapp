import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";

type BusinessHour = {
  id?: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

const days = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
];

export default function BusinessHoursConfig({
  companyId,
  setShowBusinessHour,
}: {
  companyId: number;
  setShowBusinessHour: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [hours, setHours] = useState<Record<number, BusinessHour[]>>({});

  useEffect(() => {
    if (!companyId) return;
    fetch(`/api/business-hours?companyId=${companyId}`)
      .then((res) => res.json())
      .then((data) => {
        const grouped: Record<number, BusinessHour[]> = {};
        data.forEach((h: BusinessHour) => {
          if (!grouped[h.dayOfWeek]) grouped[h.dayOfWeek] = [];
          grouped[h.dayOfWeek].push(h);
        });
        setHours(grouped);
      });
  }, [companyId]);

  const addHour = (dayOfWeek: number) => {
    const newHour = { dayOfWeek, startTime: "08:00", endTime: "18:00" };
    setHours({ ...hours, [dayOfWeek]: [...(hours[dayOfWeek] || []), newHour] });
  };

  const removeHour = (dayOfWeek: number, index: number) => {
    const newHours = [...(hours[dayOfWeek] || [])];
    newHours.splice(index, 1);
    setHours({ ...hours, [dayOfWeek]: newHours });
  };

  const saveHours = () => {
    const hoursData = Object.values(hours).flat();
    console.log(hoursData);
    fetch(`/api/business-hours`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyId, horarios: hoursData }),
    })
      .then(() => alert("Horários salvos com sucesso!"))
      .catch((error) => alert("Erro ao salvar horários: " + error.message));
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white text-gray-900 rounded-lg shadow max-h-[80vh] flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-purple-600">Horário Comercial</h1>

      {/* Container para o conteúdo rolável */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="border-b pb-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">{day}</span>
                {!(hours[dayIndex] && hours[dayIndex].length > 0) ? (
                  <span className="text-gray-400">Folga</span>
                ) : null}
                <button
                  className="text-sm text-purple-600 hover:underline flex items-center gap-1"
                  onClick={() => addHour(dayIndex)}
                >
                  <Plus size={14} />
                </button>
              </div>

              {hours[dayIndex]?.map((h, index) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                  <input
                    type="time"
                    className="bg-gray-100 p-2 rounded text-gray-900 border"
                    value={h.startTime}
                    onChange={(e) =>
                      setHours({
                        ...hours,
                        [dayIndex]: hours[dayIndex].map((item, i) =>
                          i === index ? { ...item, startTime: e.target.value } : item
                        ),
                      })
                    }
                  />
                  <input
                    type="time"
                    className="bg-gray-100 p-2 rounded text-gray-900 border"
                    value={h.endTime}
                    onChange={(e) =>
                      setHours({
                        ...hours,
                        [dayIndex]: hours[dayIndex].map((item, i) =>
                          i === index ? { ...item, endTime: e.target.value } : item
                        ),
                      })
                    }
                  />
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeHour(dayIndex, index)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Botões fixos na parte inferior */}
      <div className="mt-4 flex justify-between gap-4 sticky bottom-0 bg-white px-6 py-4 border-t">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 focus:outline-none"
          onClick={() => setShowBusinessHour(false)}
        >
          Fechar
        </button>
        <button
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 focus:outline-none"
          onClick={saveHours}
        >
          Salvar Horários
        </button>
      </div>
    </div>
  );
}

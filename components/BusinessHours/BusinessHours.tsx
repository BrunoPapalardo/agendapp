"use client";
import { useEffect, useState } from "react";

type BusinessHour = {
  id?: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

export default function BusinessHours({ companyId }: { companyId: number }) {
  const [hours, setHours] = useState<BusinessHour[]>([]);
  const [newHour, setNewHour] = useState<BusinessHour>({
    dayOfWeek: 0,
    startTime: "08:00",
    endTime: "18:00",
  });

  useEffect(() => {
    fetch(`/api/business-hours?companyId=${companyId}`)
      .then((res) => res.json())
      .then((data) => setHours(data));
  }, [companyId]);

  const addBusinessHour = async () => {
    const response = await fetch("/api/business-hours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyId, ...newHour }),
    });

    if (response.ok) {
      const addedHour = await response.json();
      setHours([...hours, addedHour]);
    }
  };

  return (
    <div>
      <h2>Horários Comerciais</h2>
      {hours.map((hour) => (
        <div key={hour.id}>
          <p>
            Dia {hour.dayOfWeek}: {hour.startTime} - {hour.endTime}
          </p>
        </div>
      ))}
      <h3>Adicionar Novo Horário</h3>
      <select
        value={newHour.dayOfWeek}
        onChange={(e) => setNewHour({ ...newHour, dayOfWeek: parseInt(e.target.value) })}
      >
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, index) => (
          <option key={index} value={index}>
            {day}
          </option>
        ))}
      </select>
      <input
        type="time"
        value={newHour.startTime}
        onChange={(e) => setNewHour({ ...newHour, startTime: e.target.value })}
      />
      <input
        type="time"
        value={newHour.endTime}
        onChange={(e) => setNewHour({ ...newHour, endTime: e.target.value })}
      />
      <button onClick={addBusinessHour}>Adicionar</button>
    </div>
  );
}
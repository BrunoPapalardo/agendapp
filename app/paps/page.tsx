"use client"

import { useState } from "react";

export default function ServiceSearch({ serviceId }: { serviceId: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchService = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/services/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId }),
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar serviço");
      }
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto bg-white">
      <button
        onClick={fetchService}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Buscar Serviço
      </button>
      {loading && <p className="mt-2 text-gray-500">Carregando...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {data && (
        <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
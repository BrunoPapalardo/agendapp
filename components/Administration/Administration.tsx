import { useState } from "react";
import { ShieldEllipsis, User, Clock } from "lucide-react";
import BusinessHoursConfig from '@/components/BusinessHours/BusinessHours'; // Ajuste o caminho conforme necessário

const FloatingAdministration = ({ companyId }: { companyId: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [statusLoja, setStatusLoja] = useState("Público");
  const [showBusinessHour, setShowBusinessHour] = useState(false);

  const toggleStatus = () => {
    setStatusLoja((prev) => (prev === "Público" ? "Privado" : "Público"));
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 flex flex-col items-end space-y-2">
        {isOpen && (
          <div className="flex flex-col space-y-2 bg-white shadow-lg rounded-lg p-2 w-48">
            <button
              className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setShowBusinessHour(true)}
            >
              <Clock size={18} /> Horário comercial
            </button>
            <button className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded">
              <User size={18} /> Profissionais
            </button>
            <div
              className="flex justify-between items-center p-2 text-gray-700 bg-gray-100 rounded cursor-pointer"
              onClick={toggleStatus}
            >
              <span>Status: {statusLoja}</span>
              <div
                className={`w-5 h-5 rounded-full ${
                  statusLoja === "Público" ? "bg-green-500" : "bg-red-500"
                }`}
              />
            </div>
          </div>
        )}
        <button
          className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ShieldEllipsis size={20} />
        </button>
      </div>

      {showBusinessHour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <BusinessHoursConfig
              companyId={companyId}
              setShowBusinessHour={setShowBusinessHour}  // Passando a função como prop
            />
        </div>
      )}
    </>
  );
};

export default FloatingAdministration;

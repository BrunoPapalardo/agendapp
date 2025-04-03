"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MapPin, Clock, Instagram, Phone, MessageCircle, Map, AlertCircle, ArrowLeft, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import SubHeader from '@/components/SubHeader/SubHeader';
import ErrorPage from '@/components/ErrorPage/ErrorPage';
import NewProduct from '@/components/NewProduct/NewProduct';
import MainModal from '@/components/MainModal/MainModal';
import Administration from '@/components/Administration/Administration';

interface Business {
  id: number;
  code: string;
  name: string;
  image: string;
  address: string;
  rating: number;
  services: Services[];
  employees: Employees[];
}

interface Services {
  id: string;
  name: string;
  duration: string;
  price: number;
  image: string;
}

interface Employees {
  id: number;
  name: string;
  companyId: number;
  image: string;
}

function ErrorMessage({ message }: { message: string }) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <SubHeader />
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold text-gray-900">{message}</h1>
      <button
        onClick={() => router.back()}
        className="mt-4 flex items-center px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Voltar
      </button>
    </div>
  );
}

function BusinessLoading() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <SubHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-64 w-full bg-gray-200" />
          <div className="p-6">
            <div className="h-8 w-2/3 bg-gray-300 rounded-md mb-2" />
            <div className="mt-2 flex items-center text-sm">
              <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              <div className="h-4 w-1/2 bg-gray-300 rounded-md" />
            </div>
            <div className="mt-2 flex space-x-2">
              <div className="h-5 w-5 bg-gray-300 rounded-md" />
              <div className="h-5 w-5 bg-gray-300 rounded-md" />
              <div className="h-5 w-5 bg-gray-300 rounded-md" />
              <div className="h-5 w-5 bg-gray-300 rounded-md" />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="h-6 w-1/3 bg-gray-300 rounded-md mb-6" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="h-24 w-24 bg-gray-300 rounded-full mr-4" />
                  <div>
                    <div className="h-6 w-32 bg-gray-300 rounded-md mb-2" />
                    <div className="mt-2 flex items-center text-sm">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div className="h-4 w-20 bg-gray-300 rounded-md ml-1" />
                    </div>
                    <div className="h-6 w-16 bg-gray-300 rounded-md mt-2" />
                    <div className="mt-4 h-10 w-full bg-gray-300 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BusinessPage() {
  const { data: session } = useSession();
  const { businessCode } = useParams();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  // Estado para controlar qual campo está sendo editado
  const [modalData, setModalData] = useState<{ field: string; serviceId?: string } | null>(null);

  useEffect(() => {
    async function fetchBusiness() {
      try {
        const response = await fetch("/api/companies/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: businessCode }),
        });

        if (!response.ok) {
          throw new Error("Company not found");
        }

        const data = await response.json();
        setBusiness(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Ocorreu um erro desconhecido");
      } finally {
        setLoading(false);
      }
    }

    if (businessCode) {
      fetchBusiness();
    }
  }, [businessCode]);


  console.log(business?.employees);


  let isAdmin = false;
  if (session) {
    isAdmin = session?.user?.companyRoles?.some(role => role.companyId === business?.id) || false;
  }

  if (loading) {
    return <BusinessLoading />;
  }

  if (error || !business) {
    return <ErrorPage message={error || "Estabelecimento não encontrado"} />;
  }

  // Função para abrir o modal de edição
    const openEditModal = (field: string, serviceId?: string) => {
        setModalData({ field, serviceId });
    };

  return (
    <div className="min-h-screen bg-gray-50">
      <SubHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-64 w-full relative">
            <Image
              src={business.image}
              alt={business.name}
              className="w-full h-full object-cover"
              width={300}
              height={200}
            />
            {isAdmin && (
              <div
                onClick={() => openEditModal("imagem", "image")}
                className="absolute top-2 right-2 p-2 bg-white bg-opacity-50 rounded-full cursor-pointer"
              >
                <SquarePen />
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="mt-2 flex items-center space-x-2">
              <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
              {isAdmin && (
                <div
                  onClick={() => openEditModal("nome", "name")}
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 cursor-pointer"
                >
                  <SquarePen />
                </div>
              )}
            </div>

            <div className="mt-2 flex items-center space-x-3 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <span>{business.address}</span>
              </div>
              {isAdmin && (
                <div onClick={() => openEditModal("endereço")} className="cursor-pointer">
                  <SquarePen className="flex-shrink-0 h-5 w-5 text-gray-400" />
                </div>
              )}
            </div>

            <div className="mt-2 flex space-x-2">
              <a href={`https://www.instagram.com`} target="_blank">
                <Instagram className="h-5 w-5 text-purple-400" />
              </a>
              <a href={`https://wa.me/+5517996213602`} target="_blank">
                <MessageCircle className="h-5 w-5 text-green-400" />
              </a>
              <a href={`tel:+5517996213602`}>
                <Phone className="h-5 w-5 text-blue-400" />
              </a>
              <a href={`https://www.google.com.br/maps/preview`} target="_blank">
                <Map className="h-5 w-5 text-yellow-400" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Profissionais</h2>
            
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {business?.employees.map((employee) => {
                const isSelected = selectedEmployee === employee.id;

                return (
                  <button
                    key={employee.id}
                    type="button"
                    onClick={() => setSelectedEmployee(isSelected ? -1 : employee.id)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition 
                    ${isSelected ? 'border-purple-600 bg-purple-100' : 'border-gray-300 bg-white hover:bg-gray-100'}`}
                    aria-label={`Mostrar serviços de ${employee.name}`}
                  >
                    <img 
                      src={employee.image} 
                      alt={employee.name} 
                      className="w-14 h-14 rounded-full object-cover border border-gray-300"
                    />
                    <span className="text-xs font-medium text-gray-700 truncate w-full text-center">
                      {employee.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-0">Serviços disponíveis</h2>
            {isAdmin && <NewProduct />}
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {business.services.map((service) => (
              <div key={service.id} className="relative bg-white rounded-lg shadow-sm p-6">
                {isAdmin && (
                  <div className="absolute top-2 right-2 mt-4 flex space-x-2">
                    <Trash2 className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-700" />
                    <SquarePen
                      className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
                    />
                  </div>
                )}
                <div className="flex items-center">
                  <div className="h-24 w-24 rounded-t-lg overflow-hidden mr-4">
                    <Image
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full rounded-full object-cover"
                      width={300}
                      height={200}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {service.duration}
                    </div>
                    <p className="mt-2 text-lg font-medium text-gray-900">R$ {service.price}</p>

                    {isAdmin ? (
                      <Link
                        href={`/${business.code}/${service.id}`}
                        className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                      >
                        Agendar para alguém
                      </Link>
                    ) : (
                      <Link
                        href={`/${business.code}/${service.id}`}
                        className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                      >
                        Agendar
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalData && (
        <MainModal onClose={() => setModalData(null)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
              Editar {modalData.field}
              {modalData.serviceId ? ` - Serviço ${modalData.serviceId}` : ""}
            </h2>
            <input
              type="text"
              placeholder={`Novo ${modalData.field}`}
              className="border rounded w-full p-2"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setModalData(null)} 
                className="w-full px-4 py-2 text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-500">
                Cancelar
              </button>
              <button
                onClick={() => {
                  // Aqui você pode implementar a lógica de salvar as alterações
                  console.log(modalData);
                  setModalData(null);
                }}
                className="w-full px-4 py-2 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </MainModal>
      )}
      <Administration companyId={business.id}/>
    </div>
  );
}

export default BusinessPage;
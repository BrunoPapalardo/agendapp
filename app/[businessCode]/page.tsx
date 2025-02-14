'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { MapPin, Clock, Instagram, Phone, MessageCircle, Map, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import SubHeader from '@/components/SubHeader/SubHeader';
import ErrorPage from '@/components/ErrorPage/ErrorPage';

interface Business {
    id: number;
    code: string;
    name: string;
    image: string;
    address: string;
    rating: number;
    products: Products[];
}

interface Products {
    id: string;
    name: string;
    duration: string;
    price: number;
    image: string;
}

function ErrorMessage({ message }: { message: string }) {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <SubHeader/>
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

// Skeleton Loader para a página
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
    const { businessCode } = useParams();
    const [business, setBusiness] = useState<Business | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) {
        return <BusinessLoading />;
    }

    if (error || !business) {
        return <ErrorPage message={error || "Estabelecimento não encontrado"} />;
    }

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
                    </div>
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {business.address}
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Serviços disponíveis</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {business.products.map((service) => (
                            <div key={service.id} className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center">
                                    <div className="h-24 w-24 rounded-t-lg overflow-hidden mr-4">
                                        <Image
                                            src={service.image}
                                            alt={service.name}
                                            className="w-full h-full rounded-full object-cover"
                                            width={300} 
                                            height={200}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                                        <div className="mt-2 flex items-center text-sm text-gray-500">
                                            <Clock className="h-4 w-4 text-gray-400" />
                                            {service.duration}
                                        </div>
                                        <p className="mt-2 text-lg font-medium text-gray-900">R$ {service.price}</p>
                                        <Link
                                            // href={`/booking/${business.code}/${service.id}`}
                                            href={`/${business.code}/${service.id}`}
                                            className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                                        >
                                            Agendar
                                        </Link>
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

export default BusinessPage;
'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, Star, Clock, Instagram, Phone, MessageCircle, Map } from "lucide-react";
import Link from "next/link";
import SubHeader from '../../../components/SubHeader/SubHeader';
interface Business {
    code: string;
    name: string;
    image: string;
    address: string;
    rating: number;
    services: Service[];
}

interface Service {
    id: string;
    name: string;
    duration: string;
    price: number;
    image: string;
}

function BusinessPage() {
    const { businessCode } = useParams();
    const [business, setBusiness] = useState<Business | null>(null); // Define o tipo 'Business'
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
                setError('error.message');
            } finally {
                setLoading(false);
            }
        }

        if (businessCode) {
            fetchBusiness();
        }
    }, [businessCode]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!business) {
        return <div>Estabelecimento não encontrado {businessCode}</div>;
    }

    console.log(business.services);

    return (
        <div className="min-h-screen bg-gray-50">
            <SubHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Business Header */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="h-64 w-full relative">
                        <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {business.address}
                        </div>
                        <div className="mt-2 flex items-center">
                            <Star className="text-yellow-400 h-5 w-5" />
                            <span className="ml-1 text-sm text-gray-600">{business.rating}</span>
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

                {/* Services List */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Serviços disponíveis</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {/* {business.services.map((service) => (
                            <div key={service.id} className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center">
                                    <div className="h-24 w-24 rounded-t-lg overflow-hidden mr-4">
                                        <img
                                            src={service.image}
                                            alt={service.name}
                                            className="w-full h-full rounded-full object-cover"
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
                                            href={`/booking/${business.code}/${service.id}`}
                                            className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                                        >
                                            Agendar
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BusinessPage;

"use client";

import SubHeader from '@/components/SubHeader/SubHeader';
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

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

export default function AdminPage() {

    const { companyCode } = useParams();
    // const [company, setCompany] = useState<Business | null>(null);


  return (
    <div>
        <SubHeader/>
        <button>
            {companyCode}
        </button>
    </div>
  );
}
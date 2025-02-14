'use client';

import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft } from "lucide-react";
import SubHeader from "@/components/SubHeader/SubHeader";
import Error from "@/components/ErrorPage/ErrorPage";

export default function ErrorPage() {
    const router = useRouter();

    return (
        <Error/>
    );
}
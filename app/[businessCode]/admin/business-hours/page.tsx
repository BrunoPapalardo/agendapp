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
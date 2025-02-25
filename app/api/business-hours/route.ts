// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const companyId = parseInt(searchParams.get("companyId") || "0");

//   if (!companyId) return NextResponse.json({ error: "Empresa não encontrada" }, { status: 400 });

//   const businessHours = await prisma.businessHours.findMany({
//     where: { companyId },
//   });

//   return NextResponse.json(businessHours);
// }

// export async function POST(req: NextRequest) {
//   const { companyId, dayOfWeek, startTime, endTime } = await req.json();

//   const newHour = await prisma.businessHours.create({
//     data: { companyId, dayOfWeek, startTime, endTime },
//   });

//   return NextResponse.json(newHour);
// }
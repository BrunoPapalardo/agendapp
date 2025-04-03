import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const companyId = Number(req.nextUrl.searchParams.get("companyId"));
    const employeeId = req.nextUrl.searchParams.get("employeeId");

    if (!companyId) {
      return NextResponse.json(
        { error: "companyId é obrigatório" },
        { status: 400 }
      );
    }

    const whereClause = {
      companyId,
      ...(employeeId && { employeeId: Number(employeeId) })
    };

    const businessHours = await prisma.businessHours.findMany({
      where: whereClause,
      orderBy: [
        { dayOfWeek: "asc" },
        { startTime: "asc" }
      ]
    });

    return NextResponse.json(businessHours);

  } catch (error) {
    console.error("Error fetching business hours:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
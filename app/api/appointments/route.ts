import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const companyId = Number(req.nextUrl.searchParams.get("companyId"));
    const employeeId = Number(req.nextUrl.searchParams.get("employeeId"));

    if (!companyId || isNaN(companyId) || !employeeId || isNaN(employeeId)) {
      return NextResponse.json(
        { error: "Parâmetros inválidos" },
        { status: 400 }
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        companyId,
        employeeId
      },
      select: {
        dateTime: true,
        serviceDuration: true,
        employeeId: true
      }
    });

    return NextResponse.json(appointments);
    
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
// app\api\business-hours\route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const companyId = Number(req.nextUrl.searchParams.get("companyId"));
    
    if (!companyId) {
      return NextResponse.json(
        { error: "companyId é obrigatório" },
        { status: 400 }
      );
    }

    const businessHours = await prisma.businessHours.findMany({
      where: { companyId },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }]
    });

    return NextResponse.json(businessHours);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar horários comerciais" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { companyId, horarios } = await req.json();
    
    if (!companyId || !Array.isArray(horarios)) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }

    await prisma.businessHours.deleteMany({ where: { companyId } });

    const createdHours = await prisma.businessHours.createMany({
      data: horarios.map((h: any) => ({
        companyId,
        dayOfWeek: h.dayOfWeek,
        startTime: h.startTime,
        endTime: h.endTime
      }))
    });

    return NextResponse.json(createdHours, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar horários" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.searchParams.get("id"));
    
    if (!id) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    await prisma.businessHours.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir horário" },
      { status: 500 }
    );
  }
}
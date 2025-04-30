import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    
    // Obter e validar parâmetros
    const params = {
      companyId: parseInt(searchParams.get("companyId") || ''),
      employeeId: parseInt(searchParams.get("employeeId") || ''),
      userId: parseInt(searchParams.get("userId") || '')
    };

    // Verificar parâmetros válidos
    const validParams = Object.values(params).filter(value => !isNaN(value) && value > 0);
    
    if (validParams.length === 0) {
      return NextResponse.json(
        { 
          error: "Forneça pelo menos um parâmetro válido: companyId, employeeId ou userId",
          example: "/api/appointments?companyId=1&employeeId=2"
        },
        { status: 400 }
      );
    }

    // Construir query
    const where: any = {};
    
    if (!isNaN(params.companyId) && params.companyId > 0) {
      where.companyId = params.companyId;
    }
    
    if (!isNaN(params.employeeId) && params.employeeId > 0) {
      where.employeeId = params.employeeId;
    }
    
    if (!isNaN(params.userId) && params.userId > 0) {
      where.userId = params.userId;
    }

    // Buscar agendamentos
    const appointments = await prisma.appointment.findMany({
      where,
      select: {
        id: true,
        dateTime: true,
        serviceDuration: true,
        employeeId: true,
        companyId: true,
        userId: true
      },
      orderBy: { dateTime: 'asc' },
      // include: { services: true },
    });

    const formattedAppointments = appointments.map(app => ({
      ...app,
      dateTime: new Date(app.dateTime).toISOString()
    }));

  return NextResponse.json(formattedAppointments);

  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validar campos obrigatórios
    if (!body.dateTime || !body.userId || !body.employeeId || !body.companyId) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando: dateTime, userId, employeeId ou companyId" },
        { status: 400 }
      );
    }

    // Criar o agendamento
    const newAppointment = await prisma.appointment.create({
      data: {
        dateTime: new Date(body.dateTime),
        userId: parseInt(body.userId),
        employeeId: parseInt(body.employeeId),
        companyId: parseInt(body.companyId),
        serviceId: body.serviceId ? parseInt(body.serviceId) : 0,
        serviceDuration: body.serviceDuration ? parseInt(body.serviceDuration) : 0
      },
      include: {
        user: true,
        employee: true,
        company: true,
        service: true
      }
    });

    return NextResponse.json(newAppointment, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor ao criar agendamento" },
      { status: 500 }
    );
  }
}

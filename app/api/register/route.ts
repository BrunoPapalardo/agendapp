// app/api/register/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Certifique-se que o caminho está correto
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password, telephone } = await req.json();

  if (!email || !password || !telephone) {
    return NextResponse.json(
      { message: "E-mail, senha e telefone são obrigatórios" },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ message: "E-mail já cadastrado" }, { status: 400 });
  }

  const hashedPassword = await hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, telephone },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Erro ao criar usuário" }, { status: 500 });
  }
}
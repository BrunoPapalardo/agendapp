import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      telephone?: string; // Adicionado
      companyRoles?: { companyId: number; role: string }[]; // Alterado de 'roles' para 'companyRoles'
    };
  }

  interface User {
    id: number;
    name?: string | null;
    email?: string | null;
    telephone: string; // Adicionado
    companyRoles: { companyId: number; role: string }[]; // Alterado para combinar com o Prisma
  }
}
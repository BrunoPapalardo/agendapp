import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

interface CustomUser extends User {
  id: number;
  telephone: string;
  image?: string;
  companyRoles: any[]; // Tipar corretamente conforme o modelo
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email e Senha",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { companyRoles: true }, // Inclui os roles do usuário
        });

        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        // Retorna um usuário tipado corretamente
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          telephone: user.telephone,
          image: user.image,
          companyRoles: user.companyRoles,
        } as CustomUser;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        token.id = customUser.id;
        token.name = customUser.name;
        token.email = customUser.email;
        token.telephone = customUser.telephone as string; // Garantindo tipo
        token.image = customUser.image ?? null; // Garantindo que seja string ou null
        token.companyRoles = customUser.companyRoles as { companyId: number; role: string }[];
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.telephone = token.telephone as string; // Corrigido
        session.user.image = token.image as string | null; // Corrigido
        session.user.companyRoles = token.companyRoles as { companyId: number; role: string }[]; // Corrigido
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { prisma } from "@/lib/prisma";
// import { compare } from "bcryptjs";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Email e Senha",
//       credentials: {
//         email: { label: "E-mail", type: "email" },
//         password: { label: "Senha", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user) return null;

//         const isValid = await compare(credentials.password, user.password);
//         if (!isValid) return null;

//         return { id: user.id, name: user.name, email: user.email };
//       },
//     }),
//   ],
//   session: { strategy: "jwt" as const },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.id = user.id;
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) session.user.id = token.id as string;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };
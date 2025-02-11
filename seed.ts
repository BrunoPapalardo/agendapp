import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Criando categorias
  const categories = await prisma.category.createMany({
    data: [
      { name: "Barbearia", icon: "✂️" },
      { name: "Salão de Beleza", icon: "💇" },
      { name: "Clínica Estética", icon: "💆" },
    ],
  });

  // Criando negócios
  const companyes = await prisma.company.createMany({
    data: [
      { name: "Barbearia do João", code: "BarbeariadoJoao", address: "Rua das Barbas, 123", categoryId: 1 },
      { name: "Salão da Maria", code: "SalaodaMaria", address: "Avenida dos Cabelos, 456", categoryId: 2 },
      { name: "Clínica Bella", code: "ClinicaBella", address: "Praça da Estética, 789", categoryId: 3 },
    ],
  });

  // Criando funcionários
  const employees = await prisma.employee.createMany({
    data: [
      { name: "Carlos Cabeludo", companyId: 1 },
      { name: "Ana Tranças", companyId: 2 },
      { name: "Beatriz Estética", companyId: 3 },
    ],
  });

  // Criando produtos/serviços
  const products = await prisma.product.createMany({
    data: [
      { name: "Corte Simples", companyId: 1 },
      { name: "Pintura de Cabelo", companyId: 2 },
      { name: "Limpeza de Pele", companyId: 3 },
    ],
  });

  // Criando usuários
  const users = await prisma.user.createMany({
    data: [
      { name: "Bruno Cliente", email: "bruno@email.com", telephone: "(11) 99999-9999", password: "hashed_password" },
      { name: "Carlos Cliente", email: "carlos@email.com", telephone: "(21) 98888-8888", password: "hashed_password" },
      { name: "Ana Cliente", email: "ana@email.com", telephone: "(31) 97777-7777", password: "hashed_password" },
    ],
  });

  // Criando agendamentos
  await prisma.appointment.createMany({
    data: [
      { dateTime: new Date(), userId: 1, employeeId: 1, companyId: 1, productId: 1 },
      { dateTime: new Date(), userId: 2, employeeId: 2, companyId: 2, productId: 2 },
      { dateTime: new Date(), userId: 3, employeeId: 3, companyId: 3, productId: 3 },
    ],
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
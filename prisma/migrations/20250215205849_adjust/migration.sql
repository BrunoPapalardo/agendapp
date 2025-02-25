/*
  Warnings:

  - You are about to drop the column `productId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_companyId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "productId",
ADD COLUMN     "serviceId" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "cnpj" TEXT,
ADD COLUMN     "coordinates" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "ispublic" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "telephone" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "whatsapp" TEXT,
ALTER COLUMN "image" DROP NOT NULL;

-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

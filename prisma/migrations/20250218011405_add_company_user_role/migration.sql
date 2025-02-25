/*
  Warnings:

  - Made the column `startTime` on table `BusinessHours` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endTime` on table `BusinessHours` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BusinessHours" ALTER COLUMN "startTime" SET NOT NULL,
ALTER COLUMN "endTime" SET NOT NULL;

-- CreateTable
CREATE TABLE "CompanyUserRole" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'employee',

    CONSTRAINT "CompanyUserRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyUserRole_userId_companyId_key" ON "CompanyUserRole"("userId", "companyId");

-- AddForeignKey
ALTER TABLE "CompanyUserRole" ADD CONSTRAINT "CompanyUserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyUserRole" ADD CONSTRAINT "CompanyUserRole_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `isClosed` on the `BusinessHours` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BusinessHours" DROP COLUMN "isClosed",
ADD COLUMN     "employeeId" INTEGER;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "intervalTime" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prepareTime" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "BusinessHours" ADD CONSTRAINT "BusinessHours_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

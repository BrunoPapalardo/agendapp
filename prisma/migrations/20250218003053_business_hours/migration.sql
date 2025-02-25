-- CreateTable
CREATE TABLE "BusinessHours" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT,
    "endTime" TEXT,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BusinessHours_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BusinessHours" ADD CONSTRAINT "BusinessHours_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

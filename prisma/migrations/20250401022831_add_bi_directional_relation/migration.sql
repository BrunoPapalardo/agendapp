-- CreateTable
CREATE TABLE "_ServiceEmployees" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ServiceEmployees_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ServiceEmployees_B_index" ON "_ServiceEmployees"("B");

-- AddForeignKey
ALTER TABLE "_ServiceEmployees" ADD CONSTRAINT "_ServiceEmployees_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceEmployees" ADD CONSTRAINT "_ServiceEmployees_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

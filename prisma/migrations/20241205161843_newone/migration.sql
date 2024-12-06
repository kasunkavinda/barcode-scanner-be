/*
  Warnings:

  - A unique constraint covering the columns `[barcode]` on the table `BarCodeData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BarCodeData_barcode_key" ON "BarCodeData"("barcode");

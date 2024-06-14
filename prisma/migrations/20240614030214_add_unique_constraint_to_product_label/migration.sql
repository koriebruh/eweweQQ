/*
  Warnings:

  - A unique constraint covering the columns `[product_label]` on the table `Products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Products_product_label_key" ON "Products"("product_label");

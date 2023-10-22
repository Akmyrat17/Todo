/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Todo_desc_key";

-- CreateIndex
CREATE UNIQUE INDEX "Todo_title_key" ON "Todo"("title");

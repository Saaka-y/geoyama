/*
  Warnings:

  - A unique constraint covering the columns `[routeKey]` on the table `Mountain` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Mountain_routeKey_key" ON "Mountain"("routeKey");

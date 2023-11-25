/*
  Warnings:

  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Todo";

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

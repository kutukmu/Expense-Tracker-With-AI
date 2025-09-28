/*
  Warnings:

  - You are about to drop the column `clerkcUserId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerckUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerckUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Record" DROP CONSTRAINT "Record_userId_fkey";

-- DropIndex
DROP INDEX "public"."User_clerkcUserId_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "clerkcUserId",
ADD COLUMN     "clerckUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_clerckUserId_key" ON "public"."User"("clerckUserId");

-- AddForeignKey
ALTER TABLE "public"."Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("clerckUserId") ON DELETE CASCADE ON UPDATE CASCADE;

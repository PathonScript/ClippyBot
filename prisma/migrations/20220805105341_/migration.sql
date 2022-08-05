/*
  Warnings:

  - The primary key for the `Clip` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Clip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Clip" DROP CONSTRAINT "Clip_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Clip_pkey" PRIMARY KEY ("id");

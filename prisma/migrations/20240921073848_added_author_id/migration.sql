/*
  Warnings:

  - Added the required column `author_sub` to the `Feed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feed" ADD COLUMN     "author_sub" TEXT NOT NULL;

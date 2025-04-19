/*
  Warnings:

  - The values [editor] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `chineseTitle` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Article` ADD COLUMN `chineseTitle` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user';

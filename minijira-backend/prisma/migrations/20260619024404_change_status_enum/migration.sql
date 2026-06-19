/*
  Warnings:

  - The values [in-progress] on the enum `Task_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `status` ENUM('backlog', 'todo', 'in_progress', 'done') NOT NULL DEFAULT 'backlog';

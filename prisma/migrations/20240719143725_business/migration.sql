/*
  Warnings:

  - You are about to drop the column `county` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "Profile_userId_key";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "county";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BusinessTeam" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessTeam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessTeam_user_id_key" ON "BusinessTeam"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessTeam_business_id_key" ON "BusinessTeam"("business_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- AddForeignKey
ALTER TABLE "BusinessTeam" ADD CONSTRAINT "BusinessTeam_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessTeam" ADD CONSTRAINT "BusinessTeam_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

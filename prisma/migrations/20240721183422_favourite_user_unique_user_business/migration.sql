/*
  Warnings:

  - A unique constraint covering the columns `[user_id,business_id]` on the table `FavouriteUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FavouriteUser_user_id_business_id_key" ON "FavouriteUser"("user_id", "business_id");

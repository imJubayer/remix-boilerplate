-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "address" TEXT;

-- CreateTable
CREATE TABLE "FavouriteUser" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FavouriteUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavouriteUser" ADD CONSTRAINT "FavouriteUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteUser" ADD CONSTRAINT "FavouriteUser_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

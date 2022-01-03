/*
  Warnings:

  - You are about to drop the column `refresh` on the `Token` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "access" TEXT NOT NULL,
    "idToken" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "expityDate" INTEGER NOT NULL,
    "scope" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Token" ("access", "created_at", "expityDate", "id", "idToken", "scope", "type", "updated_at", "userId") SELECT "access", "created_at", "expityDate", "id", "idToken", "scope", "type", "updated_at", "userId" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

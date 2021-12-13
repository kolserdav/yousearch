-- DropIndex
DROP INDEX "User_role_idx";

-- CreateIndex
CREATE INDEX "User_role_googleId_idx" ON "User"("role", "googleId");

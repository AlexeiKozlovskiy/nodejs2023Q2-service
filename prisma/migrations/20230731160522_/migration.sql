-- AlterTable
ALTER TABLE "users" ALTER COLUMN "version" SET DEFAULT 1,
ALTER COLUMN "version" DROP DEFAULT;
DROP SEQUENCE "users_version_seq";

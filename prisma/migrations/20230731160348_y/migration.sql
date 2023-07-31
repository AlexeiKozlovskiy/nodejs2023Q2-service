-- AlterTable
CREATE SEQUENCE users_version_seq;
ALTER TABLE "users" ALTER COLUMN "version" SET DEFAULT nextval('users_version_seq');
ALTER SEQUENCE users_version_seq OWNED BY "users"."version";

ALTER TABLE "users" DROP CONSTRAINT "users_age_check";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_age_check" CHECK ("users"."age" > 0 and "users"."age" < 200);
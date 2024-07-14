DROP TABLE `resources`;--> statement-breakpoint
ALTER TABLE `newsletter` ADD `verified` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `provider` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `providerId` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `emailIndex` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `username`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `password`;
CREATE TABLE `resources` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`href` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL
);

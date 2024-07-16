CREATE TABLE `bookmarks` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`href` text NOT NULL,
	`featured` text NOT NULL,
	`author` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `canvas` (
	`id` integer PRIMARY KEY NOT NULL,
	`data` blob,
	`textBlob` text DEFAULT '{}'
);
--> statement-breakpoint
CREATE TABLE `guestbook` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text DEFAULT 'Anonymous',
	`email` text NOT NULL,
	`message` text NOT NULL,
	`authorId` integer NOT NULL,
	FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `newsletter` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`verified` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text DEFAULT 'Anonymous',
	`email` text NOT NULL,
	`avatar_url` text DEFAULT 'https://static-00.iconduck.com/assets.00/user-avatar-icon-1820x2048-mp3gzcbn.png',
	`type` text DEFAULT 'user' NOT NULL,
	`provider` text NOT NULL,
	`providerId` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `emailIndex` ON `users` (`email`);
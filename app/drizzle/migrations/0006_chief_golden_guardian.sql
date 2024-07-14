CREATE TABLE `guestbook` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`message` text NOT NULL,
	`authorId` integer NOT NULL
);

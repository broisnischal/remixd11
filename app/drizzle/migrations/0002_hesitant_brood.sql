CREATE TABLE `document` (
	`id` integer PRIMARY KEY NOT NULL,
	`data` blob,
	`value` text NOT NULL,
	`title` text NOT NULL,
	`hidden` integer DEFAULT 0 NOT NULL
);

import {
  integer,
  pgTable,
  varchar,
  timestamp,
  boolean,
  serial,
  json
} from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  subscription: boolean("subscription").default(false),
  imageUrl: varchar("imageUrl"),
  credits: integer("credits").default(30), // 30 equal 3 vids
});

export const VideoData = pgTable('videoData', {
  id: serial('id').primaryKey(),
  videoScript: json('script').notNull(),
  audioFileUrl: varchar('audioFileUrl').notNull(),
  captions: json('captions').notNull(),
  imageList: varchar('imageList').array(),
  createdBy: varchar('createdBy').notNull()
});

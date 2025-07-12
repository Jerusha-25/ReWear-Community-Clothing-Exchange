import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  integer,
  decimal,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique().notNull(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  passwordHash: varchar("password_hash"), // For custom auth
  points: integer("points").default(0),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Categories table
export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().notNull(),
  name: varchar("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Items table
export const items = pgTable("items", {
  id: varchar("id").primaryKey().notNull(),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  categoryId: varchar("category_id").references(() => categories.id),
  ownerId: varchar("owner_id").references(() => users.id).notNull(),
  images: jsonb("images").default([]),
  size: varchar("size"),
  brand: varchar("brand"),
  condition: varchar("condition").notNull(),
  isAvailable: boolean("is_available").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Exchanges table
export const exchanges = pgTable("exchanges", {
  id: varchar("id").primaryKey().notNull(),
  offererId: varchar("offerer_id").references(() => users.id).notNull(),
  receiverId: varchar("receiver_id").references(() => users.id).notNull(),
  offeredItemId: varchar("offered_item_id").references(() => items.id).notNull(),
  requestedItemId: varchar("requested_item_id").references(() => items.id).notNull(),
  status: varchar("status").default("pending"), // pending, accepted, rejected, completed
  pointsAwarded: integer("points_awarded").default(10),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  items: many(items),
  offeredExchanges: many(exchanges, { relationName: "offerer" }),
  receivedExchanges: many(exchanges, { relationName: "receiver" }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  items: many(items),
}));

export const itemsRelations = relations(items, ({ one, many }) => ({
  category: one(categories, {
    fields: [items.categoryId],
    references: [categories.id],
  }),
  owner: one(users, {
    fields: [items.ownerId],
    references: [users.id],
  }),
  offeredExchanges: many(exchanges, { relationName: "offeredItem" }),
  requestedExchanges: many(exchanges, { relationName: "requestedItem" }),
}));

export const exchangesRelations = relations(exchanges, ({ one }) => ({
  offerer: one(users, {
    fields: [exchanges.offererId],
    references: [users.id],
    relationName: "offerer",
  }),
  receiver: one(users, {
    fields: [exchanges.receiverId],
    references: [users.id],
    relationName: "receiver",
  }),
  offeredItem: one(items, {
    fields: [exchanges.offeredItemId],
    references: [items.id],
    relationName: "offeredItem",
  }),
  requestedItem: one(items, {
    fields: [exchanges.requestedItemId],
    references: [items.id],
    relationName: "requestedItem",
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  createdAt: true,
});

export const insertItemSchema = createInsertSchema(items).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertExchangeSchema = createInsertSchema(exchanges).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Item = typeof items.$inferSelect;
export type InsertItem = z.infer<typeof insertItemSchema>;

export type Exchange = typeof exchanges.$inferSelect;
export type InsertExchange = z.infer<typeof insertExchangeSchema>;

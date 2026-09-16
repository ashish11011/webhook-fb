import { pgTable, timestamp, uuid, varchar, serial } from "drizzle-orm/pg-core";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { databaseUrl } from "../src/config/env.js";

export const tenants = pgTable("tenants", {
  tenantId: serial("tenant_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  companyName: varchar("company_name", { length: 255 }),
  phone: varchar("phone", { length: 20 }).unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  bearerToken: varchar("bearer_token", { length: 512 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const salesforceConnect = pgTable("salesforce_connect", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantId: serial("tenant_id").references(() => tenants.tenantId, {onDelete:"cascade",onUpdate:"cascade"}).notNull(), 
  salesforceApiUrl: varchar("salesforce_api_url", { length: 512 }).notNull(),   
  salesforceLoginUrl: varchar("salesforce_login_url", { length: 512 }).notNull(),
  salesforceToken: varchar("salesforce_token", { length: 512 }),
  refreshToken: varchar("refresh_token", { length: 512 }),
  instanceUrl: varchar("instance_url", { length: 512 }),
  signature: varchar("signature", { length: 512 }),
  
  clientId: varchar("client_id", { length: 255 }).notNull(), 
  clientSecret: varchar("c_secret", { length: 255 }).notNull(), 
  username: varchar("username", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  grantType: varchar("grant_type", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(), 
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const whatsappConnect = pgTable("whatsapp_connect", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantId: serial("tenant_id").references(() => tenants.tenantId, {onDelete:"cascade",onUpdate:"cascade"}).notNull(),
  whatsappBusinessNumber: varchar("whatsapp_business_number", { length: 20 }).notNull().unique(),
  businessAccountId: varchar("bussiness_account_id", { length: 255 }).notNull(),
  apiVersion: varchar("api_version", { length: 512 }).notNull(),
  accessToken: varchar("access_token", { length: 512 }),
  encryptedToken: varchar("encrypted_token", { length: 512 }).notNull(),
});

export const contacts = pgTable("contacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantId: serial("tenant_id").references(() => tenants.tenantId, {onDelete:"cascade",onUpdate:"cascade"}).notNull(),
  salesforceContactId: varchar("salesforce_contact_id", { length: 255 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull().unique(),
});

export const conversations = pgTable("conversations", {
  id: uuid("id").defaultRandom().primaryKey(),
  tenantId: serial("tenant_id").references(() => tenants.tenantId, {onDelete:"cascade",onUpdate:"cascade"}).notNull(),
  contactId: uuid("contact_id").notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  assignedUser: varchar("assigned_user", { length: 255 }).notNull(),
});

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  conversationId: uuid("conversation_id").references(() => conversations.id, {onDelete:"cascade",onUpdate:"cascade"}).notNull(),
  direction: varchar("direction", { length: 10 }).notNull(),
  content: varchar("content", { length: 1000 }).notNull(),
  whatsappMessageId: varchar("whatsapp_message_id", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
});

// Supabase's transaction-mode pooler (port 6543) doesn't support prepared
// statements, so they're disabled here.
const queryClient = postgres(databaseUrl, { prepare: false });

// Ready-to-use drizzle client — controllers just import `db` from this file.
export const db = drizzle(queryClient);
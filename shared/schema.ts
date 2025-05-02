import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  link: text("link").notNull(),
  technologies: text("technologies").array().notNull().default([]),
  keyResults: text("key_results").array().notNull().default([]),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  company: text("company").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
});

export const partenaires = pgTable("partenaires", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  link: text("link").notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isAdmin: true,
});

export const insertServiceSchema = createInsertSchema(services);
export const insertProjectSchema = createInsertSchema(projects);
export const insertTestimonialSchema = createInsertSchema(testimonials);

// Exemple de schéma Zod pour validation
export const insertPartenairesSchema = z.object({
  name: z.string().nonempty("Le champ nom est requis"),
  company: z.string().nonempty("Le champ entreprise est requis"),
  logo: z.string().url("Le logo doit être une URL valide"),
  link: z.string().url("Le lien doit être une URL valide"),
});

export const insertContactSchema = createInsertSchema(contacts)
  .pick({
    name: true,
    email: true,
    phone: true,
    subject: true,
    message: true,
  })
  .extend({
    // Rendre le champ téléphone optionnel
    phone: z.string().optional(),
  });

// Exported types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Exemple de définition pour Partenaires
export type Partenaires = {
  id: number;
  name: string;
  company: string;
  logo: string;
  link: string;
};

export type InsertPartenaires = z.infer<typeof insertPartenairesSchema>;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

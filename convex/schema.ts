import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),

  diagrams: defineTable({
    userId: v.string(),
    content: v.string(), // SVG code
    originalText: v.string(),
    title: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  svgTemplates: defineTable({
    content: v.string(), // Raw SVG with placeholders
    category: v.string(), // "comparison", "process", "hierarchy", etc.
    description: v.string(),
    keywords: v.array(v.string()),
    embedding: v.array(v.float64()), // Vector embedding
  }).vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 768,
    filterFields: ["category"],
  }),
});

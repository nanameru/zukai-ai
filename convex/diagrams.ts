import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const saveDiagram = mutation({
    args: {
        content: v.string(),
        originalText: v.string(),
        title: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated");
        }

        return await ctx.db.insert("diagrams", {
            userId: identity.tokenIdentifier,
            content: args.content,
            originalText: args.originalText,
            title: args.title,
            createdAt: Date.now(),
        });
    },
});

export const getUserDiagrams = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return [];
        }

        return await ctx.db
            .query("diagrams")
            .withIndex("by_user", (q) => q.eq("userId", identity.tokenIdentifier))
            .order("desc")
            .collect();
    },
});

import { z, defineCollection, reference } from "astro:content";

export const collections = {
  posts: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string().max(60, {
        message: "Title must be 60 characters or less.",
      }),
      description: z.string().max(160, {
        message: "Description must be 160 characters or less.",
      }),
      date: z.date(),
      author: reference("team"),
      relatedPosts: z.array(reference("posts")).optional(),
    }),
  }),
  team: defineCollection({
    type: "data",
    schema: ({ image }) =>
      z.object({
        name: z.string(),
        bio: z.string(),
        email: z.string(),
        role: z.enum(["Software", "Design", "Marketing"]),
        headshot: image(),
      }),
  }),
  services: defineCollection({
    type: "data",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      contact: reference("team"),
      available: z.boolean(),
      tags: z.array(z.enum(["b2b", "b2c", "saas", "ecommerce"])),
    }),
  }),
};

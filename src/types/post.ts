import z from 'zod';

export const CreatePostSchema = z.strictObject({
	author_id: z.uuidv4(),
	title: z.string().min(1).max(255),
	content: z.string().min(1),
	thumbnail_url: z.url().optional(),
	status: z.enum(['draft', 'published', 'archived']).optional(),
	published_at: z.date().optional(),
});

export const UpdatePostSchema = z.strictObject({
	title: z.string().min(1).max(255).optional(),
	content: z.string().min(1).optional(),
	thumbnail_url: z.url().optional(),
	status: z.enum(['draft', 'published', 'archived']).optional(),
	published_at: z.date().optional(),
});

export type CreatePostDto = z.infer<typeof CreatePostSchema>;
export type UpdatePostDto = z.infer<typeof UpdatePostSchema>;

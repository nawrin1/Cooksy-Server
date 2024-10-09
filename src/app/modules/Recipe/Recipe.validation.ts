import { z } from 'zod';

export const RecipeSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    rating: z.string(),
    tag: z.string(),
    time: z.string(),
    user: z.string().email('Invalid email format'),
    images: z.array(z.string().url('Must be a valid URL')).nonempty('At least one image URL is required'),
  }),
});


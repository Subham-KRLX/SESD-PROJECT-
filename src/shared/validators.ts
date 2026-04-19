import { z } from 'zod';

// Auth Validators
export const RegisterUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain uppercase letter')
    .regex(/[0-9]/, 'Password must contain number'),
  role: z.enum(['CUSTOMER', 'VENDOR']),
  brandName: z.string().min(2, 'Brand name required for vendors').optional(),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password required'),
});

// Gadget Validators
export const CreateGadgetSchema = z.object({
  vendorId: z.string().uuid('Invalid vendor ID'),
  categoryId: z.string().uuid('Invalid category ID'),
  modelName: z.string().min(2, 'Model name required').max(200),
  technicalSpecs: z.string().min(10, 'Technical specs required').max(5000),
  price: z.number().positive('Price must be positive'),
  stockCount: z.number().int().nonnegative('Stock count must be non-negative'),
});

export const UpdateGadgetSchema = z.object({
  modelName: z.string().min(2).max(200).optional(),
  technicalSpecs: z.string().min(10).max(5000).optional(),
  price: z.number().positive().optional(),
  stockCount: z.number().int().nonnegative().optional(),
});

// Order Validators
export const PlaceOrderSchema = z.object({
  customerId: z.string().uuid('Invalid customer ID'),
  items: z.array(
    z.object({
      gadgetId: z.string().uuid('Invalid gadget ID'),
      quantity: z.number().int().positive('Quantity must be positive'),
    })
  ).min(1, 'At least one item required'),
});

// Review Validators
export const SubmitReviewSchema = z.object({
  customerId: z.string().uuid('Invalid customer ID'),
  gadgetId: z.string().uuid('Invalid gadget ID'),
  performanceRating: z.number().int().min(1).max(5),
  feedbackText: z.string().min(10, 'Feedback must be at least 10 characters').max(1000),
});

// Category Validators
export const CreateCategorySchema = z.object({
  name: z.string().min(2, 'Category name required').max(100),
  description: z.string().max(500).optional(),
});

export const UpdateCategorySchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional(),
});

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type CreateGadgetInput = z.infer<typeof CreateGadgetSchema>;
export type PlaceOrderInput = z.infer<typeof PlaceOrderSchema>;
export type SubmitReviewInput = z.infer<typeof SubmitReviewSchema>;
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;

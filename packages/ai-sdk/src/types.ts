import { z } from 'zod';

/**
 * AI request schema
 */
export const AIRequestSchema = z.object({
  query: z.string().min(1, 'Query cannot be empty'),
  context: z.record(z.unknown()).optional(),
  userId: z.string(),
  tenantId: z.string(),
  permissions: z.array(z.string()).optional(),
});

export type AIRequest = z.infer<typeof AIRequestSchema>;

/**
 * AI response schema
 */
export const AIResponseSchema = z.object({
  id: z.string(),
  content: z.string(),
  sources: z.array(z.string()).optional(),
  confidence: z.number().min(0).max(1).optional(),
  explanation: z.string().optional(),
  timestamp: z.string(),
});

export type AIResponse = z.infer<typeof AIResponseSchema>;

/**
 * AI audit log schema
 */
export const AIAuditLogSchema = z.object({
  id: z.string(),
  userId: z.string(),
  tenantId: z.string(),
  query: z.string(),
  response: z.string(),
  timestamp: z.string(),
  permissionsChecked: z.array(z.string()).optional(),
  wasAllowed: z.boolean(),
});

export type AIAuditLog = z.infer<typeof AIAuditLogSchema>;

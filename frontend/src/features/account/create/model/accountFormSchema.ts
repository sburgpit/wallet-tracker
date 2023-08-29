import { z } from 'zod'

export const accountFormSchema = z.object({
  owner: z.string(),
  type: z.string(),
  name: z.string().min(3, `The minimum length is 3`),
  balance: z.string(),
  currency: z.string(),
  isArchived: z.boolean(),
  includeToBalance: z.boolean(),
  isSavings: z.boolean(),
})

export type AccountFormSchema = z.infer<typeof accountFormSchema>

import { z } from 'zod'

export const accountFormSchema = z
  .object({
    owner: z.string(),
    type: z.string(),
    name: z.string().min(3, `The minimum length is 3`),
    balance: z.string(),
    currency: z.string(),
    cryptoCurrency: z.string(),
    isArchived: z.boolean(),
    includeToBalance: z.boolean(),
    isSavings: z.boolean(),
    bank: z.string()
  })
  .superRefine(({ type, cryptoCurrency, currency }, ctx) => {
    console.log(type, currency, cryptoCurrency)
    if (type === 'Crypto') {
      if (cryptoCurrency === undefined) ctx.addIssue({ code: 'custom', message: 'Required', path: ['cryptoCurrency'] })
    } else {
      if (currency === undefined) ctx.addIssue({ code: 'custom', message: 'Required', path: ['currency'] })
    }
  })

export type AccountFormSchema = z.infer<typeof accountFormSchema>

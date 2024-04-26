import { z } from "zod";

export const transactionSchema = z.object({
    amount: z.string().refine((value) => {
        const parsedNumber = parseFloat(value);
        return !isNaN(parsedNumber) && parsedNumber > 0;
    }),
    date: z.date({
        required_error: "Required",
    }),
    type: z.string().min(1, {
        message: "Transaction type is required"
    }),
    description: z.string().optional(),
})
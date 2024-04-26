'use server'

import { revalidatePath } from "next/cache"
import { prisma } from "./prisma"
import { transactionSchema } from "./schemas"
import { redirect } from "next/navigation"

export const saveTransaction = async (formData, transactionID = undefined) => {
    const result = transactionSchema.safeParse(formData)

    if (result.success) {
        if (transactionID) {
            await prisma.transaction.update({
                where: {
                    id: transactionID
                },
                data: {
                    ...result.data,
                    amount: parseFloat(result.data.amount),
                }
            })
        } else {
            await prisma.transaction.create({
                data: {
                    ...result.data,
                    amount: parseFloat(result.data.amount),
                }
            })
        }

        revalidatePath("/")
        redirect("/")
    }

    if (result.error) {
        return { success: false, error: result.error.format() }
    }
}

export const getTransactionById = async (id) => {
    const transaction = await prisma.transaction.findUnique({
        where: {
            id
        }
    })

    return {
        ...transaction,
        amount: String(transaction.amount)
    }
}

export const deleteTransactionById = async (id) => {
    const result = await prisma.transaction.delete({
        where: {
            id,
        }
    })

    if (result) {
        revalidatePath("/")
    }

    if (result.error) {
        return { success: false, error: result.error.format() }
    }
}
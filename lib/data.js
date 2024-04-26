import { prisma } from "./prisma";

export const getTransactions = async () => {
    try {
        const transactions = await prisma.transaction.findMany({
            orderBy: {
                date: 'desc'
            }
        })

        return transactions;
    } catch (error) {
        console.log({ error })
        throw new Error('Failed to get transactions')
    }
}
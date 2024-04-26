import TransactionForm from "@/components/TransactionForm"
import { getTransactionById } from "../../../../lib/actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Page = async ({ params }) => {
    const transactionID = params.id

    const transaction = await getTransactionById(transactionID)

    return (
        <div className="p-10 bg-slate-200 w-96 mx-auto rounded-lg shadow-xl">
            {transaction?.id ?
                <TransactionForm transaction={transaction} />
                : (
                    <div className="flex flex-col gap-4">
                        <p className="text-red-600 font-semibold">No transaction found</p>
                        <Button type="button" variant="secondary">
                            <Link href="/">
                                Back to home
                            </Link>
                        </Button>
                    </div>
                )}
        </div>
    )
}

export default Page
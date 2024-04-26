import { CreditCard, DollarSign, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getTransactions } from "../../lib/data"
import moment from "moment"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import TransactionDeleteButton from "@/components/TransactionDeleteButton"

export default async function Home() {
  const transactions = await getTransactions();

  const totalIncomes = transactions?.filter(t => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0) || 0;

  const totalExpenses = transactions?.filter(t => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0) || 0;

  const formatNumber = (num) => num.toLocaleString('en-US');

  return (
    <div>
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full bg-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${formatNumber(totalExpenses)}</div>
          </CardContent>
        </Card>

        <Card className="w-full bg-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Incomes</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${formatNumber(totalIncomes)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="xl:col-span-2 mt-4">
        <CardHeader className="flex flex-col md:flex-row gap-4 md:gap-0 items-center">
          <div className="grid gap-2">
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Recent transactions from your store.
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/new">
              Add a New Transaction
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                <TableHead className="hidden xl:table-column">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map((item) => (
                <TableRow>
                  <TableCell>
                    <div className="font-medium">{item.type}</div>
                    <div className="text-sm text-muted-foreground md:inline">
                      {item.description}
                    </div>
                    <div className="font-medium text-muted-foreground text-xs">
                      {moment(item?.date.toString()).startOf('minute').fromNow()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">${formatNumber(parseFloat(item.amount))}</TableCell>
                  <TableCell className="flex items-center justify-end gap-2 mt-5">
                    <Link href={`/edit/${item.id}`}>
                      <Pencil className="mr-2 h-4 w-4 cursor-pointer hover:scale-105 transition-all ease-in-out" />
                    </Link>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Trash2 className="mr-2 h-4 w-4 cursor-pointer hover:scale-105 transition-all ease-in-out text-red-500" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the selected record.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <TransactionDeleteButton record={item}>
                            <AlertDialogAction>Delete</AlertDialogAction>
                          </TransactionDeleteButton>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

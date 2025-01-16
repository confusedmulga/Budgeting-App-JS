import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { RadioGroup, RadioGroupItem } from "/components/ui/radio-group"
import { Plus } from "lucide-react"

export default function BudgetingApp() {
  const [entries, setEntries] = useState([]) // No type annotation
  const [type, setType] = useState('income')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  const addEntry = () => {
    if (amount && description) {
      setEntries([...entries, { type, amount: parseFloat(amount), description }])
      setAmount('')
      setDescription('')
    }
  }

  const totalIncome = entries.reduce((acc, entry) => entry.type === 'income' ? acc + entry.amount : acc, 0)
  const totalExpenses = entries.reduce((acc, entry) => entry.type === 'expense' ? acc + entry.amount : acc, 0)
  const netBalance = totalIncome - totalExpenses

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Budget Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="type">Type</Label>
              <RadioGroup defaultValue="income" className="mt-2" value={type} onValueChange={setType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="income" id="income" />
                  <Label htmlFor="income">Income</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expense" id="expense" />
                  <Label htmlFor="expense">Expense</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-2"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2"
                placeholder="Enter description"
              />
            </div>
            <Button onClick={addEntry} className="mt-4">
              <Plus className="mr-2 h-4 w-4" /> Add Entry
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Income</span>
              <span className="font-bold">${totalIncome.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Expenses</span>
              <span className="font-bold">${totalExpenses.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Net Balance</span>
              <span className={`font-bold ${netBalance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${netBalance.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Entries</CardTitle>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <p className="text-center text-muted-foreground">No entries yet</p>
          ) : (
            <div className="space-y-2">
              {entries.map((entry, index) => (
                <div key={index} className="flex justify-between">
                  <span>{entry.description}</span>
                  <span className={`${entry.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                    {entry.type === 'income' ? '+' : '-'}${entry.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

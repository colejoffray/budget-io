const router = require('express').Router()
const incomeController = require('../controllers/incomeController')
const expenseController = require('../controllers/expenseController')



router
//Income API routes
.get('/get-incomes', incomeController.getIncomes)
.post('/add-income', incomeController.addIncome)
.delete('/delete-income/:id', incomeController.deleteIncomes)
//Expense API routes
.get('/get-expenses',  expenseController.getExpenses)
.post('/add-expense', expenseController.addExpense)
.delete('/delete-expense/:id', expenseController.deleteExpense)


module.exports = router
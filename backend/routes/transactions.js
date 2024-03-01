const router = require('express').Router()
const incomeController = require('../controllers/incomeController')
const expenseController = require('../controllers/expenseController')
const authController = require('../controllers/authController')



router
//Income API routes
.get('/get-incomes', incomeController.getIncomes)
.post('/add-income', incomeController.addIncome)
.delete('/delete-income/:id', incomeController.deleteIncomes)
//Expense API routes
.get('/get-expenses',  expenseController.getExpenses)
.post('/add-expense', expenseController.addExpense)
.delete('/delete-expense/:id', expenseController.deleteExpense)
//Auth routes
.post('/sign-up', authController.signUp)
.post('/sign-in', authController.login)


module.exports = router
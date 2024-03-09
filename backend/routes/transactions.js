const router = require('express').Router()
const incomeController = require('../controllers/incomeController')
const expenseController = require('../controllers/expenseController')
const authController = require('../controllers/authController')



router
//Income API routes
.get('/get-incomes/:id', incomeController.getIncomes)
.post('/add-income/:id', incomeController.addIncome)
.delete('/delete-income/:id', incomeController.deleteIncomes)
//Expense API routes
.get('/get-expenses/:id',  expenseController.getExpenses)
.post('/add-expense/:id', expenseController.addExpense)
.delete('/delete-expense/:id', expenseController.deleteExpense)
//Auth routes
.post('/sign-up', authController.signUp)
.post('/sign-in', authController.login)
.get('/logout', authController.logoutUser)


module.exports = router
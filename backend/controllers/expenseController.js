const Expense = require('../models/Expense')

//CARBON COPY OF INCOME CONTROLLER

module.exports = { 
    addExpense: async(req,res) => {

        const { title, amount, date, category, description } = req.body

        const expense = Expense({ 
            title, 
            amount,
            date,
            category,
            description
        })

        try{
            
            //validations
            if(!title || !category || !description || !date){
                return res.status(400).json({message: 'All fields are required!'})
            }
            if(amount <= 0 || !amount === 'number'){
                return res.status(400).json({message: 'Amount must be a positive number!'})
            }
            await expense.save()
            res.status(200).json({message: 'Expense Added'})


        }catch(err){

        }
    },
    getExpenses: async(req, res) => {
        try{
            const expenses = await Expense.find().sort({ createdAt: -1 })
            res.status(200).json(expenses)
        }catch(err){
            console.error(err)
            res.status(500).json({ message: "Server Error"})
        }
    }, 
    deleteExpense: async(req,res) => {
        try{
            await Expense.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: "Expense Deleted"})
        }catch(err){
            console.error(err)
            res.status(500).json({ message: "Server Error"})
        }
    }
}
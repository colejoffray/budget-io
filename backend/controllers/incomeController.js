const Income = require('../models/Income')

module.exports = {
    addIncome: async(req,res) => {

        //destructuring body 
        const { title, amount, category, description, date} = req.body


        //setting up new db entry for income
            const income = Income({ 
                title, 
                amount, 
                category,
                description,
                date
            })

        try{
            
            //validations 
            if( !title | !amount | !category | !description | !date ){
                return res.status(400).json({ message: 'All Fields Are Required' })
            }

            if(amount <= 0 || typeof amount !== 'number'){
                return res.status(400).json({ message: 'Amount Must be Greater than 0'})
            }
            //

            //saving entry into db
            await income.save()
            res.status(200).json({ message: 'Income has been added'})

        }catch(err){
            console.error(err)
            res.status(500).json({message: 'A Server error has occurred' })
        }
    }, 
    getIncomes: async(req, res) => {
        try{
            const incomes = await Income.find().sort({ createdAt: -1})
            res.status(200).json(incomes)

        }catch(err){
            console.error(err)
            res.status(500).json({ message: "Server Error occurred"})
        }
    }, 
    deleteIncomes: async(req, res) => {
        try{
            await Income.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: "Income has been deleted"})
        }catch(err){
            console.error(err)
            res.status(500).json({ message: 'Server error has occured, could not delete income.'})
        }
    }
}


import React, { useContext, useState, useEffect, createContext } from "react"
import axios from 'axios'

const url = process.env.REACT_APP_API_URL + '/api/v1/'


const GlobalContext = createContext({})

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    const addIncome = async (income, auth) => {
        try {
            const res = await axios.post(`${url}add-income/${auth.id}`, income);
            if (res.status === 200) {
                // Success: Log the message from the server
                console.log(res.data.message);
                // Trigger a function to update incomes
                getIncomes(auth.id);
            } else {
                // Server returned an error status
                throw new Error('Income could not be added');
            }
        } catch (err) {
            // Error occurred during the request
            console.log('Server Error:', err);
        }
    };
    
    
    

    const getIncomes = async (id) => {
        // const response = await axios.get(url + 'get-incomes')
        const response = await axios.get(`${url}get-incomes/${id}`)
        setIncomes(response.data)
    }

    const deleteIncome = async (authId,itemId) => {
        const res  = await axios.delete(`${url}delete-income/${itemId}`)
        console.log('deleted income')
        getIncomes(authId)
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + +income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (income, auth) => {
        try{
            const res = await axios.post(`${url}add-expense/${auth.id}`, income)
            if(res.status === 200){
                console.log(res.data.message)
                getExpenses(auth.id)
            }else{
                throw new Error('expense could not be added')
            }
        }catch(err){
            console.log('Server Error')
        }
    }

    const getExpenses = async (id) => {
        const response = await axios.get(`${url}get-expenses/${id}`)
        setExpenses(response.data)
    }

    const deleteExpense = async (authId, itemId) => {
        const res  = await axios.delete(`${url}delete-expense/${itemId}`)
        getExpenses(authId)
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + +income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            setIncomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            // error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext

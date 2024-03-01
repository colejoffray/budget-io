import React, { useContext, useState } from 'react'
import axios from 'axios'

const url = process.env.REACT_APP_API_URL

const GlobalContext = React.createContext()

export default function globalContext() {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses]  = useState([])
    const [error, setError] = useState(null)

    //calculate incomes 

    const addIncome = async(income) => {
        try{
            const res = await axios.post(`${url}/api/v1/add-income`, income)
            getIncomes()
        }catch(err){
            setError(err.response.data.message)
        } 
    } 

    const getIncomes = async() => {
        try{
            const response = await axios.get(`${url}/api/v1/get-income`)
            setIncomes(response.data)
        }catch(err){
            setError(err.response.data.message)
        }
        
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

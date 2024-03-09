import React, {useState, useEffect} from 'react'
import useGlobalContext from '../../hooks/useGlobal'
import useAuth from '../../hooks/useAuth'


export default function Form({ itemName }) {

    const { addIncome, getIncome, setError, addExpense} = useGlobalContext()

    const { auth } = useAuth()

    const [activeIncome, setActiveIncome] = useState({
        title: '',
        amount: '',
        category: '',
        description: '',
        date: ''
     
    })

    const handleInput = name => e =>{
        console.log(e.target.value)
        setActiveIncome({...activeIncome, [name]: e.target.value})
    }

    const handleSubmitIncome = (e) => {
        e.preventDefault()
        console.log(activeIncome)
        addIncome(activeIncome, auth)
        setActiveIncome(prevState => ({
            ...prevState,
            title: '',
            amount: '',
            date: '',
            category: '',
            description: ''
        }));


    }

    const handleSubmitExpense = (e) => {
        e.preventDefault()
        console.log(activeIncome)
        addExpense(activeIncome, auth)
        setActiveIncome(prevState => ({
            ...prevState,
            title: '',
            amount: '',
            date: '',
            category: '',
            description: ''
        }));
    }

    // const { title, amount, date, option } = income
  return (
    <div>
        <form className='flex flex-col items-center space-y-6'>
            <input type="text" name={'title'} placeholder={itemName === 'income' ? "Salary Title" : "Expense Title"} value={activeIncome.title} className="input input-bordered input-success w-full max-w-xs"  onChange={handleInput('title')} />
            <input type="text" name={'amount'} placeholder={itemName === 'income' ? "Salary Amount: round to nearest $" : "Expense Amount: round to nearest $"} value={activeIncome.amount} className="input input-bordered input-success w-full max-w-xs" onChange={handleInput('amount')} />
            <input type="date" name={'date'} className="input input-bordered input-success w-full max-w-xs" value={activeIncome.date} onChange={handleInput('date')} />
            <select className="select select-success w-full max-w-xs" name={'category'} value={activeIncome.category} onChange={handleInput('category')}>
                {itemName === 'income' ? 
                <>
                    <option value='' disabled selected>Select Option</option>
                    <option value='salary'>Salary</option>
                    <option value='freelancing'>Freelancing</option>
                    <option value='investments'>Investments</option>
                    <option value='stocks'>Stocks</option>
                    <option value='gift'>Gift</option>
                    <option value='bank transfer'>Bank Transfer</option>
                    <option value='social media'>Social Media</option>
                    <option value='other'>Other</option> 
                </>
                

                :

                <>
                    <option value="" disabled selected>Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="rent">Rent</option>
                    <option value="clothing">Clothing</option>  
                    <option value="travelling">Travelling</option>  
                    <option value="other">Other</option>  
                </>
                
            
            }
                
            </select>

            <div className='form-control'>
                <textarea className="textarea-sm textarea-success w-80" name={'description'} value={activeIncome.description} placeholder="Bio" onChange={handleInput('description')}></textarea>
            </div>

            <button className="btn btn-success w-80" onClick={itemName === 'income' ? handleSubmitIncome : handleSubmitExpense}>Submit</button>
        
        </form>
    </div>
    
    
  )
}

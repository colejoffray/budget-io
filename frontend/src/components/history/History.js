import React from 'react'
import useGlobalContext from '../../hooks/useGlobal'

export default function History() {

    const { transactionHistory } = useGlobalContext() 
    const [...history] = transactionHistory()

    console.log(history)

  return (
    <div className='flex flex-col items-center'> 
        {history.map(item => (
        <div className="card w-96 bg-base-100 shadow-xl mb-4">
            <div className="card-body">
                <div className='flex justify-between'>
                    <h2 className="card-title">
                    {item.category}
                    </h2>
                    <div className={item.type === 'income' ?  "badge badge-success text-white" : "badge badge-error text-white"}>{item.type === 'income' ? `+${item.amount}` : `-${item.amount}`}</div>
                </div>
            </div>
        </div>
        ))}                  
      
    </div>
  )
}

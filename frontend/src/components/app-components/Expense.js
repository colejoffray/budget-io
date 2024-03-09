import React, { useEffect } from 'react'
import Display from './Display'
import Form from '../Form/Form'
import useGlobalContext from '../../hooks/useGlobal';
import useAuth from '../../hooks/useAuth';

export default function Expense({ itemName }) {

  const { auth } = useAuth()
  const { expenses, getExpenses, totalExpenses, addExpense, deleteExpense } = useGlobalContext()

  useEffect(() => {
    getExpenses(auth.id)
  }, [])

  return (
    <div className='mb-8'>
      <header className="bg-white shadow flex">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Expense</h1>
        </div>
        <div className="card w-96 bg-base-100 my-4 mx-auto">
            <div className="card-body">
              <h2 className="card-title">
                Total Income:
                <div className= "text-error">- ${totalExpenses()}</div>
              </h2>
            </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-full lg:col-span-1">
              <Form itemName={itemName}/>
            </div>
            <div className="sm:col-span-full lg:col-span-1">
              <Display myData={expenses} itemName={itemName} deleteItem={deleteExpense}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


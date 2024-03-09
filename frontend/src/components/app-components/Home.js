import React, { useEffect } from 'react'
import Chart from '../chart/Chart'
import useGlobalContext from '../../hooks/useGlobal'
import useAuth from '../../hooks/useAuth'
import History from '../history/History'

export default function Home() {
  const { totalExpenses, incomes, expenses, totalIncome, getIncomes, getExpenses, totalBalance} = useGlobalContext()
  const { auth } = useAuth()

  useEffect(() => {
    getIncomes(auth.id)
    getExpenses(auth.id)
  }, [])
  return (
    <div>   
       <header className="bg-white shadow">
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
              </div>
            </header>
        <main className='mb-6'>
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-full lg:col-span-1">
                    <div className='flex flex-col items-center h-full'>
                      <Chart className='w-full'/>
                      <div className="card w-60 sm:w-96 bg-base-100 shadow-xl mb-4">
                          <div className="card-body">
                                  <h2 className="card-title">
                                  Total Income
                                  </h2>
                                  <h2 className="text-green-500 font-bold text-2xl"> + ${totalIncome()}</h2>
                          </div>
                      </div>
                      <div className="card w-96 bg-base-100 shadow-xl mb-4">
                        <div className="card-body">
                            <h2 className="card-title">
                              Total Expenses
                            </h2>
                            <h2 className="text-red-500 font-bold text-2xl"> -${totalExpenses()}</h2>
                        </div>
                      </div>
                     
                      <div className="card w-96 bg-base-100 shadow-xl mb-4">
                          <div className="card-body">
                                  <h2 className="card-title">
                                  Total Balance
                                  </h2>
                                  <h2 className={totalBalance() >= 0 ? "text-green-500 font-bold text-2xl" : "text-red-500 font-bold text-2xl"}>
                                    {totalBalance() >= 0 ? `+ $${totalBalance()}` : `$${totalBalance()}`}</h2>
                          </div> 
                        </div>
                    </div>
                  </div>
                  <div className="sm:col-span-full lg:col-span-1">
                    <div className='flex flex-col items-center'>
                      <h1 className='text-2xl text-center mb-4'>Recent History</h1>
                      <History />
                      <h1 className='text-2xl text-center mb-4'>Income</h1>
                        <div className='flex flex-col items-center'> 
                          <div className="card w-96 bg-base-100 shadow-xl mb-4">
                              <div className="card-body">
                                  <div className='flex justify-between'>
                                    <div className='flex flex-col items-center'>
                                      <h2 className="card-title">
                                      +{Math.min(...incomes.map(income => { return +income.amount}))}
                                      </h2>
                                      <div className="badge badge-primary text-white">Min</div>
                                    </div>

                                    <div className='flex flex-col items-center'>
                                      <h2 className="card-title">
                                      +{Math.max(...incomes.map(income => { return +income.amount}))}
                                      </h2>
                                      <div className="badge badge-warning text-white">Max</div>
                                    </div>
                                  </div>
                              </div>
                          </div>                 
                        </div>

                        <h1 className='text-2xl text-center mb-4'>Expenses</h1>
                        <div className='flex flex-col items-center'> 
                          <div className="card w-96 bg-base-100 shadow-xl mb-4">
                              <div className="card-body">
                                  <div className='flex justify-between'>
                                    <div className='flex flex-col items-center'>
                                      <h2 className="card-title">
                                      -{Math.min(...expenses.map(income => { return +income.amount}))}
                                      </h2>
                                      <div className="badge badge-primary text-white">Min</div>
                                    </div>

                                    <div className='flex flex-col items-center'>
                                      <h2 className="card-title">
                                      -{Math.max(...expenses.map(income => { return +income.amount}))}
                                      </h2>
                                      <div className="badge badge-warning text-white">Max</div>
                                    </div>
                                  </div>
                              </div>
                          </div>                 
                        </div>
                    </div>
                  </div>
                </div> 
              </div>
        </main>
    </div>
  )      
}

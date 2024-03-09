import React from 'react'
import { Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
    } from 'chart.js'
import styled from 'styled-components'
import { Line } from 'react-chartjs-2'
import useGlobalContext from '../../hooks/useGlobal'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

 function Chart() {
    const { incomes, expenses } = useGlobalContext()

    const data = {
        labels: incomes.map((inc) => {
            const { date } = inc
            return date
        }),
        datasets: [
            {
                label: 'Income',
                data: [ 
                    ...incomes.map((income) => {
                        const { amount } = income
                        return amount
                    })
                ],
                backgroundColor: 'green',
                tension: .2

            },
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((expense) => {
                        const { amount } = expense
                        return amount
                    })
                ],
                backgroundColor: 'red',
                tension: .2
            }
        ]
    }

  return (
    <ChartStyled>
        <Line data={data} />
    </ChartStyled>
  )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 2rem;
    display: flex;
    justify-content: center;
    border-radius: 20px;
    width: 100%;
    margin-bottom: 2rem;
`

export default Chart

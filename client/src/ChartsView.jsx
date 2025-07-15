import React, { useState, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartsView = ({chartData}) => {

    const monthlyData = {
        monthlyIncome :chartData[0], 
        monthlyExpenses:chartData[1], 
        savings:chartData[2],
        interestRate:chartData[3],
        totalIncome:chartData[4],
        totalExpenses:chartData[5],
        totalSavings : chartData[6],
    };

    const logFunc = () => {
        console.log("chartdata:",chartData)
        console.log("chartdata[2]",chartData[2])
        console.log(monthlyData.savings)
    }
  

  // Chart 1: Total Income vs Expenses vs Savings
  const chart1Data = {
    labels: ['Income', 'Expenses', 'Savings'],
    datasets: [{
      label: 'Monthly Amount ($)',
      data: [monthlyData.totalIncome, monthlyData.totalExpenses, monthlyData.totalSavings],
      backgroundColor: ['#10B981', '#EF4444', '#3B82F6'],
      borderColor: ['#059669', '#DC2626', '#2563EB'],
      borderWidth: 1
    }]
  };

  const chart1Options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Total Income vs Expenses vs Savings (Monthly)'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(0);
          }
        }
      }
    }
  };

  // Chart 2: Income and Expenses Breakdown
  const chart2Data = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Job/Snacks',
        data: [monthlyData.monthlyIncome[0], monthlyData.monthlyExpenses[0]],
        backgroundColor: '#10B981'
      },
      {
        label: 'Allowance/Games',
        data: [monthlyData.monthlyIncome[1], monthlyData.monthlyExpenses[1]],
        backgroundColor: '#06B6D4'
      },
      {
        label: 'Other/Subscriptions',
        data: [monthlyData.monthlyIncome[2], monthlyData.monthlyExpenses[2]],
        backgroundColor: '#8B5CF6'
      }
    ]
  };

  const chart2Options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Income and Expenses Breakdown (Monthly)'
      }
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(0);
          }
        }
      }
    }
  };

  // Chart 3: Income Distribution
  const chart3Data = {
    labels: ['Job', 'Allowance', 'Other'],
    datasets: [{
      data: monthlyData.monthlyIncome,
      backgroundColor: ['#10B981', '#06B6D4', '#8B5CF6']
    }]
  };

  const chart3Options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Income Distribution (Monthly)'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: $${context.parsed.toFixed(0)} (${percentage}%)`;
          }
        }
      }
    }
  };

  // Chart 4: Expenses Distribution
  const chart4Data = {
    labels: ['Snacks', 'Games', 'Subscriptions'],
    datasets: [{
      data: monthlyData.monthlyExpenses,
      backgroundColor: ['#EF4444', '#F59E0B', '#EC4899']
    }]
  };

  const chart4Options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Expenses Distribution (Monthly)'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: $${context.parsed.toFixed(0)} (${percentage}%)`;
          }
        }
      }
    }
  };

  // Chart 5: Savings Allocation
  const chart5Data = {
    labels: ['Cash', 'Gift Cards', 'Bank Account'],
    datasets: [{
      data: monthlyData.savings,
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B']
    }]
  };

  const chart5Options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Savings Allocation'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: $${context.parsed.toFixed(0)} (${percentage}%)`;
          }
        }
      }
    }
  };

  // Chart 6: Projected Bank Account Growth
  const chart6Data = useMemo(() => {
    const initialAmount = monthlyData.savings[2]; // Bank account savings
    const annualRate = monthlyData.interestRate / 100;
    const months = Array.from({length: 13}, (_, i) => i);
    const projectedValues = months.map(month => {
      const t = month / 12;
      return initialAmount * Math.pow(1 + annualRate / 12, 12 * t);
    });

    return {
      labels: months.map(m => `Month ${m}`),
      datasets: [{
        label: 'Bank Account Balance',
        data: projectedValues,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1,
        fill: true
      }]
    };
  }, [monthlyData]);

  const chart6Options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Projected Bank Account Growth (${monthlyData.interestRate}% APY)`
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(0);
          }
        }
      }
    }
  };

  // Chart 7: Net Cumulative Savings Over Time
  const chart7Data = useMemo(() => {
    const monthlyNet = monthlyData.totalIncome - monthlyData.totalExpenses;
    const months = Array.from({length: 12}, (_, i) => i + 1);
    const cumulativeNet = months.map(month => monthlyNet * month);

    return {
      labels: months.map(m => `Month ${m}`),
      datasets: [
        {
          label: 'Monthly Income',
          data: months.map(() => monthlyData.totalIncome),
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.1,
          fill: false
        },
        {
          label: 'Monthly Expenses',
          data: months.map(() => monthlyData.totalExpenses),
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.1,
          fill: false
        },
        {
          label: 'Cumulative Net Savings',
          data: cumulativeNet,
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.1,
          fill: true
        }
      ]
    };
  }, [monthlyData]);

  const chart7Options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Net Cumulative Savings Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(0);
          }
        }
      }
    }
  };

  const handleValueChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = parseFloat(value) || 0;
    setValues(newValues);
  };

  const handleTimeUnitChange = (index, unit) => {
    const newTimeUnits = [...timeUnits];
    newTimeUnits[index] = unit;
    setTimeUnits(newTimeUnits);
  };

  const incomeLabels = ['Job Income', 'Allowance Income', 'Other Income'];
  const expenseLabels = ['Snacks Expenses', 'Games Expenses', 'Subscriptions Expenses'];
  const savingsLabels = ['Cash Savings', 'Gift Cards Savings', 'Bank Account Savings'];
  const timeOptions = ['per hour', 'per day', 'per week', 'per month', 'per year'];


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Financial Dashboard
        </h1>
        

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <Bar data={chart1Data} options={chart1Options} />
          </div>

          {/* Chart 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <Bar data={chart2Data} options={chart2Options} />
          </div>

          {/* Chart 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <Pie data={chart3Data} options={chart3Options} />
          </div>

          {/* Chart 4 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <Pie data={chart4Data} options={chart4Options} />
          </div>

          {/* Chart 5 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <Doughnut data={chart5Data} options={chart5Options} />
          </div>

          {/* Chart 6 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <Line data={chart6Data} options={chart6Options} />
          </div>

          {/* Chart 7 - Full Width */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <Line data={chart7Data} options={chart7Options} />
          </div>


          {/*insert other charts */}

        </div>
      </div>

      <button onClick={logFunc}>click me :)</button>

    </div>
  );
//   return (
//     
//   )
};

export default ChartsView;
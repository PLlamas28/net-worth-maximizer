import React, { useState, useMemo } from 'react';
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

const FinancialDashboardProto = () => {
  const [values, setValues] = useState([
    1000, 200, 100, // income: job, allowance, other
    150, 80, 25,    // expenses: snacks, games, subscriptions
    500, 200, 1000, // savings: cash, gift cards, bank account
    3.5             // interest rate (APY)
  ]);

  const [timeUnits, setTimeUnits] = useState([
    'per month', 'per month', 'per month', // income time units
    'per month', 'per month', 'per month'  // expense time units
  ]);

  // Time conversion factors to monthly
  const timeFactors = {
    'per hour': 160, // ~40 hours/week * 4 weeks
    'per day': 30,
    'per week': 4.33,
    'per month': 1,
    'per year': 1/12
  };

  // Convert time-based values to monthly
  const normalizeToMonthly = (value, timeUnit) => {
    return value * timeFactors[timeUnit];
  };

  // Get normalized monthly values
  const monthlyData = useMemo(() => {
    const monthlyIncome = values.slice(0, 3).map((val, idx) => 
      normalizeToMonthly(val, timeUnits[idx])
    );
    const monthlyExpenses = values.slice(3, 6).map((val, idx) => 
      normalizeToMonthly(val, timeUnits[idx + 3])
    );
    const savings = values.slice(6, 9); // No time conversion needed
    const interestRate = values[9];

    const totalIncome = monthlyIncome.reduce((sum, val) => sum + val, 0);
    const totalExpenses = monthlyExpenses.reduce((sum, val) => sum + val, 0);
    const totalSavings = savings.reduce((sum, val) => sum + val, 0);

    return { 
      monthlyIncome, 
      monthlyExpenses, 
      savings, 
      interestRate,
      totalIncome,
      totalExpenses,
      totalSavings
    };
  }, [values, timeUnits]);

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
        
        {/* Input Forms */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Financial Data Input</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Income Section */}
            <div>
              <h3 className="text-lg font-medium mb-3 text-green-600">Income</h3>
              {incomeLabels.map((label, index) => (
                <div key={index} className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={values[index]}
                      onChange={(e) => handleValueChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      step="0.01"
                    />
                    <select
                      value={timeUnits[index]}
                      onChange={(e) => handleTimeUnitChange(index, e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {timeOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Expenses Section */}
            <div>
              <h3 className="text-lg font-medium mb-3 text-red-600">Expenses</h3>
              {expenseLabels.map((label, index) => (
                <div key={index} className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={values[index + 3]}
                      onChange={(e) => handleValueChange(index + 3, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      step="0.01"
                    />
                    <select
                      value={timeUnits[index + 3]}
                      onChange={(e) => handleTimeUnitChange(index + 3, e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {timeOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Savings Section */}
            <div>
              <h3 className="text-lg font-medium mb-3 text-blue-600">Savings & Interest</h3>
              {savingsLabels.map((label, index) => (
                <div key={index} className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type="number"
                    value={values[index + 6]}
                    onChange={(e) => handleValueChange(index + 6, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                  />
                </div>
              ))}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Rate (APY %)
                </label>
                <input
                  type="number"
                  value={values[9]}
                  onChange={(e) => handleValueChange(9, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        </div>

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
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboardProto;
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import InputView from './InputView'
import NumberForm from './NumberForm'
import FinancialDashboard from './FinancialDashboardProto';
import ChartsView from './ChartsView';

function App() {
  const [flag, setFlag] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      const res = await fetch('http://localhost:5000/api/data');
      const data = await res.json();
      setChartData(data.chartData);
    };

    fetchChartData();
  }, [flag]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputView setFlag={setFlag}/>} />
        <Route path="/another"
          element= {chartData ? <ChartsView chartData={chartData}/> : 'Loading...'}
        />
      </Routes>
    </Router>
  );
}

export default App;

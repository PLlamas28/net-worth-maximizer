import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import InputField from './InputField'
import NumberForm from './NumberForm'
import ChartComponent from './ChartComponent'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       {/* <InputField/> */}
//       <NumberForm/>
//       <NumberForm/>
//     </>
//   )
// }

function App() {
  const [form1Data, setForm1Data] = useState(null);
  const [form2Data, setForm2Data] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  const submitForm1 = async (data) => {
    const updatedForm1Data = data;
    setForm1Data(updatedForm1Data); // Update state
    if (form2Data) {
      // Use the current state of form2Data along with the new form1Data
      await sendDataToBackend(updatedForm1Data, form2Data);
    }
  };

  const submitForm2 = async (data) => {
    const updatedForm2Data = data;
    setForm2Data(updatedForm2Data); // Update state
    if (form1Data) {
      // Use the current state of form1Data along with the new form2Data
      await sendDataToBackend(form1Data, updatedForm2Data);
    }
  };

  const sendDataToBackend = async (data1, data2) => {
    if (!data1 || !data2) return;

    try {
      setError(null);
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form1Data: data1, form2Data: data2 }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const chartData = await response.json();
      setChartData(chartData);
    } catch (err) {
      setError('Failed to fetch chart data from backend.');
    }
  };

  // return (
  //   <div>
  //     <NumberForm formName="Form 1" onSubmit={submitForm1} />
  //     <NumberForm formName="Form 2" onSubmit={submitForm2} />

  //     {error && <p style={{ color: 'red' }}>{error}</p>}

  //     {chartData && <ChartComponent chartData={chartData} />}
  //   </div>
  // );
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputField />} />
        <Route path="/another" element={<NumberForm />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NumberForm({ formName, onSubmit }) {
  const [inputs, setInputs] = useState(['', '', '']); // 3 number inputs by default
  const [error, setError] = useState(null);

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs are numbers and not empty
    if (inputs.some(input => input === '' || isNaN(Number(input)))) {
      setError('Please enter valid numbers in all fields.');
      return;
    }
    setError(null);

    // Convert inputs to numbers
    const numericData = inputs.map(Number);

    try {
      await onSubmit(numericData);
    } catch (err) {
      setError('Failed to submit form data.');
    }
  };

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
      <h3>{formName}</h3>
      {inputs.map((value, idx) => (
        <input
          key={idx}
          type="number"
          value={value}
          onChange={(e) => handleChange(idx, e.target.value)}
          placeholder={`Number ${idx + 1}`}
          style={{ marginRight: '0.5rem' }}
          required
        />
      ))}
      <button type="submit">Submit {formName}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => navigate(-1)}>Go back</button>
    </form>
  );
}

export default NumberForm;

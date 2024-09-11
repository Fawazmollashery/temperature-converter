import React, { useState } from 'react';
import './App.css';  // Import the CSS file

function App() {
  const [value, setValue] = useState('');
  const [fromScale, setFromScale] = useState('Celsius');
  const [toScale, setToScale] = useState('Fahrenheit');
  const [result, setResult] = useState(null);

  const celsiusToFahrenheit = (celsius) => (celsius * 9/5) + 32;
  const celsiusToKelvin = (celsius) => celsius + 273.15;
  const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9;
  const fahrenheitToKelvin = (fahrenheit) => (fahrenheit - 32) * 5/9 + 273.15;
  const kelvinToCelsius = (kelvin) => kelvin - 273.15;
  const kelvinToFahrenheit = (kelvin) => (kelvin - 273.15) * 9/5 + 32;

  const convertTemperature = (value, fromScale, toScale) => {
    if (fromScale === 'Celsius') {
      if (toScale === 'Fahrenheit') return celsiusToFahrenheit(value);
      if (toScale === 'Kelvin') return celsiusToKelvin(value);
    } else if (fromScale === 'Fahrenheit') {
      if (toScale === 'Celsius') return fahrenheitToCelsius(value);
      if (toScale === 'Kelvin') return fahrenheitToKelvin(value);
    } else if (fromScale === 'Kelvin') {
      if (toScale === 'Celsius') return kelvinToCelsius(value);
      if (toScale === 'Fahrenheit') return kelvinToFahrenheit(value);
    }
    return value; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      const convertedValue = convertTemperature(numericValue, fromScale, toScale);
      setResult(`${numericValue}° ${fromScale} = ${convertedValue.toFixed(2)}° ${toScale}`);
    } else {
      setResult('Please enter a valid number');
    }
  };

  return (
    <div className="container">
      <h1>Temperature Converter</h1>
      <form onSubmit={handleSubmit} className="converter-form">
        <input 
          type="text" 
          placeholder="Enter temperature" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          className="input-field"
        />
        <div className="select-container">
          <div>
            <label>From: </label>
            <select value={fromScale} onChange={(e) => setFromScale(e.target.value)} className="select-box">
              <option value="Celsius">Celsius</option>
              <option value="Fahrenheit">Fahrenheit</option>
              <option value="Kelvin">Kelvin</option>
            </select>
          </div>
          <div>
            <label>To: </label>
            <select value={toScale} onChange={(e) => setToScale(e.target.value)} className="select-box">
              <option value="Celsius">Celsius</option>
              <option value="Fahrenheit">Fahrenheit</option>
              <option value="Kelvin">Kelvin</option>
            </select>
          </div>
        </div>
        <button type="submit" className="convert-btn">Convert</button>
      </form>
      {result && <h2 className="result">{result}</h2>}
    </div>
  );
}

export default App;

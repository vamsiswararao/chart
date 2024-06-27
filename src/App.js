import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import "./App.css"

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredData(data); // Initially show all data
      });
  }, []);

  const filterDataByTimeframe = (timeframe) => {
    // Filtering logic based on timeframe
    let filtered;
    switch (timeframe) {
      case 'daily':
        filtered = data; // Use actual filtering logic here
        break;
      case 'weekly':
        filtered = data.filter((_, index) => index % 7 === 0);
        break;
      case 'monthly':
        filtered = data.filter((_, index) => index % 30 === 0);
        break;
      default:
        filtered = data;
    }
    setFilteredData(filtered);
  };

  const handleClick = (data) => {
    alert(`Timestamp: ${data.timestamp}, Value: ${data.value}`);
  };

  return (
    <div style={{ width: '900px', height: 500 }}>
      <div className='App'>
        <button onClick={() => filterDataByTimeframe('daily')}>Daily</button>
        <button onClick={() => filterDataByTimeframe('weekly')}>Weekly</button>
        <button onClick={() => filterDataByTimeframe('monthly')}>Monthly</button>
      </div>
      <ResponsiveContainer>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            onClick={(e) => handleClick(e)}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;

import React from 'react';
import './styles/styles.css'; 
import JobList from './components/JobsList';

function App() {
  return (
    <div className="App">
      <h1>Job Listings</h1>
      <JobList />
    </div>
  );
}

export default App;


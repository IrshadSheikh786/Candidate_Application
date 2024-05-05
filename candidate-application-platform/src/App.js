import React, { useState } from 'react';
import './styles/styles.css'; 
import JobList from './components/JobsList';
import FilterBar from './components/fliter';

function App() {
  const [appliedFilters, setAppliedFilters] = useState({});

  const applyFilters = (filters) => {
    setAppliedFilters(filters);
  };

  return (
    <div className="App">
      <h1>Job Listings</h1>
      {/* <FilterBar applyFilters={applyFilters} /> */}
      <JobList appliedFilters={appliedFilters} />
    </div>
  );
}

export default App;

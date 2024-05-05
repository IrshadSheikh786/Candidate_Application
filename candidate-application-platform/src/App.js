import React, { useState, useEffect } from 'react';
import './App.css';
import CardList from './components/CardList/CardList';
import JobFilter from './components/JobFilter/JobFilter';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    remote: '',
    techStack: '',
    role: '',
    minExperience: '',
    minBasePay: '',
    companyName: ''
  });
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ limit, offset }),
        });
        const data = await response.json();
        if (data && data.jdList && data.jdList.length > 0) {
          setJobs(prevJobs => [...prevJobs, ...data.jdList]);
          setOffset(offset + limit);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [limit, offset]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMoreJobs();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [jobs]);

  const loadMoreJobs = async () => {
    if (!hasMore) return;

    try {
      const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ limit, offset: offset + limit }),
      });
      const data = await response.json();

      if (data && data.jdList && data.jdList.length > 0) {
        setJobs(prevJobs => [...prevJobs, ...data.jdList]);
        setOffset(offset + limit);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const filteredJobs = jobs.filter(job => {
    return (
      (!filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.remote || job.location.toLowerCase() === 'remote' || job.location.toLowerCase() === filters.location.toLowerCase()) &&
      (!filters.techStack || job.jobRole.toLowerCase() === filters.techStack.toLowerCase()) &&
      (!filters.role || job.jobRole.toLowerCase() === filters.role.toLowerCase()) &&
      (!filters.minExperience || (job.minExp !== null && job.minExp >= parseInt(filters.minExperience))) &&
      (!filters.minBasePay || (job.minJdSalary !== null && job.minJdSalary >= parseInt(filters.minBasePay))) &&
      (!filters.companyName || job.companyName.toLowerCase().includes(filters.companyName.toLowerCase()))
    );
  });

  return (
    <div className="App">
      <JobFilter filters={filters} setFilters={setFilters} jobs={jobs} />
      <CardList jobs={filteredJobs} />
      {hasMore && <p>Loading more jobs...</p>}
    </div>
  );
}

export default App;

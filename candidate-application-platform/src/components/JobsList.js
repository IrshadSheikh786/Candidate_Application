import React, { useState, useEffect, useRef } from 'react';
import JobCard from './JobCard';
import '../styles/styles.css';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const limit = useRef(10); // Initial limit

  useEffect(() => {
    setIsLoading(true);
    fetchJobs({ limit: limit.current, offset: 0 })
      .then(({ jdList, totalCount }) => {
        setJobs(jdList);
        setTotalCount(totalCount);
        setHasMore(jdList.length < totalCount); // Check if there are more jobs to load
      })
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(page => page + 1);
      }
    }, { threshold: 1 });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

  useEffect(() => {
    if (page > 1) {
      setIsLoading(true);
      fetchJobs({ limit: limit.current, offset: (page - 1) * limit.current })
        .then(({ jdList }) => {
          setJobs(prevJobs => [...prevJobs, ...jdList]);
          setHasMore(jdList.length < totalCount); // Check if there are more jobs to load
        })
        .catch(error => console.error('Error fetching more data:', error))
        .finally(() => setIsLoading(false));
    }
  }, [page, totalCount]);

  const fetchJobs = async ({ limit, offset }) => {
    try {
      const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ limit, offset })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch jobs data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return { jdList: [], totalCount: 0 };
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      // Increase the limit when user reaches the bottom of the page
      limit.current += 10;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="job-list">
      <h2>Total Jobs: {totalCount}</h2>
      <div className="job-grid">
        {jobs.map((job, index) => (
          <JobCard key={job.jdUid} job={job} />
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
      {hasMore && (
        <div ref={loader} style={{ margin: '20px 0', textAlign: 'center' }}>
          <p>Loading more...</p>
        </div>
      )}
      {!hasMore && <p>No more jobs to load</p>}
    </div>
  );
}

export default JobList;

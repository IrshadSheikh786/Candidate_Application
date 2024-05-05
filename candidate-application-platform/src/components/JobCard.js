import React, { useState } from 'react';
import '../styles/styles.css';

function JobCard({ job }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="job-card">
      <div className="company-info">
        <img src={job.logoUrl} alt={job.companyName} className="company-logo" />
        <p className="company-name">{job.companyName}</p>
      </div>
      <div className="job-header">
        <h2>{job.jobRole}</h2>
      </div>
      <div className="job-body">
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Experience:</strong> {job.minExp || 'N/A'} - {job.maxExp || 'N/A'} years</p>
        <p>
          <strong>Description:</strong> 
          {expanded ? job.jobDetailsFromCompany : job.jobDetailsFromCompany.slice(0, 100) + '...'}
          <button onClick={toggleExpand} className="expand-btn">
            {expanded ? 'Read Less' : 'Read More'}
          </button>
        </p>
      </div>
      <div className="job-footer">
        <a href={job.jdLink} target="_blank" rel="noopener noreferrer" className="apply-btn">Apply Now</a>
      </div>
    </div>
  );
}

export default JobCard;
import React, { useState } from 'react';

const Card = ({ job }) => {
  const {
    companyName,
    location,
    jobRole,
    jobDetailsFromCompany,
    minExp,
    maxExp,
    minJdSalary,
    maxJdSalary,
    salaryCurrencyCode,
    logoUrl,
  } = job;
  const truncatedDescription = jobDetailsFromCompany.split(' ').slice(0, 30).join(' ');
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <li className="cards_item">
      <div className="card">
        <div className="card_image">
          <img src={logoUrl} alt={companyName} />
        </div>
        <div className="card_content">
          <h2 className="card_title">{companyName}</h2>
          {/* <p >{truncatedDescription}</p> */}
          <p className="card_text">
          
          {expanded ? job.jobDetailsFromCompany : job.jobDetailsFromCompany.slice(0, 100) + '...'}
          <button onClick={toggleExpand} className="expand-btn">
            {expanded ? 'Read Less' : 'Read More'}
          </button>
        </p>
          <p>Location: {location}</p>
          <p>Job Role: {jobRole}</p>
          <p>Experience: {minExp} - {maxExp} years</p>
          <p>Salary: {minJdSalary ? `$${minJdSalary} - ${maxJdSalary}` : 'Not specified'} {salaryCurrencyCode}</p>
          <button className="btn card_btn">Apply</button>
        </div>
      </div>
    </li>
  );
};

export default Card;

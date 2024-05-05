import React, { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel ,TextField} from '@material-ui/core';

const JobFilter = ({ filters, setFilters ,jobs}) => {
  // Destructure filter properties with default values
  const {
    minExperience = '',
    companyName = '',
    location = '',
    remote = '',
    techStack = '',
    role = '',
    minBasePay = '',
  } = filters || {};
  const [uniqueRoles, setUniqueRoles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFilters({ ...filters, [name]: value }); 
  };


  useEffect(() => {
    const rolesSet = new Set(jobs.map((job) => job.jobRole));
    const uniqueRolesArray = Array.from(rolesSet);
    setUniqueRoles(uniqueRolesArray); 
    
  }, [jobs]);
  
  const uniqueMinExperiences = Array.from(
    new Set(jobs.map((job) => job.minExp))
  ).filter((exp) => exp !== null && exp !== undefined);
  
  const basePayOptions = Array.from(
    new Set(jobs.map((job) => job.minJdSalary))
  ).filter((salary) => salary !== null && salary !== undefined);
  
  const experienceOptions = [
    { value: '', label: 'Any' },
    ...uniqueMinExperiences.map((exp) => ({
      value: exp.toString(),
      label: `${exp} ${exp === 1 ? 'year' : 'years'}`,
    })),
  ];
  return (
    <div className="filters">
    

      <FormControl variant="outlined" className="filter-control">
        <InputLabel id="remote-label">Remote/On-site</InputLabel>
        <Select
          labelId="remote-label"
          id="remote"
          name="remote"
          value={remote}
          style={{ width: 170 }} 
          onChange={handleChange}
          label="Remote/On-site"
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="remote">Remote</MenuItem>
          <MenuItem value="onsite">On-site</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" className="filter-control">
        <InputLabel id="location-label">Location</InputLabel>
        <Select
          labelId="location-label"
          id="location"
          name="location"
          value={location}
          style={{ width: 170 }} 
          onChange={handleChange}
          label="Location"
        >
          <MenuItem value="">Any</MenuItem>
          {jobs.reduce((locations, job) => {
            if (!locations.includes(job.location)) {
              locations.push(job.location);
            }
            return locations;
          }, []).map((loc) => (
            <MenuItem key={loc} value={loc}>
              {loc}
            </MenuItem>
          ))}
        </Select>
      </FormControl>


      <FormControl variant="outlined" className="filter-control">
        <InputLabel id="techStack-label">Tech Stack</InputLabel>
        <Select
          labelId="techStack-label"
          id="techStack"
          name="techStack"
          value={techStack}
          style={{ width: 170 }} 
          onChange={handleChange}
          label="Tech Stack"
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="react">React</MenuItem>
          <MenuItem value="node">Node.js</MenuItem>
          <MenuItem value="python">Python</MenuItem>
          {/* Add more tech stack options as needed */}
        </Select>
      </FormControl>

      <FormControl variant="outlined" className="filter-control">
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          name="role"
          value={role}
          style={{ width: 170 }} 
          onChange={handleChange}
          label="Role"
        >
          <MenuItem value="">Any</MenuItem>
          {uniqueRoles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" className="filter-control">
        <InputLabel id="minExperience-label">Min Experience</InputLabel>
        <Select
          labelId="minExperience-label"
          id="minExperience"
          name="minExperience"
          value={filters.minExperience || ''}
          style={{ width: 170 }} 
          onChange={handleChange}
          label="Min Experience"
        >
          {experienceOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    <FormControl variant="outlined" className="filter-control">
        <InputLabel id="minBasePay-label">Min Base Pay</InputLabel>
        <Select
          labelId="minBasePay-label"
          id="minBasePay"
          name="minBasePay"
          value={minBasePay || ''}
          style={{ width: 170 }} 
          onChange={handleChange}
          label="Min Base Pay"
        >
          {basePayOptions.map((salary) => (
            <MenuItem key={salary} value={salary}>
              ${salary.toLocaleString()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" className="filter-control">
        <InputLabel id="companyName-label">Company Name</InputLabel>
        <Select
          labelId="companyName-label"
          id="companyName"
          name="companyName"
          value={companyName}
          onChange={handleChange}
          style={{ width: 170 }} 
          label="Company Name"
        >
          <MenuItem value="">Any</MenuItem>
          {jobs.map((job) => (
            <MenuItem key={job.companyName} value={job.companyName}>
              {job.companyName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default JobFilter;

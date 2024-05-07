import Button from "@mui/material/Button";
import React, { useState } from "react";
const Card = ({ job }) => {
  const {
    companyName,
    location,
    jobRole,
    // jobDetailsFromCompany,
    minExp,
    maxExp,
    minJdSalary,
    maxJdSalary,
    salaryCurrencyCode,
    logoUrl,
  } = job;
  // const truncatedDescription = jobDetailsFromCompany
  //   .split(" ")
  //   .slice(0, 30)
  //   .join(" ");
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <li className="cards_item">
      <div className="card">
        <div className="card_image">
          <img src={logoUrl} alt={companyName} />
          <div className="card_items">
            <h4 className="">{companyName}</h4>
            <p> {jobRole}</p>
            <p>{location}</p>
          </div>
        </div>

        <div className="card_content">
          <p className="card_items">
            Estimated Salary:{" "}
            {minJdSalary ? `$${minJdSalary} - ${maxJdSalary}` : "Not specified"}{" "}
            {salaryCurrencyCode}
          </p>
          <p className="card_text">
            <h4 className="">About Company :</h4>
            <h5 className="">About Us</h5>

            {expanded
              ? job.jobDetailsFromCompany
              : job.jobDetailsFromCompany.slice(0, 100) + "..."}
          </p>
          <Button onClick={toggleExpand} className="expand-btn">
            {expanded ? "Read Less" : "view job"}
          </Button>
          <p className="card_items">
            Minimum Experience
            <span className="exp_heading">{minExp} years</span>
          </p>

          <Button
            style={{
              width: "100%",
              maxWidth: "300px",
              height: "50px",
              color: "#36454F",
              borderRadius: "10px",
              backgroundColor: "rgb(63, 221, 157)",
              padding: "0 20px",
              fontSize: "16px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Apply
          </Button>
          <div className="btn_custom_ref">
            <Button
              variant="contained"
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "50px",
                borderRadius: '10px',
                padding: "0 20px",
                fontSize: "16px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "#ffffff",
              }}
            >
              Unlock referral asks
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;

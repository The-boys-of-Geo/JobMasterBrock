
import React, { useState } from 'react';

interface JobCardProps {
  id: number;
  datePosted: string;
  title: string;
  company: string;
  location: string;
  description: string;
  remote: boolean;
  requirements: string;
  salary: number;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  datePosted,
  title,
  company,
  location,
  description,
  remote,
  requirements,
  salary,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <h2>{title}</h2>
      <p>{company}</p>
      <p>{location}</p>
      <p>{salary}</p>
      <p>{datePosted}</p>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Hide Details' : 'View Details'}
      </button>
      {isExpanded && (
        <div>
          <p>{description}</p>
          <p>{requirements}</p>
          <p>{remote ? 'Remote' : 'Not remote'}</p>
        </div>
      )}
    </div>
  );
};

export default JobCard;


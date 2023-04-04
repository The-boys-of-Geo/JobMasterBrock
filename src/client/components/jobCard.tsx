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
  easyApply: boolean;
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
  easyApply,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const onInterested = async () => {
    try {
      const response = await fetch('/interested', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId: id }),
      });

      if (response.ok) {
        console.log('Job successfully added to interested list');
      } else {
        console.log('Failed to add job to interested list');
      }
    } catch (error) {
      console.error('Error occurred while adding job to interested list:', error);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>{company}</p>
      <p>{location}</p>
      <p>{salary}</p>
      <p>{datePosted}</p>
      {easyApply && <p>Easy Apply</p>}
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
      <button onClick={onInterested}>Interested</button>
    </div>
  );
};

export default JobCard;



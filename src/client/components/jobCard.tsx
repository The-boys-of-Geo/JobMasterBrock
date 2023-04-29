import React, { useState } from 'react';
import type { JobFeedProps } from '../containers/jobFeedContainer';

interface JobCardProps {
  Title: string;
  Company: string;
  Location: string;
  Link: string;
  DatePosted: string;
  TimePosted: string;
  ID: number;
}

const JobCard: React.FC<JobCardProps> = ({
  Title,
  Company,
  Location,
  Link,
  TimePosted,
  DatePosted,
  ID,
  }) => {

  const [details, setDetails] = useState('');

  const onInterested = async () => {
    try {
      const response = await fetch('api/user/interested', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId: ID }),
      });

      if (response.ok) {
        console.log('Job successfully added to interested list');
      } else {
        console.log('Failed to add job to interested list');
      }
    } catch (error) {
      console.error('Error occurred while adding job to interested list:', error.response.data);
    }
  };

  const showDetails = async(jobID:number) => {
    try {
      const response = await fetch(`getLinkedInData/?jobID=${jobID}`, {
        method: 'GET',
      });
      const data = await response.text();
      setDetails(data);
    } catch (error) {
      console.error('Error occurred while adding job to interested list:', error);
    }
  }

  return (
    <div className='JobCard' onClick={() => showDetails(ID)} details={details}>
      <div className='JobCardInner'>
        <a href={Link}>{Title}</a>
        <p>{Company}</p>
        <p>{Location}</p>
        <p>{DatePosted} {TimePosted ?`(${TimePosted})` : null}</p>
        <button id='interestedButton' onClick={onInterested}>Interested</button>
      </div>
    </div>
  );
};

export default JobCard;



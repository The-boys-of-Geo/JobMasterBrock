import React, { useState } from 'react';
import type { JobFeedProps } from '../containers/jobFeedContainer';

interface JobCardProps {
  Title: string;
  Company: string;
  Location: string;
  Link: string;
  DatePosted: string;
  ID: number;
  handleDetailRequest: (jobID: number) => Promise<void>
}

const JobCard: React.FC<JobCardProps> = ({
  Title,
  Company,
  Location,
  Link,
  DatePosted,
  ID,
  handleDetailRequest
  }) => {

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
      console.error('Error occurred while adding job to interested list:', error);
    }
  };

  return (
    
    

    <div className='JobCard'>
      <div className='JobCardInner'>
        <a href={Link}>{Title}</a>
        <p>{Company}</p>
        <p>{Location}</p>
        <p>{DatePosted}</p>
        <button id='interestedButton' onClick={onInterested}>Interested</button>
        <button id='detailsButton' 
          onClick={
            (event) => {
              event.preventDefault()
              handleDetailRequest(ID);
            }}
        >Details</button>
      </div>
    </div>
  );
};

export default JobCard;



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
  onClick?: (ID: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  Title,
  Company,
  Location,
  Link,
  TimePosted,
  DatePosted,
  ID,
  onClick
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
      console.error('Error occurred while adding job to interested list:', error.response.data);
    }
  };
  const showDetails = (event: any) => {
    onClick(event.currentTarget.id);
  }

  return (
    <div className='JobCard' onClick={showDetails} id={`${ID}`}>
      <div className='JobCardInner'>
        <a href={Link} target='_blank' rel='noreferrer noopener'>{Title}</a>
        <p>{Company}</p>
        <p>{Location}</p>
        <p>{DatePosted} {TimePosted ?`(${TimePosted})` : null}</p>
        <button id='interestedButton' onClick={onInterested}>Interested</button>
      </div>
      <div>

      </div>
    </div>
  );
};

export default JobCard;



// jobFeedContainer.tsx
import React, { useState } from 'react';
// import JobCard from '../components/JobCard.tsx';
import JobCard from '../components/jobCard';
import { searchBody } from '../pages/JobPage';

export interface JobFeedProps {
  jobs: any[]
  handleSearchSubmit: (jobSearch: searchBody) => Promise<void>
  jobsQuery: any
  count: number
}

interface Job {
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


const JobFeedContainer: React.FC<JobFeedProps> = ( { handleSearchSubmit, jobs, jobsQuery, count } ) => {
  


  //example job added
  return (
    <div>
      
      
    </div>
  );
};

export default JobFeedContainer;

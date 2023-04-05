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
interface JobCardProps {
  Title: string;
  Company: string;
  Location: string;
  Link: string;
  DatePosted: string;
  ID: number;

}


const JobFeedContainer: React.FC<JobFeedProps> = ( { handleSearchSubmit, jobs, jobsQuery, count } ) => {
  


  //example job added
  return (
    <div className='JobCardFeed'>
      {jobs.map((e)=>{
       return (
       <JobCard Title='s' Company='' Location='' Link='' DatePosted='' ID={65}/>
     );})}
      
    </div>
  );
};

export default JobFeedContainer;

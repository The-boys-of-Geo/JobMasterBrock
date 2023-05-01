// jobFeedContainer.tsx
import React, { useState, useEffect } from 'react';
// import JobCard from '../components/JobCard.tsx';
import JobCard from '../components/jobCard';
import { searchBody } from '../pages/JobPage';

export interface JobFeedProps {
  jobs: any[]
  handleSearchSubmit: (jobSearch: searchBody) => Promise<void>
  jobsQuery: any
  count: number
  onScroll?: () => void;
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
  pokemonData: {
    front_default: string;
    back_default: string;
  };
}



const JobFeedContainer: React.FC<JobFeedProps> = ( { jobs, onScroll } ) => {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (event: any) => {
    const div = event.currentTarget;
    setScrollTop(div.scrollTop);
    if(Math.abs(div.scrollHeight - div.clientHeight - div.scrollTop) < 50) {
      onScroll();
    }
  };

  return (
    
    <div className='JobCardFeed' onScroll={handleScroll}>
      {jobs.map((job)=>{
       return (
        <JobCard
        Title={job.Title}
        Company={job.Company}
        Location={job.Location}
        Link={job.Link}
        DatePosted={job.DatePosted}
        ID={job.ID}
        key={job.ID}
      />
     )})}      
    </div>
  );
};

export default JobFeedContainer;

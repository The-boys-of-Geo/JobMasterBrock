import React ,{ useState, useEffect, Dispatch, SetStateAction } from 'react';
import JobFeedContainer from "../containers/jobFeedContainer";
import type { JobFeedProps } from '../containers/jobFeedContainer';
import { Header, JobSheet } from '../components/Components';
//import type { JobSheetProps } from '../containers/jobFeedContainer';

export type JobSheetProps = {
  jobs: any[];
}

export type searchBody = {
  search: string,
  location: string,
  time: number,   //<-- 1hr
  count: number, //<-- where you are in the search results. First one is 0 and increment by 1 each time
  jobType:{
    FT: boolean,
    PT: boolean,
    C: boolean,
    I: boolean,
  }
}


export const JobPage: React.FC = () => {
  const [jobs, setJobs] = useState([]);
  const [jobsQuery, setJobsQuery] = useState(null);
  const [count, setCount] = useState(0);
  

  const handleSearchSubmit = async (jobSearch: searchBody) => {
    setJobsQuery(jobSearch);
    try {
      const response = await fetch('/api/search/getLinkedInData', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobSearch)
      });
      if (response.ok) {
        const jobs = await response.json();
        console.log(`jobs`, jobs)
        
        setJobs(jobs);
      } else {
        console.log(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.log(error, `catch block error`)
    }
  };
 

  return (
    <div className='JobPage'>
      <Header 
        handleSearchSubmit={handleSearchSubmit}
        setJobs={setJobs}
      />
      <JobFeedContainer 
        jobs={jobs}
        handleSearchSubmit={handleSearchSubmit}
        jobsQuery={jobsQuery}
        count={count}
      />
      <JobSheet />
    </div>
  )
};




// export interface JobFeedProps {
//   jobs: any[]
// }
// export interface JobSheetProps {
//   handleSearchSubmit: (useSearchParms: URLSearchParams) => Promise<void>
// }
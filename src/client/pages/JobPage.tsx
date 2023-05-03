import React, { useState } from 'react';
import JobFeedContainer from "../containers/jobFeedContainer";
// import type { JobFeedProps } from '../containers/jobFeedContainer';
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

export const JobSheetContext = React.createContext(null);

export const JobPage: React.FC = () => {
  const [jobs, setJobs] = useState([]);
  const [jobsQuery, setJobsQuery] = useState(null);
  const [count, setCount] = useState(0);
  const [jobsLoaded, setJobsLoaded] = useState(false);
  const [keepSearching, setKeepSearching] = useState(true);
  const [jobDetails, setJobDetails] = useState('');
  

  const handleSearchSubmit = async (jobSearch: searchBody) => {
    setCount(count + 1);
    jobSearch.count = count;
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
        const newJobs = await response.json();
        const filteredJobs = newJobs.filter((newJob: any) => {
          return !jobs.some((job) => job.ID === newJob.ID);
        });
        if(!filteredJobs.length) {
          setKeepSearching(false);
        }
        const updatedJobs = [...jobs, ...filteredJobs];
        setJobs(updatedJobs);
        setTimeout(() => {
          setJobsLoaded(false);
        }, 4000)
      } else {
        console.log(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.log(error, `catch block error`)
    }
  };

  const onBottomScroll = () => {
    //load 25 more when near bottom and more available
    if(!jobsLoaded && keepSearching) {
      setJobsLoaded(true);
      handleSearchSubmit(jobsQuery)
    }
  }

  const onClickDetails = async (ID: number) => {

    try {
      const response = await fetch(`/api/search/getLinkedInData/${ID}`, {
        method: 'GET',
      });
      const data = await response.text();
      setJobDetails(data);
    } catch (error) {
      console.error('Error occurred while adding job to interested list:', error);
    }
  }
 
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
        onScroll={onBottomScroll}
        onClick={onClickDetails}
      />
      <JobSheetContext.Provider value={jobDetails}>
        <JobSheet />
      </JobSheetContext.Provider>
    </div>
  )
};




// export interface JobFeedProps {
//   jobs: any[]
// }
// export interface JobSheetProps {
//   handleSearchSubmit: (useSearchParms: URLSearchParams) => Promise<void>
// }
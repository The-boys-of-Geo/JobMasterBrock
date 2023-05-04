import React, { useState } from 'react';
import JobFeedContainer from '../containers/jobFeedContainer';
import { JobCardProps } from '../components/jobCard';
import { Header, JobSheet } from '../components/Components';

export type searchBody = {
  search: string;
  location: string;
  time: number; //<-- 1hr
  count: number; //<-- where you are in the search results. First one is 0 and increment by 1 each time
  jobType: jobType;
};

interface jobType {
  FT: boolean;
  PT: boolean;
  C: boolean;
  I: boolean;
}

interface jobDetails {
  html: string;
  job: JobCardProps;
}

export const JobSheetContext = React.createContext(null);
export const JobFeedContainerContext = React.createContext(null);
export const HeaderContext = React.createContext(null);

export const JobPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const [jobsQuery, setJobsQuery] = useState<searchBody>();
  const [jobsLoaded, setJobsLoaded] = useState<boolean>(false);
  const [keepSearching, setKeepSearching] = useState<boolean>(true);
  const [jobDetails, setJobDetails] = useState<jobDetails>({html: null, job: null});

  const handleSearchSubmit = async (jobSearch: searchBody) => {
    setJobsQuery(jobSearch);
    let currJobs = jobs;
    if(jobSearch.count === 0) {
      setJobs([]);
      setKeepSearching(true);
      currJobs = [];
    }
    setJobsQuery(jobSearch);
    try {
      const response = await fetch('/api/search/getLinkedInData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobSearch),
      });
      if (response.ok) {
        const newJobs = await response.json();
        const filteredJobs = newJobs.filter((newJob: any) => {
          return !jobs.some((job) => job.ID === newJob.ID);
        });
        if (!filteredJobs.length) {
          setKeepSearching(false);
        }
        const updatedJobs = [...currJobs, ...filteredJobs];
        setJobs(updatedJobs);
        setTimeout(() => {
          setJobsLoaded(false);
        }, 4000);
      } else {
        console.log(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.log(error, `catch block error`);
    }
  };

  return (
    <div className="JobPage">
      <HeaderContext.Provider value={{ handleSearchSubmit }}>
        <Header />
      </HeaderContext.Provider>

      <JobFeedContainerContext.Provider
        value={{
          jobs,
          setJobDetails,
          jobsLoaded,
          setJobsLoaded,
          keepSearching,
          jobsQuery,
          handleSearchSubmit,
        }}
      >
        <JobFeedContainer />
      </JobFeedContainerContext.Provider>

      <JobSheetContext.Provider value={{jobDetails, jobs}}>
        <JobSheet />
      </JobSheetContext.Provider>
    </div>
  );
};

// export interface JobFeedProps {
//   jobs: any[]
// }
// export interface JobSheetProps {
//   handleSearchSubmit: (useSearchParms: URLSearchParams) => Promise<void>
// }

// jobFeedContainer.tsx
import React, { useContext, UIEvent, useEffect } from 'react';
// import JobCard from '../components/JobCard.tsx';
import JobCard, { JobCardProps } from '../components/jobCard';
import { JobFeedContainerContext } from '../pages/JobPage';

const JobFeedContainer: React.FC = () => {
  const {
    jobs,
    jobsLoaded,
    setJobsLoaded,
    keepSearching,
    jobsQuery,
    handleSearchSubmit,
  } = useContext(JobFeedContainerContext);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const div = e.currentTarget;
    if (Math.abs(div.scrollHeight - div.clientHeight - div.scrollTop) < 50) {
      onBottomScroll();
    }
  };
  
  useEffect(()=> {
    const div = document.getElementsByClassName('JobCardFeed');
    if (Math.abs(div[0].scrollHeight - div[0].clientHeight - div[0].scrollTop) < 50 && jobs.length) {
      onBottomScroll();
    }
  },[jobsLoaded])

  const onBottomScroll = () => {
    //load 25 more when near bottom and more available
    if (!jobsLoaded && keepSearching) {
      setJobsLoaded(true);
      const currJobsQuery = Object.assign(jobsQuery, { count: ++jobsQuery.count })
      console.log('currJobsQuery: ', currJobsQuery);
      handleSearchSubmit(currJobsQuery);
    }
  };

  return (
    <div className="JobCardFeed" onScroll={handleScroll}>
      {jobs.map((job: JobCardProps) => {
        return (
          <JobCard
            Title={job.Title}
            Company={job.Company}
            Location={job.Location}
            Link={job.Link}
            DatePosted={job.DatePosted}
            TimePosted={job.TimePosted}
            ID={job.ID}
            key={job.ID}
          />
        );
      })}
    </div>
  );
};

export default JobFeedContainer;

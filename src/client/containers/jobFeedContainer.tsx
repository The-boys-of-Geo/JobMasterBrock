// jobFeedContainer.tsx
import React, { useContext } from 'react';
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

  const handleScroll = (event: any) => {
    const div = event.currentTarget;
    if (Math.abs(div.scrollHeight - div.clientHeight - div.scrollTop) < 50) {
      onBottomScroll();
    }
  };
  const onBottomScroll = () => {
    //load 25 more when near bottom and more available
    if (!jobsLoaded && keepSearching) {
      setJobsLoaded(true);
      handleSearchSubmit(jobsQuery);
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

// jobFeedContainer.tsx
import React, { useState } from 'react';
import JobCard from '../components/jobCard';

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
}

const JobFeedContainer: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const handleAddJob = (job: Job) => {
    setJobs([...jobs, job]);
  };
//example job added
  return (
    <div>
      <h1>Job Feed</h1>
      <button onClick={() => handleAddJob({
        id: 1,
        datePosted: 'April 1, 2023',
        title: 'React Developer',
        company: 'Acme Co.',
        location: 'Remote',
        description: 'We are seeking a talented React developer to join our team.',
        remote: true,
        requirements: 'Minimum 3 years experience with React.',
        salary: 80000,
      })}>Add Job</button>
      {jobs.map(job => (
        <JobCard
          key={job.id}
          id={job.id}
          datePosted={job.datePosted}
          title={job.title}
          company={job.company}
          location={job.location}
          description={job.description}
          remote={job.remote}
          requirements={job.requirements}
          salary={job.salary}
        />
      ))}
    </div>
  );
};

export default JobFeedContainer;

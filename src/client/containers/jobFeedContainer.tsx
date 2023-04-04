// jobFeedContainer.tsx
import React, { useState } from 'react';
// import JobCard from '../components/JobCard.tsx';
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
  easyApply: boolean;
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
        easyApply: true,
      })}>Add Job</button>
      {jobs.map(job => (
        <div key={job.id}>
          <h2>{job.title}{job.easyApply && <span style={{ fontWeight: 'bold' }}>EasyApply</span>}</h2>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.salary}</p>
          <p>{job.datePosted}</p>
          <button onClick={() => console.log('Interested clicked')}>Interested</button>
          {job.description && (
            <div>
              <p>{job.description}</p>
              <p>{job.requirements}</p>
              <p>{job.remote ? 'Remote' : 'Not remote'}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobFeedContainer;

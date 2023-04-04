import React ,{ useState, useEffect } from 'react';
import JobFeedContainer from "../containers/jobFeedContainer";
import { Header, JobSheet } from '../components/Components';

export const JobPage: React.FC = () => {


  return (
    <div>
      <Header />
      <JobFeedContainer />
      <JobSheet />
    </div>
  )
}
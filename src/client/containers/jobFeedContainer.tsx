import React from "react";
import  JobCard from "../components/jobCard"; 


// interface Job {
//         id: number,
//         datePosted : number,
//         title: string,
//         company: string, 
//         location: string, 
//         description: string,
//         remote: boolean,
//         requirements: string, 
//         salary: number
// }
//render jobCard into the feed container 
interface jobFeedContainerProps {
    jobCards: JobCard[];
}
// const JobFeedContainer = ({jobCards}: jobFeedContainerProps) => {
//   const fakeJob = {
//     id: 1,
//     datePosted : Date.now(),
//     title: 'Software Engineer',
//     company: 'Raytheon', 
//     location: 'Oklahoma', 
//     description: 'building bombs',
//     remote: false,
//     requirements: 'javascript', 
//     salary: 300000
//   };
//testjobs 


  const JobFeedContainer = ({ jobCards }: jobFeedContainerProps) => {
    return (
      <div className="job-feed-container">
        {jobCards.map((jobCard) => (
          <JobCard key={jobCard.title} jobCard={jobCard} />
        ))}
      </div>
    );
  };


module.exports = JobFeedContainer;
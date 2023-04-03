import React from "react";

//define two interfaces 
//#1 jobCard 
export interface JobCard {
        id: number,
        datePosted : number,
        title: string,
        company: string, 
        location: string, 
        description: string,
        remote: boolean,
        requirements: string, 
        salary: number
    }
//#2 jobCardProps - props that jobCard will accept
export interface jobCardProps{
    jobCard: JobCard;
}

//declare job card function 
export const JobCard = ({jobCard}: jobCardProps) =>{
    return (
    <div className = 'job-card'>
        <h1>{jobCard.title}</h1>
        <h2>{jobCard.company}</h2>
        <h2>{jobCard.datePosted}</h2>
        <p>{jobCard.location}</p>
        <p>{jobCard.description}</p>
        <p>{jobCard.remote}</p>
        <p>{jobCard.requirements}</p>
        <p>{jobCard.salary}</p>
    </div>
    );
}

export default JobCard;
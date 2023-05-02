import React from 'react';

export interface JobFeedProps {
  jobs: any[];
}
export interface JobSheetProps {
  jobDetails: string
}

//define header component
export const JobSheet: React.FC<JobSheetProps> = ({ jobDetails }) => {
  //render components Jobs and search bar
  return (
    <div className="JobSheet">
      <td dangerouslySetInnerHTML={{__html: jobDetails}} />
    </div>
  );
};

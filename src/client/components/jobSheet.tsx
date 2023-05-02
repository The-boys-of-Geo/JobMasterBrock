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
    <table>
    <tbody>
    <tr>
      <td dangerouslySetInnerHTML={{__html: jobDetails}} className="JobSheet"/>
    </tr>
    </tbody>
      </table>
  );
};

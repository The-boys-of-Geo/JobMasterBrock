import React, { useEffect, useState } from 'react';

export interface JobFeedProps {
  jobs: any[]
}
export interface JobSheetProps {
  handleSearchSubmit: (useSearchParms: URLSearchParams) => Promise<void>
}
//define header component
export const JobSheet: React.FC = () => {
  
  //render components Jobs and search bar
    return (
      <div className="JobSheet">
        <div className='JobSheetInner'>
          <h1>JOB SHEET COMPONENT</h1>
        </div>
      </div>
    );
  };
import React, { useEffect, useState } from 'react';

export interface JobFeedProps {
  jobs: any[];
}
export interface JobSheetProps {
  // handleSearchSubmit: (useSearchParms: URLSearchParams) => Promise<void>,
  detailJob: String
}

//define header component
export const JobSheet: React.FC<JobSheetProps> = ({detailJob}) => {
  //render components Jobs and search bar
  return (
    <div className="JobSheet">
      <div className="JobSheetInner">
        {detailJob}
      </div>
    </div>
  );
};

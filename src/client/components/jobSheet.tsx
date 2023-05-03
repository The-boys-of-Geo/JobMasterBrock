import React, { useContext } from 'react';
import { JobSheetContext } from '../pages/JobPage';

//define header component
export const JobSheet: React.FC = () => {
  const jobDetails = useContext(JobSheetContext);
  //render components Jobs and search bar
  return (
    <table>
      <tbody>
        <tr>
          {/* dangerous bc it is vulnerable to cross-site scripting attacks when fetching data from third party sources(linkedin is trustworthy so no issue) or rendering content submitted by users */}
          <td dangerouslySetInnerHTML={{__html: jobDetails}} className="JobSheet"/>
        </tr>
      </tbody>
    </table>
  );
};

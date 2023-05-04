import React, { useContext } from 'react';
import { JobSheetContext } from '../pages/JobPage';

//define header component
export const JobSheet: React.FC = () => {
  const { jobDetails } = useContext(JobSheetContext);
  console.log(jobDetails.job);
  //render components Jobs and search bar
  return (
    <div className="JobSheet">
      {jobDetails.job ? (
        <div>
          <h1 id="JobTitle">
            <a
              href={jobDetails.job.Link}
              target="_blank"
              rel="noreferrer noopener"
            >
              {jobDetails.job.Title}
            </a>
          </h1>
          <h3 id="Company">{jobDetails.job.Company}</h3>
          <h3 id="Location">{jobDetails.job.Location}</h3>
        </div>
      ) : null}
      <table>
        <tbody>
          <tr>
            {/* dangerous bc it is vulnerable to cross-site scripting attacks when fetching data from third party sources(linkedin is trustworthy so no issue) or rendering content submitted by users */}
            <td dangerouslySetInnerHTML={{ __html: jobDetails.html }} />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

import React,{ useState } from "react";

//define props for header components
interface HeaderProps {};

interface JobsProps {
    selectedJob: string;
    handleJobChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  };
//define header component
const Header: React.FC<HeaderProps> = () => {
  const [selectedJob, setSelectedJob] = useState("Your Jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchJobType, setSearchJobType] = useState("");
  const [searchDatePosted, setSearchDatePosted] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRemote, setSearchRemote] = useState(false);
//jobChange functional expression to ypdate state variable for selected Job
  const handleJobChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedJob(event.target.value);
  };
//switch cases to handle state variables that are changed
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "searchQuery":
        setSearchQuery(event.target.value);
        break;
      case "searchLocation":
        setSearchLocation(event.target.value);
        break;
      case "searchJobType":
        setSearchJobType(event.target.value);
        break;
      case "searchDatePosted":
        setSearchDatePosted(event.target.value);
        break;
      case "searchTitle":
        setSearchTitle(event.target.value);
        break;
      case "searchRemote":
        setSearchRemote(event.target.checked);
        break;
    }
  };
//handle search form submission 
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform search
  };
//render components Jobs and search bar
  return (
    <div className="header">
      <Jobs selectedJob={selectedJob} handleJobChange={handleJobChange} />
      <form onSubmit={handleSearchSubmit}>
        <input type="text" name="searchQuery" value={searchQuery} onChange={handleSearchChange} placeholder="Search Jobs" />
        <input type="text" name="searchLocation" value={searchLocation} onChange={handleSearchChange} placeholder="Location" />
        <input type="text" name="searchJobType" value={searchJobType} onChange={handleSearchChange} placeholder="Job Type" />
        <input type="text" name="searchDatePosted" value={searchDatePosted} onChange={handleSearchChange} placeholder="Date Posted" />
        <input type="text" name="searchTitle" value={searchTitle} onChange={handleSearchChange} placeholder="Title" />
        <label>
          <input type="checkbox" name="searchRemote" checked={searchRemote} onChange={handleSearchChange} />
          Remote
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

// interface JobsProps {
//   selectedJob: string;
//   handleJobChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
// }

const Jobs: React.FC<JobsProps> = ({ selectedJob, handleJobChange }) => {
  return (
    <select value={selectedJob} onChange={handleJobChange}>
      <option value="Your Jobs">Your Jobs</option>
      <option value="Interviews">Interviews</option>
      <option value="Group Share">Group Share</option>
    </select>
  );
};

export default Header;

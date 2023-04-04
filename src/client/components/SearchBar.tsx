import React, { useState } from "react";
import JobCard from "./JobCard";

export const SearchBar: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<string>("Your Jobs");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [searchJobType, setSearchJobType] = useState<string>("");
  const [searchDatePosted, setSearchDatePosted] = useState<string>("");
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchRemote, setSearchRemote] = useState<boolean>(false);
  const [jobs, setJobs] = useState<object[]>([]);

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedJob(event.target.value);
  };

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

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchParams = new URLSearchParams({
      searchQuery,
      searchLocation,
      searchJobType,
      searchDatePosted,
      searchTitle,
      searchRemote: searchRemote.toString(),
    });

    try {
      const response = await fetch(`/jobs?${searchParams.toString()}`);

      if (response.ok) {
        const jobs = await response.json();
        setJobs(jobs);
      } else {
        console.log(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
//render components Jobs and search bar
  return (
    <div className="header">
      <form onSubmit={handleSearchSubmit}>
        <select value={'Select Job Type'} onChange={handleDropdownChange}>
          <option value="Jobs">Your Jobs</option>
          <option value="Your Jobs">Your Jobs</option>
          <option value="Interviews">Interviews</option>
          <option value="Group Share">Group Share</option>
        </select>
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
}
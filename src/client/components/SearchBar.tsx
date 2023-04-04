import React, { useState } from "react";


export const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [searchDatePosted, setSearchDatePosted] = useState<string>("");
  const [searchJobType, setSearchJobType] = useState<string>("");
  const [searchOnsiteRemote, setSearchOnsiteRemote] = useState<string>("");


  //const [searchEasyApply, setSearchEasyApply] = useState<boolean>(false);

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.name) {
      case "searchDatePosted":
        setSearchDatePosted(event.target.value);
        console.log('Date posted: ', searchDatePosted)
        break;
      case "searchJobType":
        setSearchJobType(event.target.value);
        break;
      case "searchOnsiteRemote":
        setSearchOnsiteRemote(event.target.value);
        break;
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "searchQuery":
        setSearchQuery(event.target.value);
        break;
      case "searchLocation":
        setSearchLocation(event.target.value);
        break;
    }
  };

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const searchParams = new URLSearchParams({
    //   searchQuery,
    //   searchLocation,
    //   searchJobType,
    //   searchDatePosted,
    //   searchTitle,
    //   searchRemote: searchRemote.toString(),
    // });

    // try {
    //   const response = await fetch(`/jobs?${searchParams.toString()}`);

    //   if (response.ok) {
    //     const jobs = await response.json();
    //     setJobs(jobs);
    //   } else {
    //     console.log(`Request failed with status ${response.status}`);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
//render components Jobs and search bar
  return (
    <div className="header">
      <form onSubmit={handleSearchSubmit}>

        <input type="text" name="searchQuery" value={searchQuery} onChange={handleSearchChange} placeholder="Search Jobs" />

        <input type="text" name="searchLocation" value={searchLocation} onChange={handleSearchChange} placeholder="Location" />
        
        <select name="searchDatePosted" value={searchDatePosted} onChange={handleDropdownChange}>
          <option value="3600">Last Hour</option>
          <option value="28800">Last 8 Hours</option>
          <option value="43200">Last 12 Hours</option>
          <option value="86400">Last Day</option>
          <option value="259200">Last 3 Days</option>
          <option value="604800">Last Week</option>
          <option value="1209600">Last Two Weeks</option>
          <option value="2419200">Past Month</option>
        </select>

        <select name="searchJobType" value={searchJobType} onChange={handleDropdownChange}>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Temporary">Temporary</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Internship">Internship</option>
        </select>

        <select name="searchOnsiteRemote" value={searchOnsiteRemote} onChange={handleDropdownChange}>
          <option value="On-site">On-site</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        {/* Easy Apply Option */}
        {/* <label>
          <input type="checkbox" name="searchEasyApply" checked={searchEasyApply} onChange={handleSearchChange} />
          Easy Apply
        </label> */}
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
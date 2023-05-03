import React, { useState, Dispatch, SetStateAction } from "react";
import { searchBody } from "../pages/JobPage";

interface SearchBarProps {
  handleSearchSubmit: (jobSearch: searchBody) => Promise<void>;
  setJobs?: Dispatch<SetStateAction<any>> 
}


export const SearchBar: React.FC<SearchBarProps> = ( { handleSearchSubmit, setJobs } ) => {
  const [searchQuery, setSearchQuery] = useState<string>("Software Engineer");
  const [searchLocation, setSearchLocation] = useState<string>("Los Angeles");
  const [searchDatePosted, setSearchDatePosted] = useState<string>("3600");
  const [searchJobType, setSearchJobType] = useState<string>("Full-time");
  const [searchOnsiteRemote, setSearchOnsiteRemote] = useState<string>("Remote");


  //const [searchEasyApply, setSearchEasyApply] = useState<boolean>(false);

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.name) {
      case "searchDatePosted":
        setSearchDatePosted(event.target.value);
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


//render components Jobs and search bar
  return (
    <div className="SearchBar">
      <form 
        onSubmit={
          (event) => {
            event.preventDefault();
            const body = {
              search: searchQuery,
              location: searchLocation,
              time: parseInt(searchDatePosted),   //<-- 1hr
              count: 0, //<-- where you are in the search results. First one is 0 and increment by 1 each time
              jobType:{
                FT: false,
                PT: false,
                C: false,
                I: false,
              }
            }
            if (searchJobType === 'Full-time') body.jobType.FT = true;
            else if (searchJobType === 'Part-time') body.jobType.PT = true;
            else if (searchJobType === 'Contract') body.jobType.C = true;
            else if (searchJobType === 'Internship') body.jobType.I = true;

            handleSearchSubmit(body);
          }
        }
      >


        <input className="Input" type="text" name="searchQuery" value={searchQuery} onChange={handleSearchChange} placeholder="Search Jobs" />

        <input className="Input" type="text" name="searchLocation" value={searchLocation} onChange={handleSearchChange} placeholder="Location" />
        
        <select className="Input" name="searchDatePosted" value={searchDatePosted} onChange={handleDropdownChange}>
          <option value="3600">Last Hour</option>
          <option value="28800">Last 8 Hours</option>
          <option value="43200">Last 12 Hours</option>
          <option value="86400">Last Day</option>
          <option value="259200">Last 3 Days</option>
          <option value="604800">Last Week</option>
          <option value="1209600">Last Two Weeks</option>
          <option value="2419200">Past Month</option>
        </select>

        <select className="Input" name="searchJobType" value={searchJobType} onChange={handleDropdownChange} >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>

        <select className="Input" name="searchOnsiteRemote" value={searchOnsiteRemote} onChange={handleDropdownChange}>
          <option value="On-site">On-site</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        {/* Easy Apply Option */}
        {/* <label>
          <input type="checkbox" name="searchEasyApply" checked={searchEasyApply} onChange={handleSearchChange} />
          Easy Apply
        </label> */}
        <button 
          className="Input" 
          type="submit"
        >Search</button>
      </form>
    </div>
  );
}
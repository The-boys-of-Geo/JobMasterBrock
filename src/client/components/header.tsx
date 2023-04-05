import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { PageDropdown } from "./PageDropdown";
import { SearchBar } from "./SearchBar";
import { searchBody } from "../pages/JobPage";

//define props for header components
interface HeaderProps {
  handleSearchSubmit: (jobSearch: searchBody) => Promise<void> ;
  setJobs?: Dispatch<SetStateAction<any>> 
};


//define header component
const Header: React.FC<HeaderProps> = ( { handleSearchSubmit, setJobs } ) => {
  
//render components Jobs and search bar
  return (
    <div className="header">
      <PageDropdown />
      <SearchBar 
      handleSearchSubmit={handleSearchSubmit}
      setJobs={setJobs}
      />
    </div>
  );
};



export default Header;

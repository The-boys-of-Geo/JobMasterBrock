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
  
//render components Jobs, logo and search bar
  return (
    <div className="header">
      <h1 className="logo" style={{ 
  fontFamily: 'Pokemon Solid',
  color: '#ffcb05',
  textShadow: '2px 2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, -2px -2px 0 #fff, 0 0 12px #fff'
}}>Job Master Brock</h1>
{/* <img src={require('../assets/brock-pokemon.gif')} alt="Brock Pokemon" /> */}



      <PageDropdown />
      <SearchBar 
        handleSearchSubmit={handleSearchSubmit}
        setJobs={setJobs}
      />
    </div>
  );
};

export default Header;


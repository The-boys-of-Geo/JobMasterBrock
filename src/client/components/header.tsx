import React, { useState, useEffect } from "react";
import { PageDropdown } from "./PageDropdown";
import { SearchBar } from "./SearchBar";

//define props for header components
interface HeaderProps {};


//define header component
const Header: React.FC<HeaderProps> = () => {
  
//render components Jobs and search bar
  return (
    <div className="header">
      <PageDropdown />
      <SearchBar />
    </div>
  );
};



export default Header;

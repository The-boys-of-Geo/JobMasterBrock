import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import { PageDropdown } from './PageDropdown';
import { SearchBar } from './SearchBar';
import { searchBody, HeaderContext } from '../pages/JobPage';
import { JobCardProps } from './jobCard';
//define props for header components
interface HeaderProps {
  setJobs?: Dispatch<SetStateAction<any>>;
}

//define header component
const Header: React.FC<HeaderProps> = ({ setJobs }) => {
  //render components Jobs, logo and search bar
  return (
    <div className="header">
      <h1 className="logo">Job Master Brock</h1>
      {/* <img src={require('../assets/brock-pokemon.gif')} alt="Brock Pokemon" /> */}
      <PageDropdown />
      <SearchBar />
    </div>
  );
};

export default Header;

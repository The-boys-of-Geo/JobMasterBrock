import React, { useState, useEffect } from 'react';



export const PageDropdown: React.FC = () => {

  function handlePageChange(): void {
     'hello'
  }

  return (
    <select onChange={handlePageChange}>
      <option value="Jobs">Your Jobs</option>
      <option value="Your Jobs">Your Jobs</option>
      <option value="Interviews">Interviews</option>
      <option value="Group Share">Group Share</option>
    </select>
  );
};
import React, { useState, useEffect, Fragment } from 'react';
const styles = require('./App.css');

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { JobPage } from './pages/JobPage';
import { ApplicationsPage } from './pages/ApplicationsPage'
import { InterviewPage } from './pages/InterviewPage'

function App() {



  return (
    <Router>
      <Routes>
        <Route path="/" element={ <JobPage />} />
        <Route path="/applications" element={ <ApplicationsPage /> } />
        <Route path="/interviews" element={ <InterviewPage /> } />
      </Routes>
       
      
    </Router>
  );
}

export default App;

import React, { useState, useEffect, Fragment } from 'react';
const styles = require('./App.css');


import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import { YourJobs } from './pages/YourJobs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { JobPage } from './pages/JobPage';
import { InterviewPage } from './pages/InterviewPage'

function App() {

  const [signedIn, setSignedIn] = useState(false);
  const [userID, setUserID] = useState(0);


  if (signedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={ <JobPage />} />
           <Route path="/applications" element={ <YourJobs />} />
          <Route path="/interviews" element={ <InterviewPage />} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<AuthModal 
          setSignedIn={setSignedIn}
          setUserID={setUserID}
          />
          } />
        </Routes>
      </Router>
    );
  }
  

}


export default App;

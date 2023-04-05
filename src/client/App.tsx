import React, { useState, useEffect, Fragment } from 'react';
const styles = require('./App.css');

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { JobPage } from './pages/JobPage';
import { ApplicationsPage } from './pages/ApplicationsPage'
import { InterviewPage } from './pages/InterviewPage'
import AuthModal from './components/AuthModal'

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [userID, setUserID] = useState(0);


  if (signedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={ <JobPage />} />
          {/* <Route path="/applications" element={ <ApplicationsPage /> } /> */}
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

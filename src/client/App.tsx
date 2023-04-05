import React, { useState, useEffect, Fragment } from 'react';
const styles = require('./App.css');

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { JobPage } from './pages/JobPage';
//import { ApplicationsPage } from './pages/ApplicationsPage'
import { InterviewPage } from './pages/InterviewPage'
import AuthModal from './components/AuthModal'

function App() {
  const [signedIn, setSignedIn] = useState(false);


  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthModal />} />
        <Route path="/" element={ <JobPage />} />
        {/* <Route path="/applications" element={ <ApplicationsPage />} /> */}
        <Route path="/interviews" element={ <InterviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;

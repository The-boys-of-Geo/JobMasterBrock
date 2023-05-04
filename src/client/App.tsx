import React, { useState, useEffect, Fragment } from 'react';
const styles = require('./App.css');
import { YourJobs } from './pages/YourJobs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { JobPage } from './pages/JobPage';
//import { ApplicationsPage } from './pages/ApplicationsPage'
import { InterviewPage } from './pages/InterviewPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobPage />} />
        <Route path="/applications" element={<YourJobs />} />
        <Route path="/interviews" element={<InterviewPage />} />
      </Routes>
    </Router>
  );
}

// function App() {
//   return (
//     <div>
//       <YourJobs/>
//       {/* <JobPage /> */}
//       {/* <ApplicationsPage /> */}
//       {/* <InterviewPage /> */}
//     </div>
//   );
// }

export default App;

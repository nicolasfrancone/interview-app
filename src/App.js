import React from 'react';
import AppointmentScheduler from './components/AppointmentScheduler/AppointmentScheduler';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, useSearchParams } from 'react-router-dom';

const AppContent = () => {
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get('profile_id');

  return (
    <div className="app-container">
      {profileId ? (
        <AppointmentScheduler />
      ) : (
        null
      )}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;

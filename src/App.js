// App.js
import React from 'react';
import AppointmentScheduler from './components/AppointmentScheduler/AppointmentScheduler';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {


  return (
    <div className="app-container">
        <AppointmentScheduler
        />
    </div>
  );
};

export default App;

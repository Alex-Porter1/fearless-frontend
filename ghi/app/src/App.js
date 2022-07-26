import './App.css';
import Nav from './Nav';
import React from 'react';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendConferenceForm from './AttendConferenceForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';

function App(props) {

  if (props.attendees === undefined) {
    return null;
  }
  
  return (
    <BrowserRouter>
      <Nav />
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="presentations">
            <Route path="new" element={<PresentationForm />} />
          </Route>
          <Route path="conferences">
            <Route path="new" element={<ConferenceForm />} />
          </Route>
          <Route path="attendees">
            <Route path="new" element={<AttendConferenceForm />} />
          </Route>
          <Route path="locations">
            <Route path="new" element={<LocationForm />} />
          </Route>
          <Route path="attendees">
            <Route path="" element={<AttendeesList attendees={props.attendees} />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}


export default App;

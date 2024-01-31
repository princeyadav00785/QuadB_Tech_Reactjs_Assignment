// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowList from './page/ShowList';
import ShowDetails from './page/ShowDetails';
import BookingForm from './page/BookingForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="/booking/:id" element={<BookingForm />} />
      </Routes>
    </Router>
  );
};

export default App;

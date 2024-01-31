import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/BookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    movieName: '',
    otherDetail: '',
   
  });

  const { id } = useParams();

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, movieName: `Movie ${id}` }));
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userDetails', JSON.stringify(formData));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="booking-form-container">
      <h1 className="page-title">Booking Form</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-section">
          <label htmlFor="movieName">Movie Name:</label>
          <input
            type="text"
            id="movieName"
            name="movieName"
            value={formData.movieName}
            readOnly
          />
        </div>
        <div className="form-section">
          <label htmlFor="otherDetail">Other Detail:</label>
          <input
            type="text"
            id="otherDetail"
            name="otherDetail"
            value={formData.otherDetail}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookingForm;

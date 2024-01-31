import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../css/ShowDetails.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong. Please try again later.</p>;
    }

    return this.props.children;
  }
}


const ShowDetails = () => {
  const [showDetails, setShowDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => setShowDetails(response.data))
      .catch((error) => console.error('Error fetching show details:', error));
  }, [id]);

  if (!showDetails) {
    return <div>Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <div className="main-container">
        <h1 className="page-title">Movie Details</h1>
        <div className="movie-details-container">
          <h2 className="section-title">Movie Name</h2>
          <p className="bold-text show-details-title">{showDetails.name}</p>
          <div className="info-container">
            <h2 className="section-title">Details</h2>
            <p className="show-details-info">
              <span className="bold-text">Genres:</span> {showDetails.genres.join(', ')}
            </p>
            <p className="show-details-info">
              <span className="bold-text">Status:</span> {showDetails.status}
            </p>
            <p className="show-details-info">
              <span className="bold-text">Schedule:</span> {showDetails.schedule && showDetails.schedule.days.join(', ')} at {showDetails.schedule && showDetails.schedule.time}
            </p>
            <p className="show-details-info">
              <span className="bold-text">Rating:</span> {showDetails.rating && showDetails.rating.average}
            </p>
          </div>
          <div className="image-container">
            <h2 className="section-title">Movie Poster</h2>
            {showDetails.image && <img src={showDetails.image.original} alt={showDetails.name} className="show-details-image" />}
          </div>
          <div className="summary-container">
            <h2 className="section-title">Summary</h2>
            <p dangerouslySetInnerHTML={{ __html: showDetails.summary }} className="show-details-summary"></p>
          </div>
          <div className="button-container">
            <Link to={`/booking/${showDetails.id}`} className="booking-link">
              <button className="book-button">Book Movie Ticket</button>
            </Link>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ShowDetails;

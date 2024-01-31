import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/ShowList.css';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.tvmaze.com/search/shows?q=all')
      .then((response) => setShows(response.data))
      .catch((error) => console.error('Error fetching shows:', error));
  }, []);

  return (
    <div className="show-list-container">
      <h1 className="page-title">Show List</h1>
      <ul className="show-cards">
        {shows.map(({ show }) => (
          <li key={show.id} className="show-card">
            <Link to={`/show/${show.id}`}>
              <div className="card-content">
                <h2 className="show-name">{show.name}</h2>
                {show.image && <img src={show.image.medium} alt={show.name} className="show-image" />}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;

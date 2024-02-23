// Card.js
import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ imageSrc, altText, title, to }) => {
  const cardStyle = {
    width: '550px',
    height: '300px', // Adjusted height for more space
    position: 'relative',
    overflow: 'hidden', // Ensure that overflow content is hidden
    transition: 'transform 0.3s', // Add a smooth transition effect
    transform: 'translateY(0)', // Initial translation
  };

  const imageStyle = {
    width: '100%', // Adjusted width to fill the container
    height: '87%', // Adjusted height to leave space for the title
    objectFit: 'cover',
  };

  const titleStyle = {
    position: 'absolute',
    bottom: '10px', // Adjust the distance from the bottom as needed
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
    textAlign: 'left',
    width: '100%',
    fontWeight: 'bold',
    fontSize: '1.5em',
  };

  // Define styles for the hover effect
  const hoverStyles = {
    transform: 'translateY(-8px)', // Move the card up slightly on hover
  };

  return (
    <Link to={to}>
      <div className="card" style={{ ...cardStyle, ...hoverStyles }}>
        <img src={imageSrc} alt={altText} className="card-image" style={imageStyle} />
        <div className="card-content" style={titleStyle}>
          <h3 className="card-title">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;

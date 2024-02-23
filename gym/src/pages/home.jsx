import React from 'react';
import back from './1.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  const styles = {
    body: {
      fontFamily: 'Poppins, sans-serif',
      backgroundColor: '#000',
      color: '#fff',
      overflow: 'hidden',
      background: `url(${back}) center/cover fixed no-repeat`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
      position: 'relative',
      padding: "20px"
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1, // Ensures the header is on top of the background image
    },
    buttons: {
      display: 'flex',
      gap: '1rem',
    },
    bgImage: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      zIndex: 0, // Puts the background image behind other elements
    },
    overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%)',
      zIndex: -1, // Puts the overlay behind other elements
    },
    headline: {
      fontSize: '6rem',
      fontWeight: 'bold',
      marginTop: '-500px', // Move the text 50 pixels above
    },
  };

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <h1 className="text-4xl font-bold">FitCampus</h1>
        <div style={styles.buttons}>
          <Link to="/login" className="bg-transparent text-yellow-500 font-semibold hover:text-yellow-400 py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
            Login
          </Link>
          <Link to="/register" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded ml-4">
            Sign Up
          </Link>
        </div>
      </header>

      <div style={styles.bgImage}>
        <div style={styles.overlay}></div>
        <h2 style={styles.headline}>
          Your daily<br />health coach
        </h2>
      </div>
    </div>
  );
};

export default Home;
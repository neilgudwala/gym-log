// Home2.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import a from './2.PNG';
import b from './3.PNG';
import c from './4.PNG';
import d from './5.PNG';
import Content from '../components/Content';

const Home2 = () => {
  return (
    <div className="container-main flex" style={{ height: '100vh' }}>
      <Sidebar />
      <div className="flex-1" style={{ height: '100%' }}>
        <div className="cards-container" style={{ height: '100%', overflowY: 'auto' }}>
          <Card
            imageSrc={c}
            altText="Nutrition Tracker"
            title="Nutrition Tracker"
            to="/nutrition"
          />
          <Card
            imageSrc={a}
            altText="Machine Availability"
            title="Machine Availability"
            to="/machine"
          />
          <Card
            imageSrc={b}
            altText="Your Workout Routine"
            title="Your Workout Routine"
            to="/workout"
          />
          <Card
            imageSrc={d}
            altText="Timings Of Gym"
            title="Timings Of Gym"
            to="/gym"
          />
        </div>
      </div>
    </div>
  );
};

export default Home2;

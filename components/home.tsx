import React from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import pics from '../pics/event.jpg';

const Home: React.FC = () => {
  return (
    <section className={`container-fluid ${styles.homeSection}`}>
      <div className="row align-items-center">
        {/* Text Content */}
        <div className="col-md-6">
          <div className={styles.textContent}>
            <h1 className={styles.title}>Welcome to Event Management System</h1>
            <p className={styles.subtitle}>
              Your ultimate solution for organizing and managing events effortlessly.
            </p>
            <button className={`btn ${styles.getStartedButton}`}>Get Started</button>
          </div>
        </div>
        {/* Image Content */}
        <div className="col-md-6">
          <div className={styles.imageContainer}>
            <Image
              src={pics}
              alt="Event Management"
              className={`img-fluid ${styles.heroImage}`}
              priority // Added priority property
              width={400} // Define an explicit width
              height={300} // Define an explicit height
            />
          </div>
        </div>
      </div>

      {/* View Events Section */}
      <section id="view-events" className={`container ${styles.viewEventsSection}`}>
        <h2 className="text-center mb-4">Upcoming Events</h2>
        <div className="row">
          {/* Event Card 1 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <Image
                src={pics}
                className="card-img-top"
                alt="Event 1"
                width={400} // Define an explicit width
                height={200} // Define an explicit height
                style={{ objectFit: 'cover', width: '100%', height: '120' }} // Ensure aspect ratio
              />
              <div className="card-body">
                <h5 className="card-title">Event Title 1</h5>
                <p className="card-text">
                  This is a brief description of Event 1. It's going to be amazing!
                </p>
                <p className="card-text">Date: January 1, 2025</p>
                <p className="card-text">Seats: 100 available</p>
                <button className="btn btn-primary">Book Event</button>
              </div>
            </div>
          </div>

          {/* Event Card 2 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <Image
                src={pics}
                className="card-img-top"
                alt="Event 2"
                width={400} // Define an explicit width
                height={200} // Define an explicit height
                style={{ objectFit: 'cover', width: '100%', height: '120' }} // Ensure aspect ratio
              />
              <div className="card-body">
                <h5 className="card-title">Event Title 2</h5>
                <p className="card-text">
                  This is a brief description of Event 2. Don't miss it!
                </p>
                <p className="card-text">Date: February 1, 2025</p>
                <p className="card-text">Seats: 50 available</p>
                <button className="btn btn-primary">Book Event</button>
              </div>
            </div>
          </div>

          {/* Add more event cards as needed */}
        </div>
      </section>
    </section>
  );
};

export default Home;

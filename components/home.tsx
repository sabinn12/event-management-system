import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import pics from '../pics/event.jpg';

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className={`container-fluid ${styles.homeSection}`}>
        <div className="row align-items-center shadow-lg">
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
                priority
                width={400}
                height={300}
              />
            </div>
          </div>
        </div>

        {/* View Events Section */}
        <section id="view-events" className={`container ${styles.viewEventsSection} `}>

          <h2 className="text-center mb-4">Upcoming Events</h2>
          <div className="row shadow-sm p-3 mb-5 bg-white rounded">
            {/* Event Card 1 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <Image
                  src={pics}
                  className="card-img-top"
                  alt="Event 1"
                  width={400}
                  height={200}
                  style={{ objectFit: 'cover', width: '100%', height: '120' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Event Title 1</h5>
                  <p className="card-text">
                    This is a brief description of Event 1. It's going to be amazing!
                  </p>
                  <p className="card-text">Date: January 1, 2025</p>
                  <p className="card-text">Seats: 100 available</p>
                  <button className="btn btn-primary" onClick={handleOpenModal}>
                    Book Event
                  </button>
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
                  width={400}
                  height={200}
                  style={{ objectFit: 'cover', width: '100%', height: '120' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Event Title 2</h5>
                  <p className="card-text">
                    This is a brief description of Event 2. Don't miss it!
                  </p>
                  <p className="card-text">Date: February 1, 2025</p>
                  <p className="card-text">Seats: 50 available</p>
                  <button className="btn btn-primary" onClick={handleOpenModal}>
                    Book Event
                  </button>
                </div>
              </div>
            </div>

            {/* Add more event cards as needed */}
          </div>
        </section>
      </section>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Dimmed background
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)', // Increased shadow for modal
              maxWidth: '500px', // Optional: limit modal width for a cleaner look
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Book Event</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="userName">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="seats">Number of Seats</label>
                    <input
                      type="number"
                      className="form-control"
                      id="seats"
                      placeholder="Enter number of seats"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">
                    Book Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="text-center mt-5 py-4" style={{ backgroundColor: 'black' }}>
        <p style={{color : 'white'}}>© 2024 Event Management System. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import pics from '../pics/event.jpg';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  seats: number;
}

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [userName, setUserName] = useState('');
  const [seatsToBook, setSeatsToBook] = useState<number>(1);

  // Helper function to format date to YYYY-MM-DD
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events/get-events');
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Open modal and set selected event
  const handleOpenModal = (event: Event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUserName('');
    setSeatsToBook(1);
  };

  // Handle booking event
  const handleBookEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    try {
      const response = await fetch('/api/events/book-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: selectedEvent.id,
          seatsToBook: Number(seatsToBook),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        // Update the event seats in the local state
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === selectedEvent.id
              ? { ...event, seats: event.seats - seatsToBook }
              : event
          )
        );
        alert('Booking successful!');
        handleCloseModal();
      } else {
        alert(result.message || 'Error booking event');
      }
    } catch (error) {
      console.error('Error booking event:', error);
    }
  };

  return (
    <>
      <section className={`container-fluid ${styles.homeSection}`}>
        <div className="row align-items-center shadow-lg">
          <div className="col-md-6">
            <div className={styles.textContent}>
              <h1 className={styles.title}>Welcome to Event Management System</h1>
              <p className={styles.subtitle}>
                Your ultimate solution for organizing and managing events effortlessly.
              </p>
              <button className={`btn ${styles.getStartedButton}`}>Get Started</button>
            </div>
          </div>
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

        <section id="view-events" className={`container ${styles.viewEventsSection}`}>
          <h2 className="text-center mb-4">Upcoming Events</h2>
          <div className="row shadow-sm p-3 mb-5 bg-white rounded">
            {events.map((event) => (
              <div className="col-md-4 mb-4" key={event.id}>
                <div className="card h-100">
                  <Image
                    src={pics}
                    className="card-img-top"
                    alt={event.title}
                    width={400}
                    height={200}
                    style={{ objectFit: 'cover', width: '100%', height: '120px' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">{event.description}</p>
                    <p className="card-text">Date: {formatDate(event.date)}</p>
                    <p className="card-text">Seats: {event.seats} available</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleOpenModal(event)}
                    >
                      Book Event
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
              maxWidth: '500px',
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
                <form onSubmit={handleBookEvent}>
                  <div className="form-group">
                    <label htmlFor="userName">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      placeholder="Enter your name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
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
                      value={seatsToBook}
                      onChange={(e) => setSeatsToBook(Number(e.target.value))}
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

      <footer className="text-center mt-5 py-4" style={{ backgroundColor: 'black' }}>
        <p style={{ color: 'white' }}>© 2024 Event Management System. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Home;

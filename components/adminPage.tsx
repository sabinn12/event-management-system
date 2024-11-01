import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  seats: number;
}

const AdminPage: React.FC = () => {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    seats: 0,
  });

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          alert('No token provided. Please log in again.');
          router.push('/'); // Redirect to login page
          return;
        }

        const response = await fetch('/api/events/get-events', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
          return;
        }

        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
        alert('Error fetching events. Please try again.');
      }
    };

    fetchEvents();
  }, [router]);

  // Functions to toggle modals
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  // Handle logout and redirect
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    router.push('/');
  };

  // Handle input changes for the Add Event form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [id]: id === 'seats' ? parseInt(value) : value,
    }));
  };

  // Handle adding a new event
  const handleAddEvent = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        alert('No token provided. Please log in again.');
        router.push('/'); // Redirect to login page
        return;
      }

      const response = await fetch('/api/events/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }

      const data = await response.json();
      alert('Event created successfully!');
      setEvents((prevEvents) => [...prevEvents, data.event]);
      handleCloseAddModal();
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event. Please try again.');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-dark">Welcome Admin</h1>

      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-success" onClick={handleShowAddModal}>
          Add Event
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Seats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{event.date.slice(0, 10)}</td> {/* Format date to YYYY-MM-DD */}
                <td>{event.seats}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={handleShowEditModal}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Logout Button */}
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Add Event Modal */}
      <div
        className={`modal fade ${showAddModal ? 'show d-block' : ''}`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={handleCloseAddModal}
      >
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Event</h5>
              <button type="button" className="btn-close" onClick={handleCloseAddModal}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={newEvent.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="seats" className="form-label">Seats</label>
                  <input
                    type="number"
                    className="form-control"
                    id="seats"
                    value={newEvent.seats}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleAddEvent}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Event Modal */}
      <div
        className={`modal fade ${showEditModal ? 'show d-block' : ''}`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={handleCloseEditModal}
      >
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Event</h5>
              <button type="button" className="btn-close" onClick={handleCloseEditModal}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="titleEdit" className="form-label">Title</label>
                  <input type="text" className="form-control" id="titleEdit" />
                </div>
                <div className="mb-3">
                  <label htmlFor="descriptionEdit" className="form-label">Description</label>
                  <textarea className="form-control" id="descriptionEdit"></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="dateEdit" className="form-label">Date</label>
                  <input type="date" className="form-control" id="dateEdit" />
                </div>
                <div className="mb-3">
                  <label htmlFor="seatsEdit" className="form-label">Seats</label>
                  <input type="number" className="form-control" id="seatsEdit" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleCloseEditModal}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

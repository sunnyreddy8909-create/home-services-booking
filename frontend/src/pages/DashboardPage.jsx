import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function BookingPage({ token, user }) {
  const [services, setServices] = useState([]);
  const [providers, setProviders] = useState([]);
  const [form, setForm] = useState({
    service: '',
    provider: '',
    bookingDate: '',
    bookingTime: '',
    location: '',
    notes: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/services`).then((res) => setServices(res.data));
    axios.get(`${API_URL}/providers`).then((res) => setProviders(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !user) {
      setMessage('Please login to create a booking.');
      return;
    }

    try {
      await axios.post(`${API_URL}/bookings`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Booking created successfully.');
      setForm({
        service: '',
        provider: '',
        bookingDate: '',
        bookingTime: '',
        location: '',
        notes: '',
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create booking.');
    }
  };

  return (
    <div className="content-section two-column">
      <div>
        <div className="section-heading">
          <span className="eyebrow">Book a service</span>
          <h2>Schedule your appointment</h2>
        </div>

        <form className="stack-form" onSubmit={handleSubmit}>
          <label>
            Service
            <select name="service" value={form.service} onChange={handleChange} required>
              <option value="">Select a service</option>
              {services.map((service) => (
                <option value={service._id} key={service._id}>{service.title}</option>
              ))}
            </select>
          </label>

          <label>
            Provider
            <select name="provider" value={form.provider} onChange={handleChange} required>
              <option value="">Select a provider</option>
              {providers.map((provider) => (
                <option value={provider._id} key={provider._id}>{provider.name}</option>
              ))}
            </select>
          </label>

          <label>
            Date
            <input type="date" name="bookingDate" value={form.bookingDate} onChange={handleChange} required />
          </label>

          <label>
            Time
            <input type="time" name="bookingTime" value={form.bookingTime} onChange={handleChange} required />
          </label>

          <label>
            Service Location
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="12 Main Street"
              required
            />
          </label>

          <label>
            Notes
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Any additional details or special requirements"
            />
          </label>

          {message ? <div className="alert success">{message}</div> : null}

          <button className="primary-btn" type="submit">Confirm booking</button>
        </form>
      </div>

      <div className="booking-summary panel">
        <span className="eyebrow">Booking summary</span>
        <h3>Why customers choose us</h3>
        <ul className="summary-list">
          <li>Verified professionals</li>
          <li>Flexible scheduling</li>
          <li>Transparent service pricing</li>
          <li>Location-aware booking</li>
        </ul>
        <div className="summary-box">
          <strong>Average response time</strong>
          <span>30 mins</span>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;

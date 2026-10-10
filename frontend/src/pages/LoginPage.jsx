import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/services`)
      .then((res) => setServices(res.data))
      .catch((err) => console.log('Error loading services', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="panel">Loading services...</div>;
  }

  return (
    <div className="content-section">
      <div className="section-heading">
        <span className="eyebrow">Available services</span>
        <h2>Choose the right service for your home</h2>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service._id}>
            <div className="service-header">
              <span className="tag">{service.category}</span>
              <strong>${service.price}</strong>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul>
              <li>Duration: {service.duration}</li>
              <li>Location: {service.location}</li>
              {service.provider ? <li>Provider: {service.provider.name}</li> : null}
            </ul>
            <a className="primary-btn small" href="/booking">Book now</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;

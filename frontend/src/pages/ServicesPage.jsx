const featureCards = [
  {
    title: 'Plumbers',
    text: 'Fast repair for leaks, installs, and emergency plumbing issues.',
  },
  {
    title: 'Electricians',
    text: 'Certified professionals for wiring, installations, lighting, and safety checks.',
  },
  {
    title: 'Cleaners',
    text: 'Home cleaning and deep-clean services for everyday comfort and hygiene.',
  },
  {
    title: 'General Maintenance',
    text: 'Fix small repairs and keep your home comfortable year-round.',
  },
];

function HomePage() {
  return (
    <div>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">HomeCare booking platform</span>
          <h1>Book trusted home services in minutes.</h1>
          <p>
            From plumbing and electrical work to cleaning and maintenance, manage appointments,
            providers, and service bookings through one smart platform.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="/booking">Book a service</a>
            <a className="secondary-btn" href="/services">Browse services</a>
          </div>
          <ul className="stats-row">
            <li><strong>2,500+</strong><span>Bookings</span></li>
            <li><strong>120+</strong><span>Providers</span></li>
            <li><strong>4.8/5</strong><span>Rating</span></li>
          </ul>
        </div>

        <div className="hero-card">
          <div className="mini-card">
            <span>Next available</span>
            <strong>Today, 5:30 PM</strong>
          </div>
          <div className="mini-card accent">
            <span>Popular service</span>
            <strong>Emergency Plumbing</strong>
          </div>
          <div className="mini-card">
            <span>Coverage</span>
            <strong>Downtown • North Side</strong>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span className="eyebrow">What we offer</span>
          <h2>Professional services for every home need</h2>
        </div>

        <div className="feature-grid">
          {featureCards.map((item) => (
            <div className="feature-card" key={item.title}>
              <div className="feature-icon">✓</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;

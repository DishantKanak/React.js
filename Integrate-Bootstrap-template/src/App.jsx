import React from 'react';

// simple Bootstrap-based layout component
export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">My Bootstrap App</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="py-5 bg-primary text-white">
        <div className="container">
          <h1>Welcome to Bootstrap + React</h1>
          <p className="lead">
            This is a simple example of integrating a Bootstrap template with a
            React/Vite project.
          </p>
        </div>
      </header>

      <main className="container my-5">
        <div className="row">
          <div className="col-md-4">
            <h2>Responsive</h2>
            <p>Bootstrap components are mobile-first by default.</p>
          </div>
          <div className="col-md-4">
            <h2>Reusable</h2>
            <p>You can reuse components across pages.</p>
          </div>
          <div className="col-md-4">
            <h2>Fast development</h2>
            <p>Leverage existing styles and Javascript behaviors.</p>
          </div>
        </div>
      </main>

      <footer className="py-4 bg-light text-center">
        <div className="container">
          <small>© 2026 My Bootstrap App</small>
        </div>
      </footer>
    </div>
  );
}

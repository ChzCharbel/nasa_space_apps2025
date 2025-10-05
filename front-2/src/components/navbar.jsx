import React from 'react'
import { Link } from 'react-router-dom'

function navbar() {
  return (
    <nav className="navbar">
                <div className="nav-container">
                    <div>
                      <Link to="/" className="brand">
                        ExoDetect AI
                      </Link>
                    </div>
                    <div className="nav-links">
                        <Link to="/" >Home</Link>
                        <Link to="/explore" >Explore</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link className="primary-link" to="/app">Start Hunting</Link>
                    </div>
                </div>
            </nav>
  )
}

export default navbar
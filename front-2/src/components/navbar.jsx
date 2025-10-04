import React from 'react'

function navbar() {
  return (
    <nav className="navbar">
                <div className="nav-container">
                    <div className="brand">ExoDetect AI</div>
                    <div className="nav-links">
                        <a href="#features" onClick={(event) => handleSmoothScroll(event, '#features')}>Features</a>
                        <a href="#demo" onClick={(event) => handleSmoothScroll(event, '#demo')}>Demo</a>
                        <a href="#team" onClick={(event) => handleSmoothScroll(event, '#team')}>Team</a>
                        <a className="primary-link" href="/app">Launch App</a>
                    </div>
                </div>
            </nav>
  )
}

export default navbar
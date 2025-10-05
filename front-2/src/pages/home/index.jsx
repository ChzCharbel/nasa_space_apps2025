import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { processDescriptions, 
    featureCards, 
    challengeCards,
    teamMembers,
    metrics,
    techPills
} from './statics';
import NavBar from '../../components/Navbar'


const svgIcon = (path) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={path} />
  </svg>
);

const App = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const countersRef = useRef([]);
  const [activeScenario, setActiveScenario] = useState("planet");

  const scenarios = useMemo(
    () => ({
      planet: {
        waveform: "Stable transit signature detected at 2.1% depth.",
        result: "Likely Exoplanet",
        confidence: "97.4%",
        snr: "12.8",
        followUp: "Prioritize spectroscopic observations.",
      },
      falsePositive: {
        waveform: "Irregular fluctuation consistent with stellar variability.",
        result: "False Positive",
        confidence: "88.1%",
        snr: "3.2",
        followUp: "Flag for automated reprocessing only.",
      },
    }),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) {
      return;
    }
    const ctx = canvas.getContext("2d");
    const STAR_COUNT = 200;
    const stars = [];
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = hero.offsetHeight;
    };

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i += 1) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.4 + 0.2,
        });
        stars[i].alpha = Math.random();
        stars[i].twinkle = Math.random() * 0.02 + 0.01;
        stars[i].drift = Math.random() * 0.05 + 0.02;
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        star.alpha += star.twinkle * (Math.random() > 0.5 ? 1 : -1);
        star.alpha = Math.min(1, Math.max(0.2, star.alpha));
        star.y += star.drift;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      }
      animationRef.current = requestAnimationFrame(drawStars);
    };

    resizeCanvas();
    initStars();
    drawStars();

    const handleResize = () => {
      resizeCanvas();
      initStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((el) => el.classList.add("visible"));
      return undefined;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const counterElements = countersRef.current;
    if (!counterElements.length) {
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      counterElements.forEach((el) => {
        const target = parseFloat(el.dataset.target || "0");
        const suffix = el.dataset.suffix || "";
        el.textContent = `${target}${suffix}`;
      });
      return undefined;
    }

    const runCounter = (el) => {
      const target = parseFloat(el.dataset.target || "0");
      const suffix = el.dataset.suffix || "";
      const duration = 1500;
      const startTime = performance.now();

      const updateCounter = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        const formatted =
          target % 1 !== 0 ? value.toFixed(1) : Math.round(value);
        el.textContent = `${formatted}${suffix}`;
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    };

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterElements.forEach((el) => counterObserver.observe(el));

    return () => counterObserver.disconnect();
  }, []);

  const activeScenarioData = scenarios[activeScenario];

  const handleSmoothScroll = (event, selector) => {
    event.preventDefault();
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* <style>{globalStyles}</style> */}
      {/* Sticky navigation */}
      <NavBar />

      <header>
        <section className="hero" id="top" ref={heroRef}>
          <canvas id="starfield" ref={canvasRef} aria-hidden="true" />
          <div className="hero-content" data-section>
            <h1>Exoplanet Detection AI</h1>
            <p>Finding New Worlds with Machine Learning</p>
            <div className="hero-actions">
              <Link to="/explore" className="btn btn-primary">
                Explore Datasets
              </Link>

              {/* <button
                                type="button"
                                className="btn btn-primary"
                                onClick={(event) => handleSmoothScroll(event, '#demo')}
                            >
                                <Link to="/explore" className="btn btn-primary" />
                                Explore Datasets
                            </button> */}
              <Link to="/dashboard" className="btn btn-secondary">
                View Demo
              </Link>
            </div>
          </div>
          <div className="scroll-indicator" aria-hidden="true">
            <span />
          </div>
        </section>
      </header>

      <main>
        {/* Problem statement */}
        <section className="section" id="challenge" data-section>
          <div className="container reveal">
            <h2 className="section-title">The Challenge</h2>
            <div className="cards-grid three">
              {challengeCards.map((card) => (
                <div key={card.title} className="glass-card">
                  <div className="card-icon">{svgIcon(card.icon)}</div>
                  <div className="card-title">{card.title}</div>
                  <div className="card-text">{card.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution process */}
        <section className="section" id="approach" data-section>
          <div className="container reveal">
            <h2 className="section-title">Our Approach</h2>
            <div className="process-flow glass-card">
              {processDescriptions.map((step) => (
                <div key={step.title} className="process-step">
                  <div className="card-title">{step.title}</div>
                  <div className="card-text">{step.text}</div>
                </div>
              ))}
            </div>
            <div className="tech-stack">
              {techPills.map((pill) => (
                <span key={pill} className="tech-pill">
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics with counters */}
        <section className="section" id="metrics" data-section>
          <div className="container reveal">
            <h2 className="section-title">Mission Metrics</h2>
            <p className="section-subtext">
              Validated results tracked across nightly runs and real-world
              deployments.
            </p>
            <div className="metrics-grid">
              {metrics.map((metric, index) => (
                <div key={metric.label} className="glass-card">
                  <div
                    className="metric-value"
                    data-counter
                    data-target={metric.target}
                    data-suffix={metric.suffix}
                    ref={(el) => {
                      if (el) {
                        countersRef.current[index] = el;
                      }
                    }}
                  >
                    0{metric.suffix}
                  </div>
                  <div className="metric-label">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section" id="features" data-section>
          <div className="container reveal">
            <h2 className="section-title">Key Capabilities</h2>
            <div className="cards-grid four">
              {featureCards.map((card) => (
                <div key={card.title} className="glass-card feature-card">
                  <div className="card-icon">{svgIcon(card.icon)}</div>
                  <div className="card-title">{card.title}</div>
                  <div className="card-text">{card.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo placeholder */}
        <section className="section" id="demo" data-section>
          <div className="container reveal">
            <h2 className="section-title">Live Demo Preview</h2>
            <p className="section-subtext">
              Simulate classifications before connecting to mission data feeds.
            </p>
            <div className="demo-area">
              <div className="demo-visual glass-card" id="demo-visual">
                <div id="demo-waveform">{activeScenarioData.waveform}</div>
              </div>
              <div className="demo-controls glass-card">
                <div className="card-title">Sample Scenarios</div>
                <p className="card-text">
                  Select a scenario to preview confidence metrics from the AI
                  pipeline.
                </p>
                <div className="demo-controls">
                  <button
                    type="button"
                    className={`btn btn-secondary ${
                      activeScenario === "planet" ? "btn-active" : ""
                    }`}
                    onClick={() => setActiveScenario("planet")}
                  >
                    Known Planet
                  </button>
                  <button
                    type="button"
                    className={`btn btn-secondary ${
                      activeScenario === "falsePositive" ? "btn-active" : ""
                    }`}
                    onClick={() => setActiveScenario("falsePositive")}
                  >
                    False Positive
                  </button>
                </div>
                <div className="demo-output" id="demo-output">
                  <div className="card-title">Prediction</div>
                  <p className="card-text">
                    <strong>Result:</strong> {activeScenarioData.result}
                    <br />
                    <strong>Confidence:</strong> {activeScenarioData.confidence}
                    <br />
                    <strong>Signal-to-Noise:</strong> {activeScenarioData.snr}
                    <br />
                    <strong>Follow-up:</strong> {activeScenarioData.followUp}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team section */}
        <section className="section" id="team" data-section>
          <div className="container reveal">
            <h2 className="section-title">Meet the Crew</h2>
            <p className="section-subtext">
              Built at NASA Space Apps Challenge 2025 by interdisciplinary
              explorers.
            </p>
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.name} className="glass-card team-member">
                  <img src={member.photo} alt={member.name} loading="lazy" />
                  <div className="card-title">{member.name}</div>
                  <div className="card-text">{member.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer call-to-action */}
      <footer className="footer-cta" data-section>
        <h2 className="section-title">Ready to Discover New Worlds?</h2>
        <p className="section-subtext">
          Deploy ExoDetect AI with your mission data and accelerate the search
          for habitable exoplanets.
        </p>
        <a className="btn btn-primary btn-glow" href="/app">
          Launch Application
        </a>
        <div className="footer-links">
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://docs.nasa.gov" target="_blank" rel="noreferrer">
            Documentation
          </a>
          <a href="mailto:contact@exodetect.ai">Contact</a>
        </div>
      </footer>
    </>
  );
};

export default App;

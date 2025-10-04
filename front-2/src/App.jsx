import React, { useEffect, useMemo, useRef, useState } from 'react';

const globalStyles = `
    :root {
        --bg-dark: #0a0e27;
        --bg-card: rgba(26, 31, 58, 0.75);
        --accent-blue: #3b82f6;
        --accent-green: #10b981;
        --text-primary: #ffffff;
        --text-secondary: #94a3b8;
        --glass-border: rgba(255, 255, 255, 0.08);
        --shadow: 0 20px 40px rgba(8, 11, 30, 0.45);
        --radius-card: 16px;
        --radius-button: 8px;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
        background: radial-gradient(circle at top, rgba(59, 130, 246, 0.08), transparent 55%), var(--bg-dark);
        color: var(--text-primary);
        line-height: 1.6;
        overflow-x: hidden;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    header, main, footer {
        position: relative;
        z-index: 2;
    }

    nav.navbar {
        position: sticky;
        top: 0;
        z-index: 5;
        backdrop-filter: blur(16px);
        background: rgba(10, 14, 39, 0.85);
        border-bottom: 1px solid var(--glass-border);
        box-shadow: 0 8px 24px rgba(5, 8, 20, 0.35);
    }

    .nav-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .brand {
        font-size: 1.25rem;
        font-weight: 700;
        letter-spacing: 0.08em;
    }

    .nav-links {
        display: flex;
        align-items: center;
        margin-left: auto;
        gap: 1rem;
    }

    .nav-links a {
        font-size: 0.95rem;
        color: var(--text-secondary);
        transition: color 0.3s ease;
    }

    .nav-links a:hover,
    .nav-links a:focus {
        color: var(--text-primary);
    }

    .primary-link {
        padding: 0.55rem 1.3rem;
        border-radius: var(--radius-button);
        background: linear-gradient(135deg, var(--accent-blue), var(--accent-green));
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.45);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        font-weight: 600;
        color: var(--text-primary);
    }

    .primary-link:hover,
    .primary-link:focus {
        transform: translateY(-2px);
        box-shadow: 0 0 32px rgba(16, 185, 129, 0.55);
    }

    section.hero {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    #starfield {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    .hero-content {
        position: relative;
        z-index: 2;
        max-width: 780px;
        margin: 0 auto;
        padding: 0 1.5rem;
        text-align: center;
    }

    .hero-content h1 {
        font-size: clamp(2.5rem, 5vw, 3.5rem);
        margin-bottom: 1rem;
        letter-spacing: 0.03em;
    }

    .hero-content p {
        font-size: clamp(1.1rem, 2.5vw, 1.35rem);
        color: var(--text-secondary);
        margin-bottom: 2rem;
    }

    .hero-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }

    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.8rem 1.9rem;
        border-radius: var(--radius-button);
        font-weight: 600;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
        border: none;
        outline: none;
    }

    .btn-primary {
        background: linear-gradient(135deg, var(--accent-blue), var(--accent-green));
        color: var(--text-primary);
        box-shadow: 0 0 24px rgba(59, 130, 246, 0.35);
    }

    .btn-secondary {
        background: rgba(26, 31, 58, 0.75);
        color: var(--text-primary);
        border: 1px solid var(--glass-border);
        box-shadow: 0 12px 30px rgba(9, 12, 32, 0.45);
    }

    .btn:hover,
    .btn:focus,
    .btn-active {
        transform: translateY(-3px);
        box-shadow: 0 0 28px rgba(16, 185, 129, 0.4);
    }

    .btn-active {
        box-shadow: 0 0 30px rgba(59, 130, 246, 0.45);
    }

    .scroll-indicator {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        width: 28px;
        height: 48px;
        border: 2px solid rgba(255, 255, 255, 0.35);
        border-radius: 16px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 8px;
        opacity: 0.6;
    }

    .scroll-indicator span {
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--accent-blue);
        animation: scrollpulse 1.8s infinite;
    }

    @keyframes scrollpulse {
        0% { transform: translateY(0); opacity: 1; }
        60% { transform: translateY(18px); opacity: 0; }
        100% { transform: translateY(0); opacity: 0; }
    }

    .section {
        padding: clamp(4rem, 10vw, 6rem) 1.5rem;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
    }

    .section-title {
        font-size: clamp(2rem, 4vw, 2.25rem);
        margin-bottom: 2rem;
        text-align: center;
    }

    .section-subtext {
        text-align: center;
        color: var(--text-secondary);
        max-width: 640px;
        margin: 0 auto 2.5rem;
    }

    .glass-card {
        background: var(--bg-card);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-card);
        backdrop-filter: blur(18px);
        box-shadow: var(--shadow);
        padding: 1.75rem;
        transition: transform 0.35s ease, box-shadow 0.35s ease;
    }

    .glass-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 24px 40px rgba(10, 13, 35, 0.55);
    }

    .cards-grid {
        display: grid;
        gap: 1.5rem;
    }

    .cards-grid.three {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .cards-grid.four {
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }

    .card-icon {
        width: 48px;
        height: 48px;
        margin-bottom: 1.25rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 14px;
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.45), rgba(16, 185, 129, 0.3));
    }

    .card-icon svg {
        width: 24px;
        height: 24px;
        fill: var(--text-primary);
    }

    .card-title {
        font-size: 1.15rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
    }

    .card-text {
        color: var(--text-secondary);
        font-size: 0.95rem;
    }

    .process-flow {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 1rem;
        margin-bottom: 2.5rem;
        align-items: start;
    }

    .process-step {
        position: relative;
        text-align: center;
        padding: 1.5rem;
    }

    .process-step::after {
        content: '→';
        position: absolute;
        right: -0.75rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--accent-blue);
        opacity: 0.7;
        font-size: 1.5rem;
    }

    .process-step:last-child::after {
        display: none;
    }

    .tech-stack {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem;
    }

    .tech-pill {
        padding: 0.5rem 1.1rem;
        border-radius: 999px;
        background: rgba(59, 130, 246, 0.15);
        color: var(--accent-blue);
        border: 1px solid rgba(59, 130, 246, 0.25);
        font-size: 0.95rem;
    }

    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        text-align: center;
    }

    .metric-value {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }

    .metric-label {
        font-size: 1rem;
        color: var(--text-secondary);
    }

    .demo-area {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }

    .demo-visual {
        position: relative;
        height: 260px;
        border-radius: var(--radius-card);
        border: 1px dashed rgba(148, 163, 184, 0.25);
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(15, 23, 42, 0.55));
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        text-align: center;
    }

    .demo-visual::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, rgba(59, 130, 246, 0.25), transparent, rgba(16, 185, 129, 0.2));
        opacity: 0.3;
        animation: shimmer 4s linear infinite;
    }

    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }

    .demo-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
    }

    .demo-output {
        background: rgba(26, 31, 58, 0.65);
        border-radius: var(--radius-card);
        padding: 1.5rem;
        border: 1px solid var(--glass-border);
    }

    .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1.5rem;
    }

    .team-member img {
        width: 100%;
        height: 220px;
        object-fit: cover;
        border-radius: 12px;
        margin-bottom: 1rem;
    }

    .footer-cta {
        text-align: center;
        padding: 4rem 1.5rem;
        background: rgba(15, 20, 45, 0.7);
        border-top: 1px solid var(--glass-border);
        backdrop-filter: blur(12px);
    }

    .footer-links {
        margin-top: 1.5rem;
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        color: var(--text-secondary);
        font-size: 0.95rem;
    }

    .footer-links a {
        color: var(--text-secondary);
        transition: color 0.3s ease;
    }

    .footer-links a:hover,
    .footer-links a:focus {
        color: var(--text-primary);
    }

    .reveal {
        opacity: 0;
        transform: translateY(32px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .reveal.visible {
        opacity: 1;
        transform: translateY(0);
    }

    @media (max-width: 768px) {
        .nav-links {
            gap: 0.75rem;
        }

        .nav-links a {
            font-size: 0.9rem;
        }

        .process-step::after {
            display: none;
        }

        .demo-area {
            grid-template-columns: 1fr;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    }
`;

const svgIcon = (path) => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={path} />
    </svg>
);

const processDescriptions = [
    {
        title: 'Upload',
        text: 'Securely ingest TESS light curves or custom mission data with one click.'
    },
    {
        title: 'AI Analysis',
        text: 'Signal processing and feature extraction run on-edge with adaptive models.'
    },
    {
        title: 'Results in 5min',
        text: 'Ranked candidates and uncertainty metrics surface instantly for rapid vetting.'
    }
];

const featureCards = [
    {
        title: 'Single Prediction',
        text: 'Instant verdicts on candidate events with calibrated confidence scores.',
        icon: 'M12 4a1 1 0 0 1 .894.553l1.341 2.682 2.961.43a1 1 0 0 1 .556 1.705l-2.141 2.088.505 2.947a1 1 0 0 1-1.452 1.054L12 14.347l-2.664 1.402a1 1 0 0 1-1.452-1.054l.505-2.947-2.141-2.088a1 1 0 0 1 .556-1.705l2.961-.43 1.341-2.682A1 1 0 0 1 12 4Z'
    },
    {
        title: 'Batch Analysis',
        text: 'Upload mission archives and retrieve ranked results at constellation scale.',
        icon: 'M5 4h3a1 1 0 0 1 1 1v3H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm0 9h3a1 1 0 0 1 1 1v5H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Zm8-9h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-6V5a1 1 0 0 1 1-1Zm0 9h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-6v-5a1 1 0 0 1 1-1Z'
    },
    {
        title: 'Explainable AI',
        text: 'Visual feature attribution highlights why candidates pass vetting.',
        icon: 'M5 5h14v14H5zm2 4v6h10V9l-5 3Z'
    },
    {
        title: 'Model Transparency',
        text: 'Versioned pipelines, audit logs, and reproducible runs for mission assurance.',
        icon: 'M12 2a10 10 0 1 0 10 10A10.012 10.012 0 0 0 12 2Zm1 14h-2v-2h2Zm0-4h-2V7h2Z'
    }
];

const challengeCards = [
    {
        title: '1M light curves per month from TESS',
        text: 'Data volume from NASA missions pushes existing workflows beyond human scale.',
        icon: 'M20 5H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6l2 3 2-3h6a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 10H4V7h16Z'
    },
    {
        title: 'Manual review takes days',
        text: 'Scientists sift through thousands of signals to validate each exoplanet candidate.',
        icon: 'M12 3a1 1 0 0 1 1 1v1.07a7.002 7.002 0 0 1 5.657 5.657H20a1 1 0 1 1 0 2h-1.07A7.002 7.002 0 0 1 13 18.93V20a1 1 0 1 1-2 0v-1.07A7.002 7.002 0 0 1 5.343 12.657H4a1 1 0 1 1 0-2h1.07A7.002 7.002 0 0 1 11 5.07V4a1 1 0 0 1 1-1Zm0 4a5 5 0 1 0 5 5 5.006 5.006 0 0 0-5-5Z'
    },
    {
        title: '96% are false positives',
        text: 'Instrumental noise mimics planetary transits, wasting valuable telescope time.',
        icon: 'M12 2a10 10 0 1 0 10 10A10.012 10.012 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm3-11.5L10.5 15A1.5 1.5 0 0 1 8.4 13.4l4-5a1.5 1.5 0 1 1 2.4 1.8Z'
    }
];

const teamMembers = [
    {
        name: 'Alex Martinez',
        role: 'Astrophysicist & Data Scientist',
        photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=60'
    },
    {
        name: 'Jordan Lee',
        role: 'ML Engineer & Platform Architect',
        photo: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=60'
    },
    {
        name: 'Priya Singh',
        role: 'Product Lead & UX Researcher',
        photo: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=60'
    }
];

const metrics = [
    {
        label: 'Recall on NASA Exoplanet Archive benchmarks.',
        target: 96,
        suffix: '%'
    },
    {
        label: 'AUC score demonstrating robustness to noise.',
        target: 94.8,
        suffix: ''
    },
    {
        label: 'Total training time with GPU acceleration.',
        target: 5,
        suffix: 'min'
    }
];

const techPills = [
    'TSFRESH Feature Engineering',
    'LightGBM Classifier',
    '96% Recall on Validation'
];

const App = () => {
    const heroRef = useRef(null);
    const canvasRef = useRef(null);
    const animationRef = useRef();
    const countersRef = useRef([]);
    const [activeScenario, setActiveScenario] = useState('planet');

    const scenarios = useMemo(() => ({
        planet: {
            waveform: 'Stable transit signature detected at 2.1% depth.',
            result: 'Likely Exoplanet',
            confidence: '97.4%',
            snr: '12.8',
            followUp: 'Prioritize spectroscopic observations.'
        },
        falsePositive: {
            waveform: 'Irregular fluctuation consistent with stellar variability.',
            result: 'False Positive',
            confidence: '88.1%',
            snr: '3.2',
            followUp: 'Flag for automated reprocessing only.'
        }
    }), []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const hero = heroRef.current;
        if (!canvas || !hero) {
            return;
        }
        const ctx = canvas.getContext('2d');
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

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const revealElements = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            revealElements.forEach(el => el.classList.add('visible'));
            return undefined;
        }

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        revealElements.forEach(el => revealObserver.observe(el));

        return () => revealObserver.disconnect();
    }, []);

    useEffect(() => {
        const counterElements = countersRef.current;
        if (!counterElements.length) {
            return undefined;
        }

        if (!('IntersectionObserver' in window)) {
            counterElements.forEach(el => {
                const target = parseFloat(el.dataset.target || '0');
                const suffix = el.dataset.suffix || '';
                el.textContent = `${target}${suffix}`;
            });
            return undefined;
        }

        const runCounter = (el) => {
            const target = parseFloat(el.dataset.target || '0');
            const suffix = el.dataset.suffix || '';
            const duration = 1500;
            const startTime = performance.now();

            const updateCounter = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const value = target * eased;
                const formatted = target % 1 !== 0 ? value.toFixed(1) : Math.round(value);
                el.textContent = `${formatted}${suffix}`;
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };

            requestAnimationFrame(updateCounter);
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterElements.forEach(el => counterObserver.observe(el));

        return () => counterObserver.disconnect();
    }, []);

    const activeScenarioData = scenarios[activeScenario];

    const handleSmoothScroll = (event, selector) => {
        event.preventDefault();
        const target = document.querySelector(selector);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            <style>{globalStyles}</style>
            {/* Sticky navigation */}
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

            <header>
                <section className="hero" id="top" ref={heroRef}>
                    <canvas id="starfield" ref={canvasRef} aria-hidden="true" />
                    <div className="hero-content" data-section>
                        <h1>Exoplanet Detection AI</h1>
                        <p>Finding New Worlds with Machine Learning</p>
                        <div className="hero-actions">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={(event) => handleSmoothScroll(event, '#demo')}
                            >
                                Try It Now
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={(event) => handleSmoothScroll(event, '#demo')}
                            >
                                View Demo
                            </button>
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
                            {challengeCards.map(card => (
                                <div key={card.title} className="glass-card">
                                    <div className="card-icon">
                                        {svgIcon(card.icon)}
                                    </div>
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
                            {processDescriptions.map(step => (
                                <div key={step.title} className="process-step">
                                    <div className="card-title">{step.title}</div>
                                    <div className="card-text">{step.text}</div>
                                </div>
                            ))}
                        </div>
                        <div className="tech-stack">
                            {techPills.map(pill => (
                                <span key={pill} className="tech-pill">{pill}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Metrics with counters */}
                <section className="section" id="metrics" data-section>
                    <div className="container reveal">
                        <h2 className="section-title">Mission Metrics</h2>
                        <p className="section-subtext">Validated results tracked across nightly runs and real-world deployments.</p>
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
                            {featureCards.map(card => (
                                <div key={card.title} className="glass-card feature-card">
                                    <div className="card-icon">
                                        {svgIcon(card.icon)}
                                    </div>
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
                        <p className="section-subtext">Simulate classifications before connecting to mission data feeds.</p>
                        <div className="demo-area">
                            <div className="demo-visual glass-card" id="demo-visual">
                                <div id="demo-waveform">{activeScenarioData.waveform}</div>
                            </div>
                            <div className="demo-controls glass-card">
                                <div className="card-title">Sample Scenarios</div>
                                <p className="card-text">Select a scenario to preview confidence metrics from the AI pipeline.</p>
                                <div className="demo-controls">
                                    <button
                                        type="button"
                                        className={`btn btn-secondary ${activeScenario === 'planet' ? 'btn-active' : ''}`}
                                        onClick={() => setActiveScenario('planet')}
                                    >
                                        Known Planet
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn btn-secondary ${activeScenario === 'falsePositive' ? 'btn-active' : ''}`}
                                        onClick={() => setActiveScenario('falsePositive')}
                                    >
                                        False Positive
                                    </button>
                                </div>
                                <div className="demo-output" id="demo-output">
                                    <div className="card-title">Prediction</div>
                                    <p className="card-text">
                                        <strong>Result:</strong> {activeScenarioData.result}<br />
                                        <strong>Confidence:</strong> {activeScenarioData.confidence}<br />
                                        <strong>Signal-to-Noise:</strong> {activeScenarioData.snr}<br />
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
                        <p className="section-subtext">Built at NASA Space Apps Challenge 2025 by interdisciplinary explorers.</p>
                        <div className="team-grid">
                            {teamMembers.map(member => (
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
                <p className="section-subtext">Deploy ExoDetect AI with your mission data and accelerate the search for habitable exoplanets.</p>
                <a className="btn btn-primary btn-glow" href="/app">Launch Application</a>
                <div className="footer-links">
                    <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
                    <a href="https://docs.nasa.gov" target="_blank" rel="noreferrer">Documentation</a>
                    <a href="mailto:contact@exodetect.ai">Contact</a>
                </div>
            </footer>
        </>
    );
};

export default App;

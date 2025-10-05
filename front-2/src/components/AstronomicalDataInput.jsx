import React from "react";

const AstronomicalDataInput = ({ formData, handleInputChange }) => {
  return (
    <div className="glass-card">
      <div
        style={{
          marginBottom: "1.5rem",
        }}
      >
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            margin: 0,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          Astronomical Data Input
        </h2>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="mass">Mass (Earth masses) *</label>
          <input
            type="number"
            id="mass"
            name="mass"
            value={formData.mass}
            onChange={handleInputChange}
            placeholder="e.g., 1.0"
            step="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="radius">Radius (Earth radii) *</label>
          <input
            type="number"
            id="radius"
            name="radius"
            value={formData.radius}
            onChange={handleInputChange}
            placeholder="e.g., 1.0"
            step="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="temperature">Temperature (K) *</label>
          <input
            type="number"
            id="temperature"
            name="temperature"
            value={formData.temperature}
            onChange={handleInputChange}
            placeholder="e.g., 288"
            step="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="orbitalPeriod">Orbital Period (days) *</label>
          <input
            type="number"
            id="orbitalPeriod"
            name="orbitalPeriod"
            value={formData.orbitalPeriod}
            onChange={handleInputChange}
            placeholder="e.g., 365"
            step="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="semiMajorAxis">Semi-major Axis (AU)</label>
          <input
            type="number"
            id="semiMajorAxis"
            name="semiMajorAxis"
            value={formData.semiMajorAxis}
            onChange={handleInputChange}
            placeholder="e.g., 1.0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="eccentricity">Eccentricity</label>
          <input
            type="number"
            id="eccentricity"
            name="eccentricity"
            value={formData.eccentricity}
            onChange={handleInputChange}
            placeholder="e.g., 0.0167"
            step="0.001"
            min="0"
            max="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="stellarMass">Stellar Mass (Solar masses)</label>
          <input
            type="number"
            id="stellarMass"
            name="stellarMass"
            value={formData.stellarMass}
            onChange={handleInputChange}
            placeholder="e.g., 1.0"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="stellarRadius">Stellar Radius (Solar radii)</label>
          <input
            type="number"
            id="stellarRadius"
            name="stellarRadius"
            value={formData.stellarRadius}
            onChange={handleInputChange}
            placeholder="e.g., 1.0"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="stellarTemperature">Stellar Temperature (K)</label>
          <input
            type="number"
            id="stellarTemperature"
            name="stellarTemperature"
            value={formData.stellarTemperature}
            onChange={handleInputChange}
            placeholder="e.g., 5778"
            step="1"
          />
        </div>
      </div>
    </div>
  );
};

export default AstronomicalDataInput;

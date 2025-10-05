const selectDataset = async (dataset) => {
    setShowDatasetModal(false);
    setError("");

    try {
      // Load dataset preview data from backend
      const response = await fetch(
        `http://localhost:8000/datasets/${dataset.id}/preview`
      );
      if (response.ok) {
        const previewData = await response.json();
        setDatasetPreview(previewData);
        setShowPreview(true);
      } else {
        // Fallback to specific dataset data based on dataset ID
        let datasetData;

        if (dataset.id === "kepler") {
          datasetData = {
            name: "Kepler Exoplanet Dataset",
            description:
              "NASA's Kepler mission discovered thousands of exoplanets using the transit method",
            totalRows: 9705,
            columns: [
              {
                name: "kepoi_name",
                type: "string",
                description: "Kepler Object of Interest name",
              },
              {
                name: "kepler_name",
                type: "string",
                description: "Confirmed Kepler planet name",
              },
              {
                name: "koi_period",
                type: "float",
                description: "Orbital period in days",
              },
              {
                name: "koi_prad",
                type: "float",
                description: "Planet radius in Earth radii",
              },
              {
                name: "koi_teq",
                type: "float",
                description: "Planet equilibrium temperature in Kelvin",
              },
              {
                name: "koi_insol",
                type: "float",
                description: "Planet insolation flux",
              },
              {
                name: "koi_duration",
                type: "float",
                description: "Transit duration in hours",
              },
              {
                name: "koi_depth",
                type: "float",
                description: "Transit depth",
              },
              {
                name: "koi_sma",
                type: "float",
                description: "Semi-major axis in AU",
              },
              {
                name: "koi_eccen",
                type: "float",
                description: "Orbital eccentricity",
              },
            ],
            sampleData: [
              {
                kepoi_name: "K00752.01",
                kepler_name: "Kepler-227 b",
                koi_period: 9.48803557,
                koi_prad: 2.26,
                koi_teq: 793.0,
                koi_insol: 93.59,
                koi_duration: 6.158,
                koi_depth: 0.022344,
                koi_sma: 0.0853,
                koi_eccen: 0.0,
              },
              {
                kepoi_name: "K00753.01",
                kepler_name: "Kepler-227 c",
                koi_period: 54.418733,
                koi_prad: 1.85,
                koi_teq: 450.0,
                koi_insol: 25.2,
                koi_duration: 4.2,
                koi_depth: 0.0156,
                koi_sma: 0.28,
                koi_eccen: 0.0,
              },
              {
                kepoi_name: "K00754.01",
                kepler_name: "Kepler-228 b",
                koi_period: 2.566551,
                koi_prad: 0.95,
                koi_teq: 1200.0,
                koi_insol: 150.0,
                koi_duration: 2.1,
                koi_depth: 0.0089,
                koi_sma: 0.035,
                koi_eccen: 0.0,
              },
              {
                kepoi_name: "K00755.01",
                kepler_name: "Kepler-228 c",
                koi_period: 4.134286,
                koi_prad: 1.2,
                koi_teq: 950.0,
                koi_insol: 95.0,
                koi_duration: 2.8,
                koi_depth: 0.0123,
                koi_sma: 0.048,
                koi_eccen: 0.0,
              },
              {
                kepoi_name: "K00756.01",
                kepler_name: "Kepler-228 d",
                koi_period: 11.094286,
                koi_prad: 2.1,
                koi_teq: 650.0,
                koi_insol: 45.0,
                koi_duration: 3.5,
                koi_depth: 0.0187,
                koi_sma: 0.092,
                koi_eccen: 0.0,
              },
            ],
            statistics: {
              koi_period: { min: 0.5, max: 1000.0, mean: 45.2, std: 120.5 },
              koi_prad: { min: 0.1, max: 15.0, mean: 2.1, std: 2.8 },
              koi_teq: { min: 200, max: 3000, mean: 850, std: 450 },
              koi_insol: { min: 1.0, max: 10000.0, mean: 150.0, std: 800.0 },
              koi_sma: { min: 0.01, max: 5.0, mean: 0.15, std: 0.4 },
              koi_eccen: { min: 0.0, max: 0.9, mean: 0.05, std: 0.15 },
            },
          };
        } else if (dataset.id === "tess") {
          datasetData = {
            name: "TESS Exoplanet Dataset",
            description:
              "NASA's TESS mission continues the search for exoplanets around bright nearby stars",
            totalRows: 7796,
            columns: [
              {
                name: "toi",
                type: "string",
                description: "TESS Object of Interest identifier",
              },
              {
                name: "pl_orbper",
                type: "float",
                description: "Orbital period in days",
              },
              {
                name: "pl_rade",
                type: "float",
                description: "Planet radius in Earth radii",
              },
              {
                name: "pl_eqt",
                type: "float",
                description: "Planet equilibrium temperature in Kelvin",
              },
              {
                name: "pl_insol",
                type: "float",
                description: "Planet insolation flux",
              },
              {
                name: "pl_trandurh",
                type: "float",
                description: "Transit duration in hours",
              },
              {
                name: "pl_trandep",
                type: "float",
                description: "Transit depth",
              },
              {
                name: "st_teff",
                type: "float",
                description: "Stellar effective temperature in Kelvin",
              },
              {
                name: "st_rad",
                type: "float",
                description: "Stellar radius in Solar radii",
              },
              {
                name: "st_tmag",
                type: "float",
                description: "TESS magnitude",
              },
            ],
            sampleData: [
              {
                toi: "1001.01",
                pl_orbper: 1.9316462,
                pl_rade: 11.2154,
                pl_eqt: 4045.0,
                pl_insol: 44464.5,
                pl_trandurh: 3.166,
                pl_trandep: 1286.0,
                st_teff: 7070.0,
                st_rad: 2.01,
                st_tmag: 9.42344,
              },
              {
                toi: "1002.01",
                pl_orbper: 1.8675574,
                pl_rade: 23.7529,
                pl_eqt: 2037.0,
                pl_insol: 2860.61,
                pl_trandurh: 1.408,
                pl_trandep: 1500.0,
                st_teff: 8924.0,
                st_rad: 5.73,
                st_tmag: 9.299501,
              },
              {
                toi: "1003.01",
                pl_orbper: 0.789282,
                pl_rade: 2.2,
                pl_eqt: 1200.0,
                pl_insol: 15000.0,
                pl_trandurh: 1.5,
                pl_trandep: 500.0,
                st_teff: 6000.0,
                st_rad: 1.2,
                st_tmag: 10.5,
              },
              {
                toi: "1004.01",
                pl_orbper: 3.456789,
                pl_rade: 1.8,
                pl_eqt: 800.0,
                pl_insol: 8000.0,
                pl_trandurh: 2.1,
                pl_trandep: 300.0,
                st_teff: 5500.0,
                st_rad: 0.95,
                st_tmag: 11.2,
              },
              {
                toi: "1005.01",
                pl_orbper: 0.456789,
                pl_rade: 1.5,
                pl_eqt: 1500.0,
                pl_insol: 20000.0,
                pl_trandurh: 1.2,
                pl_trandep: 200.0,
                st_teff: 6500.0,
                st_rad: 1.1,
                st_tmag: 9.8,
              },
            ],
            statistics: {
              pl_orbper: { min: 0.1, max: 100.0, mean: 5.2, std: 8.7 },
              pl_rade: { min: 0.5, max: 25.0, mean: 2.8, std: 3.2 },
              pl_eqt: { min: 200, max: 5000, mean: 1200, std: 800 },
              st_teff: { min: 3000, max: 10000, mean: 5800, std: 1200 },
              st_rad: { min: 0.3, max: 10.0, mean: 1.2, std: 1.5 },
              st_tmag: { min: 6.0, max: 16.0, mean: 11.5, std: 2.1 },
            },
          };
        } else {
          // Generic fallback for other datasets
          datasetData = {
            name: dataset.name,
            description: dataset.description,
            totalRows: Math.floor(Math.random() * 1000) + 100,
            columns: [
              {
                name: "mass",
                type: "float",
                description: "Planet mass in Earth masses",
              },
              {
                name: "radius",
                type: "float",
                description: "Planet radius in Earth radii",
              },
              {
                name: "temperature",
                type: "float",
                description: "Planet temperature in Kelvin",
              },
              {
                name: "orbital_period",
                type: "float",
                description: "Orbital period in days",
              },
              {
                name: "semi_major_axis",
                type: "float",
                description: "Semi-major axis in AU",
              },
              {
                name: "eccentricity",
                type: "float",
                description: "Orbital eccentricity",
              },
              {
                name: "stellar_mass",
                type: "float",
                description: "Stellar mass in Solar masses",
              },
              {
                name: "stellar_radius",
                type: "float",
                description: "Stellar radius in Solar radii",
              },
              {
                name: "stellar_temperature",
                type: "float",
                description: "Stellar temperature in Kelvin",
              },
            ],
            sampleData: [
              {
                mass: 1.0,
                radius: 1.0,
                temperature: 288,
                orbital_period: 365.25,
                semi_major_axis: 1.0,
                eccentricity: 0.0167,
                stellar_mass: 1.0,
                stellar_radius: 1.0,
                stellar_temperature: 5778,
              },
              {
                mass: 0.107,
                radius: 0.532,
                temperature: 210,
                orbital_period: 687,
                semi_major_axis: 1.52,
                eccentricity: 0.0934,
                stellar_mass: 1.0,
                stellar_radius: 1.0,
                stellar_temperature: 5778,
              },
              {
                mass: 317.8,
                radius: 11.21,
                temperature: 165,
                orbital_period: 4333,
                semi_major_axis: 5.2,
                eccentricity: 0.0489,
                stellar_mass: 1.0,
                stellar_radius: 1.0,
                stellar_temperature: 5778,
              },
            ],
            statistics: {
              mass: { min: 0.01, max: 1000, mean: 45.2, std: 120.5 },
              radius: { min: 0.1, max: 50, mean: 3.2, std: 8.7 },
              temperature: { min: 50, max: 3000, mean: 450, std: 650 },
            },
          };
        }

        setDatasetPreview(datasetData);
        setShowPreview(true);
      }
    } catch (err) {
      setError(`Failed to load dataset preview: ${err.message}`);
    }
  };
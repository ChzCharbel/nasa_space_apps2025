import { configureStore, createSlice } from "@reduxjs/toolkit";

const dashboardStoreSlice = createSlice({
  name: 'dashboardStore',
  initialState: {
    formData: [
        { key: "pl_radeerr1", label: "Transit Midpoint", step: "0.0001" },
        { key: "st_rad", label: "Star Radius", step: "0.01" },
        { key: "pl_orbper", label: "Orbital Period", step: "0.01" },
        { key: "st_dist", label: "Star Distance", step: "0.1" },
        { key: "st_disterr2", label: "Star Distance", step: "0.1" },
        { key: "pl_trandep", label: "Transit Depth", step: "0.001" },
        { key: "pl_rade", label: "Planet Radius", step: "0.01" },
        { key: "st_pmra", label: "Star Angular Motion", step: "0.01" },
        { key: "pl_orbpererr2", label: "Orbit Period Error Lower", step: "0.01" },
        { key: "pl_tranmiderr", label: "Lower limit uncertainty of midpoint transit", step: "0.01"},
        { key: "pl_tranmid", lable: "Average Time from Beginning to End of crossing stellar limb", step: "0.1" },
        { key: "pl_eqt", label: "Equilibrium Temp", step: "1" },
        { key: "st_tmag", label: "Star Brightness", step: "0.1" },
        { key: "starTemp", label: "Star Temp", step: "1" },
        { key: "pl_trandeperr1", label: "Transit Depth Error Upper", step: "0.1" },
        { key: "pl_trandeperr2", label: "Transit Depth Error Lower", step: "0.1" },
        { key: "pl_orbpererr1", label: "Orbit Period Error Upper", step: "0.01" },
        { key: "st_logg", label: "Surface Gravity", step: "0.1" },
        { key: "pl_insol", label: "Stellar Irradiance", step: "0.1" },
        { key: "st_tefferr2", label: "Temp Error Lower", step: "0.1" },
        { key: "st_teff", label: "Effective Star Temp", step: "0.1" },
        { key: "st_disterr1", label: "Temp Error Upper", step: "0.1" },
        { key: "pl_trandurh", label: "Transit Duration", step: "0.1" },
        { key: "pl_trandurherr1", label: "Transit Duration Error", step: "0.1" },
        { key: "pl_tranmiderr1", label: "Transit Midpoint Error", step: "0.1" }
    ],
    availableDatasets: [
        {
          id: "kepler",
          name: "Kepler",
          description: "Kepler mission exoplanet data",
        },
        {
          id: "k2",
          name: "K2",
          description: "Kepler mission extended data",
        },
        {
          id: "tess",
          name: "TESS",
          description: "TESS mission exoplanet data",
        },
    ],
    isLoadingDatasets: false,
    selectedDataset: "",
    analyzedDataset: null,
    analysisResult: "",
    // singleAnalysisResult: null,
    // datasetAnalysisResult: null,
    datasetEmpty: false,
    dataset: [],
    formDataError: "",
    datasetTableError: "",
    csvUploadError: "",
    resultsError: "",
    isUploading: false,
    isAnalyzing: false,
    hyperparameters: {
        num_leaves: [15, 31, 63],
        max_depth: [-1, 5, 10],
        learning_rate: [0.01, 0.05, 0.1],
        n_estimators: [100, 300, 500],
        min_child_samples: [20, 50]
    },
  },
  reducers: {
    setFormData: (state, action) => { state.formData = action.payload },
    setAvailableDatasets: (state, action) => { state.availableDatasets = action.payload },
    setIsLoadingDatasets: (state, action) => { state.isLoadingDatasets = action.payload },
    setSelectedDataset: (state, action) => { state.selectedDataset = action.payload },
    setAnalysisResult: (state, action) => { state.analysisResult = action.payload },
    setAnalyzedDataset: (state, action) => { state.analyzedDataset = action.payload },
    // setSingleAnalysisResult: (state, action) => { state.singleAnalysisResult = action.payload },
    // setDatasetAnalysisResult: (state, action) => { state.datasetAnalysisResult = action.payload },
    setDatasetEmpty: (state, action) => { state.datasetEmpty = action.payload },
    setDataset: (state, action) => { state.dataset = action.payload },
    setFormDataError: (state, action) => { state.formDataError = action.payload },
    setDatasetTableError: (state, action) => { state.datasetTableError = action.payload },
    setCsvUploadError: (state, action) => { state.csvUploadError = action.payload },
    setResultsError: (state, action) => { state.resultsError = action.payload },
    setIsUploading: (state, action) => { state.isUploading = action.payload },
    setIsAnalyzing: (state, action) => { state.isAnalyzing = action.payload },
    setHyperparameters: (state, action) => { state.hyperparameters = action.payload },
    setFormDataError: (state, action) => { state.formDataError = action.payload },
    setDatasetTableError: (state, action) => { state.datasetTableError = action.payload },
    setCsvUploadError: (state, action) => { state.csvUploadError = action.payload },
    setResultsError: (state, action) => { state.resultsError = action.payload },
    resetAll: () => initialState,
  },
});

export const {
  setFormData, setAvailableDatasets, setIsLoadingDatasets,
  setSelectedDataset, setAnalysisResult, // setDatasetAnalysisResult,
  setDatasetEmpty, setDataset, setFormDataError,
  setDatasetTableError, setCsvUploadError, setResultsError,
  setIsUploading, setIsAnalyzing, setHyperparameters,
  resetAll, setAnalyzedDataset
} = dashboardStoreSlice.actions;

export const createDashboardStore = () => configureStore({
    reducer: { dashboardStore: dashboardStoreSlice.reducer }
})

export const getFormData = (state) => {
    const sd = state.dashboardStore;
    const completeFormData = sd.topFormDataFields + sd.secondaryFormDataFields
    return completeFormData
}

export const getAnalysisResult = (analyzedData) => {
    if (!analyzedData) return "No data to get analysis from"
    else if (analyzedData.length == 1) {
        // UPDATE: the real name of the classifications column
        // find way to get analysis of the actual results
        return "This is fake analysis of a single observation"
    } else {
        let planets = 0
        let candidates = 0
        let ambiguous = 0
        let non_planets = 0
        analyzedData.map((row) => {
            if (!row.classification) return
            if (row.classification == 3) planets++
            if (row.classification == 2) candidates++
            if (row.classification == 1) ambiguous++
            if (row.classification == 0) non_planets++
        })
        return {
            planets: planets,
            candidates: candidates,
            ambiguous: ambiguous,
            non_planets: non_planets
        }
    }
}
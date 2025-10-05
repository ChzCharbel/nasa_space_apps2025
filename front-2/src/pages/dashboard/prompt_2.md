# Dashboard Refactoring Requirements - Comprehensive Specification

## Project Overview
This is an exoplanet analysis application with a React frontend (using Redux for state management) and a FastAPI backend. The backend connects to a trained AI model for exoplanet classification. The dashboard allows users to input astronomical observations, load pre-existing datasets, and analyze them using the ML model.

---

## Current Architecture Issues

### State Management Problems
1. The Redux store (`store.js`) has duplicate reducer definitions (lines 90-93 duplicate lines 83-86)
2. Form data structure is inconsistent - it's defined as an array of field objects but used as a key-value object
3. Multiple error states exist but aren't properly utilized across components
4. The `getAnalysisResult` function in the store performs client-side analysis logic that should come from the backend

### Component Integration Issues
1. **AstronomicalDataInput**: Currently calls `/analyze-observation` API directly, but should instead add observations to a local dataset array
2. **DatasetActionButtons**: Has broken Redux hooks (using `useDispatch` incorrectly) and references undefined state setters
3. **DatasetTable**: Hardcoded to show no data; not connected to Redux store
4. **Results**: Not connected to Redux store; receives props that are never passed from parent

### Backend Incompleteness
1. The `/analyze-dataset` endpoint doesn't read the request body
2. The `/upload-csv` endpoint doesn't return meaningful data
3. Analysis functions in `services/analisis.py` are empty stubs
4. No model integration is implemented

---

## Required Functionality - Detailed Specifications

### 1. AstronomicalDataInput Component

#### Visual Requirements
- Display only the **first 10 fields** from `formData` by default
- Use a **compact, space-efficient layout** (2-3 columns on desktop, 1 column on mobile)
- Minimize vertical height while maintaining readability
- Show labels **above** each input field
- Each input should have:
  - A default value (pre-populated)
  - A placeholder when empty
  - Proper step values for number inputs (as defined in store)

#### Expandable Fields
- Include a "Show More Fields" button that reveals the remaining fields
- When expanded, show all 25 fields from the store
- Button should toggle between "Show More Fields" and "Show Less"
- Smooth transition animation when expanding/collapsing

#### Form Interaction
- When user edits any field, update the corresponding value in Redux store's `formData`
- Real-time validation (ensure numeric fields only accept numbers)
- Visual feedback for invalid inputs

#### Button Behavior - **CRITICAL CHANGE**
- The current "Run Analysis" button should be **renamed to "Add to Dataset"**
- This button should:
  1. Validate that all required fields have values
  2. Create a new row object from the current form data
  3. Append this row to the `dataset` array in Redux store
  4. Show a success notification/toast
  5. Optionally clear the form or keep values for quick entry of similar observations
  6. **NOT call any backend API** - this is purely a frontend state operation

#### Error Handling
- Display `formDataError` from Redux store if present
- Show field-level validation errors
- Disable "Add to Dataset" button if form is invalid

---

### 2. DatasetTable Component

#### Core Functionality
- **Connect to Redux store** and display the `dataset` array
- Show a **maximum of 10 rows at a time** with pagination controls
- Display all relevant columns from the dataset (may need horizontal scroll)
- If dataset is empty, show a helpful placeholder message

#### Table Features
- Column headers should match the field labels from `formData`
- Rows should be numbered (1, 2, 3, etc.)
- Include a delete button for each row (to remove observations before analysis)
- **Each row should be clickable** - clicking a row triggers single observation analysis
- Highlight the most recently added row briefly
- Highlight the currently selected/analyzed row (if analyzing single observation)
- Show total row count (e.g., "Showing 1-10 of 47 observations")

#### Pagination
- "Previous" and "Next" buttons
- Page number indicator
- Jump to first/last page buttons
- Disable buttons appropriately when at boundaries

#### Analysis Actions - **CRITICAL ADDITIONS**

**Single Observation Analysis** (Row Click):
- When user clicks on any row in the table:
  1. Highlight the selected row
  2. Set `isAnalyzing` to true
  3. Call the backend endpoint: `POST /analyze-observation`
  4. Send only that single observation object as JSON in the request body
  5. On success:
     - Store the response in `analyzedDataset` as a single-item array
     - Store detailed analysis in `analysisResult` (includes classification, confidence, feature importance, explanation)
     - Clear any previous errors
     - Results component will show detailed single-observation view
  6. On failure:
     - Display error in `datasetTableError` state
  7. Set `isAnalyzing` to false

**Full Dataset Analysis** (Analyze Dataset Button):
- Below the table, add a prominent **"Analyze Dataset"** button
- This button should:
  1. Be disabled if `dataset` array is empty
  2. Show loading state when `isAnalyzing` is true
  3. Call the backend endpoint: `POST /analyze-dataset`
  4. Send the entire `dataset` array as JSON in the request body
  5. On success:
     - Store the response in `analyzedDataset` in Redux (full dataset with classifications)
     - Store aggregate analysis in `analysisResult` (includes counts, model accuracy metrics, summary statistics)
     - Clear any previous errors
     - Results component will show aggregate statistics view
  6. On failure:
     - Display error in `datasetTableError` state
     - Keep the dataset intact for retry
  7. Set `isAnalyzing` to false

#### Additional Features
- "Clear All" button to empty the dataset (with confirmation dialog)
- Export dataset as CSV functionality (optional but useful)
- Visual indicator showing which dataset source is active (manual entry vs. loaded dataset)

---

### 3. DatasetActionButtons Component

#### Purpose
Provide two methods to populate the `dataset` array:
1. Load a pre-existing dataset from the backend
2. Upload a CSV file

#### Choose Dataset Dropdown
- Display the three available datasets from `availableDatasets` in Redux:
  - Kepler Objects of Interest
  - K2 Planets and Candidates  
  - TESS Objects of Interest (TOI)
- When a dataset is selected:
  1. Set `isLoadingDatasets` to true
  2. Call `GET /select-dataset/{datasetId}` where datasetId is "kepler", "k2", or "tess"
  3. Backend returns the cleaned CSV data from `resources/clean/{datasetId}_clean.csv`
  4. **Important**: Only take the **first 10 rows** from the response
  5. Replace the current `dataset` array in Redux with these 10 rows
  6. Update `selectedDataset` to the chosen dataset ID
  7. Show success notification
  8. Set `isLoadingDatasets` to false

#### CSV Upload Button
- File input that accepts `.csv` files only
- When a file is selected:
  1. Set `isUploading` to true
  2. Parse the CSV on the frontend to validate structure
  3. Extract column headers and map them to expected field names
  4. Convert CSV rows to array of objects matching the form data structure
  5. **Take only the first 10 rows** if CSV has more
  6. Replace the `dataset` array in Redux
  7. Optionally send to backend for validation via `POST /upload-csv`
  8. Show success/error notification
  9. Set `isUploading` to false

#### Error Handling
- Display `csvUploadError` for upload failures
- Display `datasetTableError` for dataset loading failures
- Validate CSV structure before accepting
- Show clear error messages for malformed files

#### User Experience
- Show loading spinners during operations
- Disable buttons during loading
- Clear previous dataset before loading new one (with confirmation if user has manual entries)
- Visual indication of which dataset is currently loaded

---

### 4. Results Component

#### Core Functionality
- **Connect to Redux store** to access:
  - `analysisResult`: The analysis output from the backend
  - `analyzedDataset`: The full analyzed dataset with classifications
  - `resultsError`: Any errors from the analysis
  - `isAnalyzing`: Loading state

#### Display Logic

**For Single Observation Analysis** (if `analyzedDataset` has 1 row):
- Show the classification result prominently (Planet, Candidate, Ambiguous, Non-Planet)
- Display confidence score/probability as a percentage
- **Explanation Section**: Show why this observation received its classification:
  - Key features that most influenced the decision (feature importance)
  - Comparison to typical values for each classification
  - Specific thresholds or patterns that led to the classification
  - Natural language explanation (e.g., "The transit depth and orbital period are consistent with a gas giant exoplanet")
- **Observation Details**:
  - Display the actual values of important parameters
  - Highlight unusual or noteworthy values
  - Show which features were most/least certain
- Visual indicator (icon, color) based on classification
- Option to view the raw prediction probabilities for all classes
- "Analyze Another" button to go back to table selection

**For Batch Dataset Analysis** (if `analyzedDataset` has multiple rows):
- **Classification Summary**:
  - Total observations analyzed
  - Count of Confirmed Planets (classification = 3)
  - Count of Candidates (classification = 2)
  - Count of Ambiguous (classification = 1)
  - Count of Non-Planets (classification = 0)
  - Display as a visual chart (pie chart or bar chart)
  - Show percentage breakdown
- **Model Performance Metrics**:
  - Overall accuracy (if ground truth is available)
  - Confidence distribution (how certain the model was across predictions)
  - Average confidence per classification type
  - Any warnings about low-confidence predictions
  - Model version/timestamp information
- **Statistical Insights**:
  - Summary statistics (e.g., "67% likely planets or candidates")
  - Distribution of key features across classifications
  - Outliers or unusual observations flagged
- **Export Options**:
  - Download full results as CSV (includes all observations with classifications)
  - Download summary report as PDF
  - Copy summary statistics to clipboard

**Empty State**:
- Show placeholder message: "No analysis results yet. Add observations and click 'Analyze Dataset' to begin."
- Include helpful icon/illustration

**Error State**:
- Display `resultsError` prominently
- Provide actionable suggestions (e.g., "Check your data format and try again")
- Option to retry analysis

#### Visual Design
- Use color coding:
  - Green for confirmed planets
  - Blue for candidates
  - Yellow for ambiguous
  - Red/gray for non-planets
- Smooth transitions when results update
- Loading skeleton while `isAnalyzing` is true

---

## Backend Requirements

### 1. Fix `/analyze-dataset` Endpoint (main.py, line 49-56)

**Current Issue**: Doesn't read request body

**Required Implementation**:
```python
@app.post("/analyze-dataset")
async def handle_dataset_analysis(observations: List[Dict]):
    """
    Receives an array of observation objects from frontend
    Each observation contains all the astronomical parameters
    Returns the dataset with added 'classification' field for each row
    Plus model performance metrics and summary statistics
    """
    try:
        result = await analyze_full_dataset(observations)
        
        # Calculate classification counts
        classifications = [r.get('classification') for r in result]
        
        # Calculate model metrics
        confidences = [r.get('confidence', 0) for r in result]
        avg_confidence = sum(confidences) / len(confidences) if confidences else 0
        
        return {
            "status": "success",
            "analyzed_data": result,
            "summary": {
                "total": len(result),
                "planets": sum(1 for c in classifications if c == 3),
                "candidates": sum(1 for c in classifications if c == 2),
                "ambiguous": sum(1 for c in classifications if c == 1),
                "non_planets": sum(1 for c in classifications if c == 0)
            },
            "model_metrics": {
                "average_confidence": avg_confidence,
                "low_confidence_count": sum(1 for c in confidences if c < 0.7),
                "high_confidence_count": sum(1 for c in confidences if c >= 0.9),
                "model_version": "1.0",  # Update with actual version
                "timestamp": datetime.now().isoformat()
            }
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
```

### 2. Implement `analyze_full_dataset` (services/analisis.py)

**Required Functionality**:
- Load the trained model from `models/modelo_exoplanetas.pkl`
- Preprocess the input data (normalize, handle missing values, feature engineering)
- Run predictions on all observations
- For each observation, add:
  - `classification`: The predicted class (0-3)
  - `confidence`: Confidence score for the predicted class
  - `probabilities`: Array of probabilities for all classes (optional)
- Return the enhanced dataset as an array of observation objects

### 3. Implement `analyze_observation` (services/analisis.py)

**Required Functionality**:
- Load the trained model from `models/modelo_exoplanetas.pkl`
- Preprocess the single observation (normalize, handle missing values)
- Run prediction on the observation
- Calculate confidence scores for all classification classes
- **Generate explanation**:
  - Calculate feature importance/contribution for this specific prediction
  - Identify the top 5-7 features that most influenced the decision
  - Provide comparison values (e.g., "transit depth is 2.3x higher than typical non-planets")
  - Generate natural language explanation of the classification
- Return detailed result with:
  - Classification (0-3)
  - Confidence/probability for the predicted class
  - Probabilities for all classes
  - Feature importance array
  - Explanation text
  - Key observation characteristics

### 4. Implement `/analyze-observation` Endpoint (main.py, line 49-56)

**Current Issue**: Doesn't read request body properly

**Required Implementation**:
```python
@app.post("/analyze-observation")
async def handle_observation_analysis(observation: Dict):
    """
    Receives a single observation object from frontend
    Returns detailed classification with explanation
    """
    try:
        result = await analyze_observation(observation)
        return {
            "status": "success",
            "classification": result["classification"],
            "confidence": result["confidence"],
            "probabilities": result.get("probabilities", []),
            "feature_importance": result.get("feature_importance", []),
            "explanation": result.get("explanation", ""),
            "details": result.get("details", {})
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
```

### 5. Fix `/select-dataset/{datasetId}` Endpoint

**Current Implementation**: Returns all rows from CSV

**Required Change**: 
- Add pagination support or limit parameter
- Frontend will handle limiting to 10 rows, but backend should support returning metadata like total row count

### 6. Model Integration

**Requirements**:
- Ensure the model file `models/modelo_exoplanetas.pkl` exists and is loadable
- Document expected input features and their order
- Document output format (classification values: 0=Non-Planet, 1=Ambiguous, 2=Candidate, 3=Confirmed Planet)
- Handle edge cases (missing features, out-of-range values)
- For single observation analysis, implement SHAP or similar for feature importance/explanation generation

---

## Redux Store Refactoring

### Fix Form Data Structure
The current `formData` in initialState is an array of field definitions. This should be split into:

1. **`formFields`**: Array of field metadata (labels, keys, steps, validation rules)
2. **`formValues`**: Object with actual values for each field (e.g., `{ pl_radeerr1: 0.0, st_rad: 1.0, ... }`)

### Remove Duplicate Reducers
Lines 90-93 duplicate lines 83-86. Keep only one set.

### Improve Error Handling
- Ensure all error states are properly typed
- Add a `clearErrors` action to reset all error states
- Consider using a single `errors` object instead of separate error states

### Add New Actions
- `addObservationToDataset`: Appends a new row to `dataset`
- `removeObservationFromDataset`: Removes a row by index
- `clearDataset`: Empties the dataset array
- `setDatasetFromSource`: Replaces dataset with loaded data and tracks source
- `setSelectedObservationIndex`: Sets which row is selected for single analysis
- `setAnalysisType`: Sets whether the current analysis is "single" or "batch"

---

## Data Flow Summary

### User Journey 1: Manual Entry with Batch Analysis
1. User fills out form in **AstronomicalDataInput**
2. Clicks "Add to Dataset" → observation added to Redux `dataset` array
3. Observation appears in **DatasetTable**
4. User can add more observations (repeat steps 1-3)
5. User clicks "Analyze Dataset" button in **DatasetTable**
6. Backend processes all observations and returns classifications with model metrics
7. **Results** component displays aggregate statistics, classification counts, and model performance

### User Journey 2: Manual Entry with Single Observation Analysis
1. User fills out form in **AstronomicalDataInput**
2. Clicks "Add to Dataset" → observation added to Redux `dataset` array
3. Observation appears in **DatasetTable**
4. User clicks on a specific row in the table
5. Backend analyzes just that observation and returns detailed explanation
6. **Results** component displays:
   - Classification with confidence
   - Feature importance (what influenced the decision)
   - Natural language explanation
   - Observation characteristics

### User Journey 3: Load Pre-existing Dataset with Batch Analysis
1. User clicks "Choose Dataset" in **DatasetActionButtons**
2. Selects "Kepler", "K2", or "TESS"
3. Backend returns dataset (first 10 rows)
4. **DatasetTable** displays the loaded data
5. User can optionally add more manual observations
6. User clicks "Analyze Dataset" button
7. Backend processes and returns results with model metrics
8. **Results** displays aggregate statistics and model performance

### User Journey 4: Load Dataset and Analyze Single Observation
1. User clicks "Choose Dataset" in **DatasetActionButtons**
2. Selects a dataset (Kepler/K2/TESS)
3. **DatasetTable** displays the loaded data
4. User clicks on a specific row to analyze just that observation
5. Backend returns detailed analysis with explanation
6. **Results** displays detailed single-observation analysis

### User Journey 5: Upload CSV
1. User clicks "Import CSV" in **DatasetActionButtons**
2. Selects a CSV file from their computer
3. Frontend validates and parses CSV (takes first 10 rows)
4. **DatasetTable** displays the uploaded data
5. User can either:
   - Click "Analyze Dataset" for batch analysis, OR
   - Click on a specific row for single observation analysis
6. Backend processes and returns appropriate results
7. **Results** displays either aggregate statistics or detailed single-observation analysis

---

## Technical Specifications

### API Endpoints Summary

| Endpoint | Method | Request Body | Response | Purpose |
|----------|--------|--------------|----------|---------|
| `/datasets` | GET | None | Array of dataset metadata | Get available datasets |
| `/select-dataset/{id}` | GET | None | `{ status, data: [...] }` | Load pre-existing dataset |
| `/upload-csv` | POST | CSV file | Validation result | Validate uploaded CSV (optional) |
| `/analyze-dataset` | POST | Array of observation objects | `{ analyzed_data, summary, model_metrics }` | Analyze multiple observations with aggregate stats |
| `/analyze-observation` | POST | Single observation object | `{ classification, confidence, probabilities, feature_importance, explanation, details }` | Analyze single observation with detailed explanation |

### Redux Store Structure (Proposed)

```javascript
{
  // Field definitions (metadata)
  formFields: [
    { key: "pl_radeerr1", label: "Transit Midpoint", step: "0.0001", required: true },
    // ... 24 more fields
  ],
  
  // Current form values
  formValues: {
    pl_radeerr1: 0.0,
    st_rad: 1.0,
    // ... default values for all fields
  },
  
  // Available datasets from backend
  availableDatasets: [...],
  
  // Currently selected/loaded dataset ID
  selectedDataset: "", // "kepler", "k2", "tess", or ""
  
  // The working dataset (array of observation objects)
  dataset: [],
  
  // Track which observation is selected for single analysis (index in dataset array)
  selectedObservationIndex: null,
  
  // Results from backend analysis
  analyzedDataset: null, // Full dataset with classifications OR single observation
  analysisResult: null,  // Summary statistics (batch) OR detailed explanation (single)
  analysisType: null,    // "single" or "batch" - helps Results component know what to display
  
  // Loading states
  isLoadingDatasets: false,
  isUploading: false,
  isAnalyzing: false,
  
  // Error states (consider consolidating)
  errors: {
    formData: "",
    datasetTable: "",
    csvUpload: "",
    results: ""
  },
  
  // Model hyperparameters (for advanced users)
  hyperparameters: { ... }
}
```

---

## UI/UX Considerations

### Responsive Design
- Mobile: Single column layout, stacked components
- Tablet: 2-column grid for form fields, single column for table/results
- Desktop: Optimal use of space with multi-column layouts

### Accessibility
- Proper ARIA labels for all interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support

### Performance
- Lazy load large datasets
- Virtualize table rows if dataset exceeds 100 rows
- Debounce form input changes
- Show loading skeletons during data fetches

### User Feedback
- Toast notifications for success/error actions
- Loading spinners with descriptive text
- Confirmation dialogs for destructive actions (clear dataset)
- Progress indicators for long-running analysis

---

## Testing Considerations

### Frontend Tests
- Form validation logic
- Redux actions and reducers
- Component rendering with different states
- API integration (mock responses)

### Backend Tests
- Model prediction accuracy
- Data preprocessing pipeline
- API endpoint responses
- Error handling for invalid inputs

### Integration Tests
- Complete user journeys (manual entry → analysis → results)
- Dataset loading and analysis
- CSV upload and validation

---

## Future Enhancements (Out of Scope for Now)

1. **Real-time Analysis**: Analyze observations as they're added
2. **Data Visualization**: Interactive charts showing feature distributions
3. **Model Comparison**: Allow users to select different models
4. **Batch Upload**: Support uploading CSVs with >10 rows and analyze all
5. **Export Results**: Download analysis results as PDF report
6. **Historical Analysis**: Save and retrieve past analysis sessions
7. **Collaborative Features**: Share datasets and results with other users
8. **Advanced Filtering**: Filter and sort the dataset table
9. **Feature Importance**: Show which features most influenced each classification
10. **Model Retraining**: Allow users to provide feedback and retrain model

---

## Priority Order for Implementation

1. **High Priority** (Core Functionality):
   - Fix Redux store structure and remove duplicates
   - Refactor AstronomicalDataInput to add observations to dataset
   - Connect DatasetTable to Redux and implement pagination
   - Add "Analyze Dataset" button and API integration
   - Implement backend analysis functions
   - Connect Results component to Redux

2. **Medium Priority** (Enhanced UX):
   - Implement DatasetActionButtons dataset loading
   - Add CSV upload functionality
   - Improve error handling and user feedback
   - Add loading states and animations
   - Implement row deletion from dataset

3. **Low Priority** (Polish):
   - Add data visualization to Results
   - Implement export functionality
   - Add confirmation dialogs
   - Optimize performance for large datasets
   - Add comprehensive error messages

---

## Questions to Clarify

1. Should loading a new dataset (via Choose Dataset or CSV) clear manually entered observations, or merge with them?
2. What should happen if the CSV has different columns than expected? Auto-map, reject, or prompt user?
3. Should the analysis preserve the original dataset or replace it with the analyzed version?
4. Do you want to support analyzing more than 10 rows at once? (The 10-row limit seems arbitrary)
5. Should there be a way to edit observations in the table after they're added?
6. What are the exact classification values? (0=Non-Planet, 1=Ambiguous, 2=Candidate, 3=Confirmed Planet?)
7. Should the hyperparameters in the store be user-configurable, or are they just for documentation?

---

This specification should provide a complete roadmap for refactoring the dashboard to work as intended. The key insight is that the dashboard is meant to be a **data collection and analysis tool** that supports two analysis modes:

1. **Batch Analysis**: Analyze multiple observations at once to get aggregate statistics, classification counts, and model performance metrics
2. **Single Observation Analysis**: Click on any individual observation to get a detailed explanation of why it received its classification, including feature importance and natural language reasoning

Both modes are essential for different use cases:
- Batch analysis is useful for processing large datasets and understanding overall patterns
- Single observation analysis is crucial for understanding individual predictions and debugging edge cases

---

## Key Differences from Original Prompt

The main enhancements in this specification include:

1. **Dual Analysis Modes**: Added single observation analysis alongside batch analysis
2. **Clickable Table Rows**: Users can click any row to analyze just that observation
3. **Detailed Explanations**: Single observation analysis provides feature importance and reasoning
4. **Model Performance Metrics**: Batch analysis includes accuracy stats, confidence distributions, and model metadata
5. **Clear API Separation**: `/analyze-observation` for single, `/analyze-dataset` for batch
6. **Enhanced Results Component**: Dynamically displays either detailed single-observation view or aggregate statistics based on analysis type
7. **Better State Management**: Added `analysisType` and `selectedObservationIndex` to Redux store
8. **Comprehensive User Journeys**: Documented 5 different user workflows covering all use cases

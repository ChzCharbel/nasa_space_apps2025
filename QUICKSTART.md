# 🚀 Quick Start Guide

Get your NASA Exoplanet Analysis Dashboard up and running in 5 minutes!

---

## Prerequisites

- **Python 3.8+** installed
- **Node.js 16+** and npm installed
- Terminal/Command Prompt access

---

## Step 1: Start the Backend (2 minutes)

Open a terminal and run:

```bash
# Navigate to backend directory
cd back

# Create virtual environment (first time only)
python -m venv venv

# Activate virtual environment
# On Mac/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies (first time only)
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

✅ **Backend is ready!** Keep this terminal open.

---

## Step 2: Start the Frontend (2 minutes)

Open a **NEW** terminal and run:

```bash
# Navigate to frontend directory
cd front-2

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

You should see:
```
  VITE v7.1.7  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

✅ **Frontend is ready!** Keep this terminal open too.

---

## Step 3: Open the Application (30 seconds)

1. Open your browser
2. Go to: **http://localhost:5173**
3. Click on "Dashboard" in the navigation

🎉 **You're ready to analyze exoplanets!**

---

## Quick Test (1 minute)

### Test 1: Add an Observation
1. Fill in some values in the form (default values are fine)
2. Click **"Add to Dataset"**
3. See it appear in the Dataset Preview table below

### Test 2: Load a Dataset
1. Click **"Choose Dataset"** button
2. Select "TESS" from the dropdown
3. See 10 observations load into the table

### Test 3: Single Observation Analysis
1. Click on any row in the table
2. Wait a moment for analysis
3. See detailed results with explanation on the right

### Test 4: Batch Analysis
1. Make sure you have observations in the table
2. Click **"Analyze Dataset"** button below the table
3. See aggregate statistics and model performance

---

## Troubleshooting

### Backend won't start?

**Error: `ModuleNotFoundError: No module named 'fastapi'`**
```bash
# Make sure you activated the virtual environment
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

**Error: `Address already in use`**
```bash
# Port 8000 is taken, use a different port
uvicorn main:app --reload --port 8001
# Then update frontend API calls to use port 8001
```

### Frontend won't start?

**Error: `command not found: npm`**
```bash
# Install Node.js from https://nodejs.org/
# Then try again
```

**Error: `EADDRINUSE: address already in use`**
```bash
# Port 5173 is taken
# Vite will automatically try the next available port
# Check the terminal output for the actual URL
```

### Model not loading?

The backend will show:
```
Error loading model: [Errno 2] No such file or directory: 'models/modelo_tess_exoplanetas.pkl'
```

**Solution**: The system will use mock data for development. To use real models:
1. Ensure `models/modelo_tess_exoplanetas.pkl` exists
2. Or update `MODEL_PATH` in `back/services/analisis.py`

### API connection failed?

**Error in browser console**: `Failed to fetch`

**Solution**:
1. Make sure backend is running on port 8000
2. Check CORS is enabled (it is by default)
3. Verify the URL in browser: http://localhost:8000
4. You should see: `{"message": "Exoplanet API is running!"}`

---

## What to Try Next

### Explore the Features

1. **Manual Entry Workflow**
   - Add multiple observations
   - Build your own dataset
   - Analyze them together

2. **Dataset Comparison**
   - Load Kepler dataset
   - Analyze it
   - Load TESS dataset
   - Compare results

3. **CSV Upload**
   - Prepare a CSV file with observation data
   - Upload it using "Import CSV"
   - Analyze the uploaded data

4. **Single vs Batch Analysis**
   - Add 5 observations
   - Click individual rows to see detailed analysis
   - Then click "Analyze Dataset" for aggregate view
   - Compare the insights

### Customize the Experience

1. **Change Default Values**
   - Edit `front-2/src/pages/dashboard/store.js`
   - Update the `formValues` object (lines 38-62)

2. **Add More Fields**
   - Edit `formFields` array in store.js
   - Add new field definitions
   - They'll automatically appear in the form

3. **Adjust Pagination**
   - Edit `DatasetTable.jsx` line 18
   - Change `ROWS_PER_PAGE = 10` to your preference

4. **Switch Models**
   - Edit `back/services/analisis.py` line 8
   - Change to `modelo_kepler_exoplanetas.pkl`

---

## Keyboard Shortcuts

- **Tab**: Navigate between form fields
- **Enter**: Submit form (when focused on input)
- **Escape**: Close dropdown/modal
- **Arrow Keys**: Navigate pagination

---

## API Endpoints Reference

Test these in your browser or with curl:

```bash
# Get available datasets
curl http://localhost:8000/datasets

# Load TESS dataset
curl http://localhost:8000/select-dataset/tess

# Analyze single observation (POST)
curl -X POST http://localhost:8000/analyze-observation \
  -H "Content-Type: application/json" \
  -d '{"pl_radeerr1": 0.0, "st_rad": 1.0, ...}'

# Analyze dataset (POST)
curl -X POST http://localhost:8000/analyze-dataset \
  -H "Content-Type: application/json" \
  -d '[{"pl_radeerr1": 0.0, ...}, {...}]'
```

---

## File Structure Quick Reference

```
NASA/
├── back/                    # Backend (FastAPI)
│   ├── main.py             # API endpoints - START HERE
│   ├── services/
│   │   └── analisis.py     # ML analysis logic
│   └── models/             # Trained models
│
├── front-2/                 # Frontend (React)
│   └── src/
│       └── pages/
│           └── dashboard/
│               ├── index.jsx           # Main dashboard
│               ├── store.js            # Redux store
│               └── componentes/        # UI components
│
├── README.md               # Full documentation
├── QUICKSTART.md          # This file
├── IMPLEMENTATION_SUMMARY.md  # What was built
└── CHANGES.md             # What changed
```

---

## Need Help?

1. **Check the logs**: Look at terminal output for errors
2. **Read the docs**: See README.md for detailed info
3. **Check the code**: All files are well-commented
4. **Review the spec**: See `front-2/src/pages/dashboard/prompt_2.md`

---

## Next Steps

Once you're comfortable with the basics:

1. 📖 Read the full [README.md](README.md)
2. 🔍 Explore [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)
3. 📝 Review [CHANGES.md](CHANGES.md) to understand the architecture
4. 🎓 Study the code to learn the patterns used
5. 🚀 Start customizing for your needs!

---

## Success! 🎉

You now have a fully functional exoplanet analysis dashboard!

**Happy analyzing! 🪐✨**

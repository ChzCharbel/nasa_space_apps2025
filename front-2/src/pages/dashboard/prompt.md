I need some very thorough help here. You'll see we have this index.jsx file for our dashboard, which joins different component with varying functionalities. This page is supposed to link with our fast api backend, which connects us to our ai trained model on exoplanet analysis.
Let me explain the requirements component by component. 
In the index file, the first component is an AstronomicalDataInput, with a form of fields of different inputs. It pulls this formdata from the store, and should display only the first 10, taking as little height as possible, also
not taking too much width, and have the button to show more options.
All these should have values by default, the label should show above each input, and if the input is empty, then
there should be a placeholder. When the user edits any input, it should edit the formData in the store.
The current button says analyze and calls the select handle analyze dataset api to the backend. What
it should do actually is simply add that input as a row to the dataset variable in the store. 
The DatasetTable component should display this data, at most 10 rows at a time. Below this table, should be a 
button that actually calls the analyze dataset api, which sends all active data in the dataset to the backend to be
passed to the correct model for analisis. 
The DatasetActionButtons component offere two button, which can populate the dataset variable with data from 
datasets we already have in the backend, in the resources/clean directory. If they choose a dataset, it should find
that dataset in the backend and return it to the frontend to populate the datasets variable of the store, which like
I said, should only show maximum 10 rows of the data.
The results is gotten right now through the function in the store.js file, but it can be much better. 

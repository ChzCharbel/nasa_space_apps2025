This following prompt is a follow up to the prompt_2, where I essentially asked for help
making the entire project work. It did a great job. There are only a few things I want 
to continue working on and/or change.
First, the UI of the dashboard page is very slow. I'm not sure why this is, but the UI
moves very irregularly, and each card with glass-card or whatever that styls is, grows 
on hover. We don't need that. 
Other UI issues:
- the fields in the AstronomicalDataInput component don't all fit. At this point, it's okay
to only put 4 in each row, if that means that they won't grow outside their container.
- When we select a dataset, the datasetTable grows too wide. It moves the Results component
out of view, and should have a max width, and overflow scroll x in case necessary.

Funtionality Issues:
- when a dataset is selected, it should automatically also run the 'analyze dataset' api 
once it's loaded into the table, to show the results of that dataset immediately, without
the user having to click the analyze dataset button.
- I don't really understanding what's happending in the backend with teh analyze dataset
api, but what should happen in theory, is that we pass the dataset to the model for analisis,
(whether it was manually entered, or an uploaded csv from the user), and the output of the
model is the same data, but with the classification column in front, so that it's the first 
thing the user sees in teh datasets table.
- when it comes to choosing a dataset, the clean datasets shoudl already have that classification
field and therefore not need to be passed to the model. again, this classificaiton column
should be the first field in shown in the datasets table.
- when the user clicks on a row of the datasets table, it shouldn't call the analyze-observation
api immediately, but rather a 'analyze observation' button should appear next to the analyze
dataset button, which triggers the call.
- it's only showing 10 observations, it should include all the rows of the resuling data

In summary:
I think that's all for now, the UI not having delayed and awkward animation and movement is very
imporant, as are the functionality issues mentioned above being fixed and implemented.
Hey, I like how our app is going so far, but I want to restructure the dashboard to be more
visually appealing, it may be quite functional but also a little boring and too many words/numbers,
and we nned to sell it to our clients, they probably will need a bit more eye-catching to be
convinced.
So I want to do a few things. This is going to be a big prompt, so you'll need to take your time with it.
Before even showing the dashboard, I want an intermediary 'presentation-like' new page, that's kind
of chatgpt or google like style in being very empty except for two cards in the bottom-middle of the 
page, one saying 'enter your own data' or 'select dataset'. 
The enter your own data card when clicked on will bring the user to a simple page that asks the user
to choose a model (tess or kepler), and then once they choose, a new page with just the component
with the fields of that model (I highly recommend creating this route within the store provider as well),
or just select one of our datasets (instead of a dropdown like the dashboard, a card for each),
and once they enter the data or just continue with the default field data or select a dataset, it takes them to the dashboard with that information already there, and automatically calls either the 
analyze-observation api or analyze-dataset api. 
This is a very important step because it creates buildup to the dashboard, making it more exciting and not
feel as heavy on the user to fill in a bunch of information and understand a lot of component/configurations
quickly. 
Given these walkthrough steps, I also want to make the dashboard easier on the eyes. 
I want to move the results/analysis component below kind of onto the next page, and have the dataset table
only take up half the space of the width. The other half of the space below the fields component and buttons is for one of two graphs: If the user clicks the 'analyze dataset' button, then we should generate a precision/recall graph in that space, and if the user clicks the analyze observation button, then it should create a light over time line graph with shows how the intensity of the light dims during the passing of that object. For now, these don't need to be functional. Just find good libraries to make the graphs, put them in the components folder of the dashboard, and import the correct one based on the analysis.
Also it's important to mention that whether the user chooses to upload a manual observation, choose a dataset, or upload a csv, it should call the appropriate analyze api as they are moved to the dashboard so the graph is generated on page load, as well as the analysis below. 

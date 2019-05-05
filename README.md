# girls_in_tech_vancouver

## prediction part

to run our prediction model, you'll need python3.
In a terminal run
`python3 prediction.py`

in the terminal there will be printed the fire prediction percentages for some places we selected

## data visualization part

run `yarn` in the main directory to install all the js dependencies

run `yarn dev` to launch a dev server

access `http://localhost:8080/?day=3&month=5` for example

you can change the day and month url param to view different data sets

this tool shows past fire on a given date. The circle size represent the size of the fire.
The color of the circle shows the given fire weather index on that day.
blue is for fwi < 5
green is for 5 < fwi < 10
yellow is for 10 < fwi < 20
orange is for 20 < fwi < 30
red is for fwi > 30

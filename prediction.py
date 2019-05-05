from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, recall_score, f1_score
import json
with open('historical_fires.json') as json_file:
  historical_fires = json.load(json_file)
  X = []
  Y = []
  fuzz = 0.01
  fuzz_impact = 5
  for fire in historical_fires:
    fwi = fire['fwi']
    lat = fire['lat']
    lon = fire['lon']
    X.append([lat+fuzz, lon+fuzz, fwi - fuzz_impact])
    Y.append(0)
    X.append([lat+fuzz, lon-fuzz, fwi - fuzz_impact])
    Y.append(0)
    X.append([lat-fuzz, lon+fuzz, fwi - fuzz_impact])
    Y.append(0)
    X.append([lat-fuzz, lon-fuzz, fwi - fuzz_impact])
    Y.append(0)
    X.append([lat+fuzz, lon, fwi - fuzz_impact])
    Y.append(0)
    X.append([lat-fuzz, lon, fwi - fuzz_impact])
    Y.append(0)
    X.append([lat, lon+fuzz, fwi - fuzz_impact])
    Y.append(0)
    X.append([lat, lon-fuzz, fwi - fuzz_impact])
    Y.append(0)
    X.append([lat, lon, fwi])
    Y.append(1)
  X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.33, random_state=42)
  clf = LogisticRegression(random_state=0, solver='lbfgs', multi_class='multinomial').fit(X_train, y_train)
  y_pred = clf.predict(X_test)
  print("Winkelman Arizona United States")
  print("{0:.1%}".format(clf.predict_proba([[32.999, -110.771, 25.9]])[0][1]))
  print("Mammoth Lakes California United States")
  print("{0:.1%}".format(clf.predict_proba([[37.707, -118.896, 47.7]])[0][1]))
  print("Saint-Michel-du-Squatec Quebec Canada")
  print("{0:.1%}".format(clf.predict_proba([[47.859, -68.711, 0]])[0][1]))
  print("Hanover Manitoba Canada")
  print("{0:.1%}".format(clf.predict_proba([[49.5779, -96.7569, 8.6]])[0][1]))

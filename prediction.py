# from sklearn.linear_model import LogisticRegression
import json
with open('historical_fires.json') as json_file:
    historical_fires = json.load(json_file)
    for fire in historical_fires:
        print('fwi: ' + str(fire['fwi']))
        print('lat: ' + str(fire['lat']))
        print('lon: ' + str(fire['lon']))
        print('')
# X, y =
# clf = LogisticRegression(random_state=0, solver='lbfgs', multi_class='multinomial').fit(X, y)
# clf.predict(X[:2, :])
# clf.predict_proba(X[:2, :])
# clf.score(X, y)

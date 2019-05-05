const {Matrix} = require('ml-matrix');
const LogisticRegression = require('ml-logistic-regression');

const historicalFires = require('../historical_fires.json');

// fuzzing factor to get non fire data
const fuzz = 0.01;
const trainingDataX = []
const trainingDataY = []
const testDataX = []
const testDataY = []
// just use the first 5000 datapoints for the training set
for(i=0;i<5000;i++) {
  if(historicalFires[i]) {
    const {lat, lon, fwi} = historicalFires[i];
    trainingDataX.push([lat+fuzz, lon+fuzz, fwi])
    trainingDataY.push(0)
    trainingDataX.push([lat+fuzz, lon-fuzz, fwi])
    trainingDataY.push(0)
    trainingDataX.push([lat-fuzz, lon+fuzz, fwi])
    trainingDataY.push(0)
    trainingDataX.push([lat-fuzz, lon-fuzz, fwi])
    trainingDataY.push(0)
    trainingDataX.push([lat+fuzz, lon, fwi])
    trainingDataY.push(0)
    trainingDataX.push([lat-fuzz, lon, fwi])
    trainingDataY.push(0)
    trainingDataX.push([lat, lon+fuzz, fwi])
    trainingDataY.push(0)
    trainingDataX.push([lat, lon-fuzz, fwi])
    trainingDataY.push(0)
    trainingDataX.push([lat, lon, fwi])
    trainingDataY.push(1)
  }
}

for(i=5000;i<historicalFires.length;i++) {
  if(historicalFires[i]) {
    const {lat, lon, fwi} = historicalFires[i];
    testDataX.push([lat+fuzz, lon+fuzz, fwi])
    testDataY.push(0)
    testDataX.push([lat+fuzz, lon-fuzz, fwi])
    testDataY.push(0)
    testDataX.push([lat-fuzz, lon+fuzz, fwi])
    testDataY.push(0)
    testDataX.push([lat-fuzz, lon-fuzz, fwi])
    testDataY.push(0)
    testDataX.push([lat+fuzz, lon, fwi])
    testDataY.push(0)
    testDataX.push([lat-fuzz, lon, fwi])
    testDataY.push(0)
    testDataX.push([lat, lon+fuzz, fwi])
    testDataY.push(0)
    testDataX.push([lat, lon-fuzz, fwi])
    testDataY.push(0)
    testDataX.push([lat, lon, fwi])
    testDataY.push(1)
  }
}
const X = new Matrix(trainingDataX)
const Y = Matrix.columnVector(trainingDataY)

const logreg = new LogisticRegression(numSteps = 1000, learningRate = 5e-3);
console.log("traning");
logreg.train(X,Y);

const Xtest = new Matrix(testDataX)
const Ytest = Matrix.columnVector(testDataY)
// we try to predict the test set
console.log("predicting");
const finalResults = logreg.predict(Xtest);
let truePositives = 0;
let totalFires = 0;
let predictedFires = 0;

for(i=0;i<finalResults.lengh();i++) {
  if(finalResults[i] == 1) {
    predictedFires +=1;
  }
  if(Ytest[i] == 1) {
    totalFires += 1;
    if(finalResults[i] == Ytest[i]) {
      truePositives += 1;
    }
  }
}

console.log("precision "+truePositives / predictedFires);
console.log("recall "+truePositives / totalFires);

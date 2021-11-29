let p5livemedia; 

/**ml5 stuff**/
let myPredictions = [];
let partnerPredictions = [];
let max = 50;

/**facemesh stuff**/
let myFaceMesh;
let myFaces = [];
let partnerFaces = [];

function setup() {
  createCanvas(640, 480);

  p5livemedia = new p5LiveMedia(this, "DATA", null, "ewah-room-1");
  p5livemedia.on('data', gotPartnerPredictions);

  const myVid = createCapture(VIDEO); 
  myVid.size(width, height);
  myVid.hide();

  // create ml5 facemesh instance, modelLoaded callback for confirmation
  const faceMesh = ml5.facemesh(myVid, modelLoaded);
  // when we receive predictions, call gotMyPredictions
  faceMesh.on('predict', gotMyPredictions());
  console.log('setup successful');
}

function modelLoaded() {
  console.log('model loaded');
}

function gotMyPredictions(results) {
  myPredictions = results;
  p5livemedia.send(JSON.stringify(myPredictions));
}

function gotPartnerPredictions(data, id) {
  partnerPredictions = JSON.parse(data);
}

function draw() {
 background(255);
 updateFaces(myPredictions);
 updateFaces(partnerPredictions);
}

function updateFaces(predictions) {
  if (predictions.length < 1) {
    console.log('empty');
    return;
  }

  const silhoutte = predictions[0].annotations['silhoutte'];
  let faceMesh = new FaceMesh(0,0, silhoutte);
  faceMesh.calculate();
  faceMesh.push(newMesh);
}
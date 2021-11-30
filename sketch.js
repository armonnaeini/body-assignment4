/**live media stuff**/
let p5livemedia; 

/**ml5 stuff**/
let myPredictions = [];
let partnerPredictions = [];
let myMax = 40;
let partnerMax = 20;


/**facemesh stuff**/
let myFaceMesh;
let myFaces = [];
let partnerFaces = [];
let faceMeshArray = [];
let partnerFaceMeshArray = [];
let facemesh;

function setup() {
  createCanvas(640, 480);

  p5livemedia = new p5LiveMedia(this, "DATA", null, "ewah-room-1");
  p5livemedia.on('data', gotPartnerPredictions);

  const myVid = createCapture(VIDEO); 
  myVid.size(width, height);
  myVid.hide();

  faceMesh = ml5.facemesh(myVid, modelLoaded);

  faceMesh.on('predict', results => {
    myPredictions = results;
    p5livemedia.send(JSON.stringify(myPredictions));
  });
  console.log('setup successful');
}

function modelLoaded() {
  console.log('model loaded');
}

function gotPartnerPredictions(data, id) {
  partnerPredictions = JSON.parse(data);
}

function draw() {
  background(255);
  /** draw MYFACES **/
  for (let i = 0; i < faceMeshArray.length; i++) {
    faceMeshArray[i].display(240, 157, 30);
  }
  /** splice some shit */
  for (let j = 0; j < myMax; j++) {
    if (faceMeshArray.length < myMax) {
      faceMeshArray[j];
    } else {
      faceMeshArray.splice(0,1);
    }
  }
  
  /** draw PARTNERFACES **/
  for (let i = 0; i < partnerFaceMeshArray.length; i++) {
    partnerFaceMeshArray[i].display(0, 255, 150);
  }

  /** splice some partner shit */
  for (let j = 0; j < partnerMax; j++) {
    if (partnerFaceMeshArray.length < partnerMax) {
      partnerFaceMeshArray[j];
    } else {
      partnerFaceMeshArray.splice(0,1);
    }
  }
  updateFacesNew(myPredictions);
  partnerUpdateFacesNew(partnerPredictions);
}

function updateFacesNew(pred) {
  if (pred.length < 1) {
    console.log('empty');
    return;
  }
  const silhoutte = pred[0].annotations['silhouette'];
  let newMesh = new FaceMeshX(0,0, silhoutte);
  newMesh.calculate();
  faceMeshArray.push(newMesh);
}

function partnerUpdateFacesNew(pred) {
  if (pred.length < 1) {
    console.log('empty');
    return;
  }
  const silhoutte = pred[0].annotations['silhouette'];
  let newMesh = new FaceMeshX(0,0, silhoutte);
  newMesh.calculate();
  partnerFaceMeshArray.push(newMesh);
}



/*
function updateFaces() {
  if (myPredictions.length < 1) {
    console.log('empty');
    return;
  }
  // console.log("predictions: " + myPredictions.length);
  const silhoutte = myPredictions[0].annotations['silhouette'];
  let newMesh = new FaceMeshX(0,0, silhoutte);
  newMesh.calculate();
  faceMeshArray.push(newMesh);
}
*/
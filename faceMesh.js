let img;
var r;
var g;
var b;
var a;

class FaceMesh {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        img = createGraphics(width,height); 
        pixelDensity(1);

    }

    calculateShape(predictions) {
        if (predictions.length < 1) {
            return;
        }

        const silhoutte = predictions[0].annotations['silhouette'];
          
        r = random(255); // r is a random number between 0 - 255
        g = random(100,200); // g is a random number betwen 100 - 200
        b = random(100); // b is a random number between 0 - 100
        a = random(200,255); // a is a random number between 200 - 255
 
        img.stroke(r, g, b, a);
        img.strokeWeight(1);
        img.noFill();
        // img.noStroke();
        img.beginShape();
        for (let g = 0; g < silhoutte.length+3; g++) {
            let index = g;
            if (g >= silhoutte.length) {
              index = g % silhoutte.length;
            }
            const [x, y] = silhoutte[index];
            img.curveVertex(x, y);
        }
        img.endShape();
    }

    render() {
        image(img, 0,0, 640, 480);
    }
}
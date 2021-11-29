
class FaceMeshX {
    constructor(x,y, sil, predictions){
        this.x = x;
        this.y = y;
        this.sil = [...sil];
        this.silPoints = [];
    }


    calculate() {
        for (let g = 0; g < this.sil.length+3; g++) {
            let index = g;
            if (g >= this.sil.length) {
              index = g % this.sil.length;
            }
            this.silPoints.push(this.sil[index]);
        }
    }

    calculateFacePoints() {
        for (let i = 0; i < this.predictions.length; i++) {
            const keyPoints = this.predictions[i].scaledMesh;

            for (let j = 0; j < keyPoints.length; j++) {
                const [x,y] = keyPoints[j];
                fill(0,255,0);
                ellipse(x,y, 7,7);
            }
        }
    }

    display() {
        strokeWeight(2);
        beginShape();
        for (let a = 0; a < this.silPoints.length; a++) {
            curveVertex(this.silPoints[a][0], this.silPoints[a][1]);
        }
        endShape();
    }
}
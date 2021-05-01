import * as THREE from 'three';


class PhysicsEngine {

  ///////////////////////////////////////////////////////////////////////////////////////
  constructor(gui) {

    this.k = 4;
    this.z = 5e-1;
    this.h = 1e-1;
    // this.lastTimeMillis = Date.now();
    gui.add(this, 'k', 1, 100);
    gui.add(this, 'z', 1e-1, 10);
    gui.add(this, 'h', 1e-2, 1);

    this.linkArray  = [];
    this.pointArray = [];
    
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  update(linkArray, pointArray) {
    // let now             = Date.now();
    // computeForce(linkArray, this.k, this.z)
    // updatePoints(pointArray, this.h /* * (now - this.lastTimeMillis) */);
    // this.lastTimeMillis = now;
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  reset(linkArray, pointArray) {
    linkArray.forEach(link => {
      link.forceBuff = 0;
      link.forceBuff = 0;
    });
    pointArray.forEach(point => {
      point.y        = 0;
      point.velocity = 0;
    });
  }
}


/////////////////////////////////////////////////////////////////////////////////////////
function computeForce(linkArray, k, z) {
  linkArray.forEach(link => {
    let deltaL = link.p2.y - link.p1.y - link.l0;
    let F      = k * deltaL + z * (link.p2.velocity - link.p1.velocity);
    link.p1.forceBuff += F;
    link.p2.forceBuff -= F;
  });
}


/////////////////////////////////////////////////////////////////////////////////////////
function updatePoints(pointArray, h) { // Leapfrog
  for (let p of pointArray) {
    p.velocity += h * p.forceBuff / p.mass;
    p.y += h * p.velocity;
    p.forceBuff = 0;
  }
}


export {PhysicsEngine};
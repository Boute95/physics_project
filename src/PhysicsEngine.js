import * as THREE from 'three';
import {distancePerAxis} from './Utils';


class PhysicsEngine {

  ///////////////////////////////////////////////////////////////////////////////////////
  constructor(gui) {
    this.k                   = 4e-0;
    this.kFactorWithDistance = 1e-1;
    this.z                   = 1e-0;
    this.h                   = 1e-1;
    this.g                   = 4e-3; // 10;
    this.windForce           = 1;
    this.lastTimeMillis      = Date.now();
    gui.add(this, 'k', 1e-1, 5e-0);
    gui.add(this, 'kFactorWithDistance', 1e-3, 5e-1);
    gui.add(this, 'z', 1e-1, 10);
    gui.add(this, 'h', 1e-2, 1);
    gui.add(this, 'g', 1e-3, 1e-2);
    gui.add(this, 'windForce', 1e-1, 10);
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  update(linkArray, pointArray) {
    let now = Date.now();
    this.computeForce(now - this.lastTimeMillis, linkArray, pointArray);
    updatePoints(pointArray, this.h);
    this.lastTimeMillis = now;
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  reset(linkArray, pointArray, initialPositionArray) {
    linkArray.forEach(link => { link.forceBuff = {x : 0, y : 0, z : 0}; });
    pointArray.forEach(point => {
      point.x = initialPositionArray[point.id].x,
      point.y = initialPositionArray[point.id].y,
      point.z = initialPositionArray[point.id].z, point.velocity.x = 0;
      point.velocity.y = 0;
      point.velocity.z = 0;
    });
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  computeForce(deltaTime, linkArray, pointArray) {
    for (let link of linkArray) {
      let deltaL = distancePerAxis(link.p1, link.p2);
      deltaL.x -= link.l0.x;
      deltaL.y -= link.l0.y;
      deltaL.z -= link.l0.z;
      let k = this.k - this.kFactorWithDistance * link.reduction;
      let F = {
        x : k * deltaL.x + this.z * (link.p2.velocity.x - link.p1.velocity.x),
        y : k * deltaL.y + this.z * (link.p2.velocity.y - link.p1.velocity.y),
        z : k * deltaL.z + this.z * (link.p2.velocity.z - link.p1.velocity.z)
      };
      if (!link.p1.isFixed) {
        link.p1.forceBuff.x += F.x;
        link.p1.forceBuff.y += F.y;
        link.p1.forceBuff.z += F.z + randomWindForce(this.windForce);
      }
      if (!link.p2.isFixed) {
        link.p2.forceBuff.x -= F.x;
        link.p2.forceBuff.y -= F.y;
        link.p2.forceBuff.z -= F.z + randomWindForce(this.windForce);
      }
    }

    for (let point of pointArray) {
      if (!point.isFixed) {
        point.forceBuff.y -= point.mass * this.g * deltaTime;
      }
    }
  }
}



/////////////////////////////////////////////////////////////////////////////////////////
function updatePoints(pointArray, h) { // Leapfrog
  for (let p of pointArray) {
    p.velocity.x += h * p.forceBuff.x / p.mass;
    p.velocity.y += h * p.forceBuff.y / p.mass;
    p.velocity.z += h * p.forceBuff.z / p.mass;
    // if (!p.isFixed) {
    p.x += h * p.velocity.x;
    p.y += h * p.velocity.y;
    p.z += h * p.velocity.z;
    // }
    p.forceBuff = {x : 0, y : 0, z : 0};
  }
}



/////////////////////////////////////////////////////////////////////////////////////////
function randomWindForce(windForce) {
  const dir = 1;
  const min = -0.7;
  const max = 0.3;
  const rand = Math.random() * (max - min) - min;
  return windForce * Math.cos(rand * dir);
}


export {PhysicsEngine};
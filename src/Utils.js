///////////////////////////////////////////////////////////////////////////////
function euclidianDistance(p1, p2) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2 +
                   (p2.z - p1.z) ** 2);
}


///////////////////////////////////////////////////////////////////////////////
function distancePerAxis(p1, p2) {
  return {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
    z: p2.z - p1.z
  }
}

export {euclidianDistance, distancePerAxis};
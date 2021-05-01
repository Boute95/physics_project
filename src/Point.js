class Point {

  ///////////////////////////////////////////////////////////////////////////////////////
  constructor(id, position, distanceFromRoot, isFixed) {
    this.id               = id;
    this.x                = position.x;
    this.y                = position.y;
    this.z                = 0;
    this.distanceFromRoot = distanceFromRoot;
    this.isFixed          = isFixed;
    this.velocity         = {x : 0, y : 0, z : 0};
    this.forceBuff        = {x : 0, y : 0, z : 0};
    this.mass             = 1;
  }
}

export {Point};
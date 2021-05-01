class Point {

  ///////////////////////////////////////////////////////////////////////////////////////
  constructor(id, position) {
    this.id              = id;
    this.x               = position.x;
    this.y               = 0;
    this.velocity        = 0;
    this.forceBuff       = 0;
    this.mass            = 1;
  }
}

export {Point};
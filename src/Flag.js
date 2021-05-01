class Flag {
  constructor() {
    this.pointArray = [];
    this.linkArray  = [];
  }
}


/////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param {int} dimensionX
 * @param {int} dimensionY
 * @param {{top, left, width, height}} rect
 * @returns
 */
function createFlag(dimensionX, dimensionY, rect) {
  let flag        = new Flag();
  flag.pointArray = createPointArray(dimensionX, dimensionY, rect);
  flag.linkArray  = createLinks();
}


/////////////////////////////////////////////////////////////////////////////////////////
function createPointArray(dimensionX, dimensionY, rect) {
  let points    = [];
  const distX   = rect.width - rect.left;
  const distY   = rect.height - rect.top;
  const strideX = distX / (dimensionX - 1);
  const strideY = distY / (dimensionY - 1);

  for (let i = 0; i < pointCount; ++i) {
    points.push(new Point(
        i, {x : rect.left + i * strideX, y : rect.top + i * strideY}));
  }

  return points;
}


/////////////////////////////////////////////////////////////////////////////////////////
function createLinks(points) {
  let links = [];

  // Maillage structurel
  for (let i = 1; i < points.length; i++) {
    links.push(new Link(i - 1, points[i - 1], points[i]));
  }

  // Maillage diagonal
  for (let i = 1; i < points.length; i++) {
    // TODO
  }

  // Maillage pont
  for (let i = 1; i < points.length; i++) {

  }

  return links;
}


export {Flag, createFlag};
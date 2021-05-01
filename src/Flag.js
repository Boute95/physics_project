import {Link} from './Link.js';
import {Point} from './Point'

class Flag {
  constructor() {
    this.pointMatrix = [ [] ];
    this.linkArray   = [ [] ];
  }
}


///////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param {int} dimensionX
 * @param {int} dimensionY
 * @param {{top, left, width, height}} rect
 * @returns
 */
function createFlag(dimensionX, dimensionY, rect) {
  let flag         = new Flag();
  flag.pointMatrix = createPointMatrix(dimensionX, dimensionY, rect);
  flag.linkArray   = createLinks(flag.pointMatrix);
  return flag;
}


///////////////////////////////////////////////////////////////////////////////
function createPointMatrix(dimensionX, dimensionY, rect) {
  let points     = [];
  let pointCount = 0;
  const distX    = rect.width - rect.left;
  const distY    = rect.height - rect.top;
  const strideX  = distX / (dimensionX - 1);
  const strideY  = distY / (dimensionY - 1);

  for (let i = 0; i < dimensionY; i++) {
    points.push([]);
    for (let j = 0; j < dimensionX; j++) {
      points[i].push(new Point(
          i, {x : rect.left + j * strideX, y : rect.top + i * strideY}));
      pointCount++;
    }
  }

  console.log('Point count : ' + pointCount);
  return points;
}


///////////////////////////////////////////////////////////////////////////////
function createLinks(points) {
  let links  = [];
  let linkID = 0;

  // Maillage structurel
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i].length; j++) {
      if (j + 1 < points[i].length) {
        links.push(new Link(linkID++, points[i][j], points[i][j + 1]));
      }
      if (i + 1 < points.length) {
        links.push(new Link(linkID++, points[i][j], points[i + 1][j]));
      }
    }
  }

  // Maillage diagonal
  for (let i = 1; i < points.length; i++) {
    // TODO
  }

  // Maillage pont
  for (let i = 1; i < points.length; i++) {
  }

  console.log('Link count : ' + links.length);

  return links;
}


export {Flag, createFlag};
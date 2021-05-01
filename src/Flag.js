import {Link} from './Link.js';
import {Point} from './Point';
import {distancePerAxis} from './Utils'

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
      points[i].push(
          new Point(pointCount++,
                    {x : rect.left + j * strideX, y : rect.top + i * strideY},
                    j, j === 0));
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
      let p1 = points[i][j];
      if (j + 1 < points[i].length) {
        let p2 = points[i][j + 1];
        let k  = Math.max(p1.distanceFromRoot, p2.distanceFromRoot);
        links.push(new Link(linkID++, p1, p2, distancePerAxis(p1, p2), k));
      }
      if (i + 1 < points.length) {
        let p2 = points[i + 1][j];
        let k  = Math.max(p1.distanceFromRoot, p2.distanceFromRoot);
        links.push(new Link(linkID++, p1, p2, distancePerAxis(p1, p2), k));
      }
    }
  }

  // Maillage diagonal
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      let p1 = points[i][j];
      if (j + 1 < points[i].length && i + 1 < points.length) {
        let p2 = points[i + 1][j + 1];
        let k  = Math.max(p1.distanceFromRoot, p2.distanceFromRoot);
        links.push(new Link(linkID++, p1, p2, distancePerAxis(p1, p2), k));
      }
      if (j + 1 < points[i].length && i - 1 >= 0) {
        let p2 = points[i - 1][j + 1];
        let k  = Math.max(p1.distanceFromRoot, p2.distanceFromRoot);
        links.push(new Link(linkID++, p1, p2, distancePerAxis(p1, p2), k));
      }
    }
  }

  // Maillage pont
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i].length; j++) {
      let p1 = points[i][j];
      if (j + 2 < points[i].length) {
        let p2 = points[i][j + 2];
        let k  = Math.max(p1.distanceFromRoot, p2.distanceFromRoot);
        links.push(new Link(linkID++, p1, p2, distancePerAxis(p1, p2), k));
      }
      if (i + 2 < points.length) {
        let p2 = points[i + 2][j];
        let k  = Math.max(p1.distanceFromRoot, p2.distanceFromRoot);
        links.push(new Link(linkID++, p1, p2, distancePerAxis(p1, p2), k));
      }
    }
  }

  console.log('Link count : ' + links.length);
  return links;
}


export {Flag, createFlag};
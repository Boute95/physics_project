import './style.scss';

import {GUI} from 'dat.gui';

import {Engine} from './Engine.js';
import {createFlag} from './Flag';
import {Link} from './Link.js';
import {Point} from './Point.js';


///////////////////////////////////////////////////////////////////////////////

const gui      = new GUI();
const flagXDim = 10;
const flagYDim = 10;
const flagRect = {
  top : -1,
  left : -1,
  height : 1,
  width : 1
};
const flag = createFlag(flagXDim, flagYDim, flagRect);
let engine = new Engine(gui);

for (const line of flag.pointMatrix) {
  for (const point of line) {
    engine.addPoint(point);
  }
}
for (const link of flag.linkArray) {
  engine.addLink(link);
}

let engineStartInfo = {
  initialVelocityFirstPoint : 3,
  initialVelocityLastPoint : -3
};
engine.start(engineStartInfo);

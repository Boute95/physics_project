import './style.scss';

import {GUI} from 'dat.gui';

import {Engine} from './Engine.js';
import {Flag} from './Flag';
import {Link} from './Link.js';
import {Point} from './Point.js';


const gui  = new GUI();
const flag = createFlag();
let engine = new Engine(gui);
// let points       = createPoints();
// let links        = createLinks(points);

points.forEach(p => { engine.addPoint(p); });
links.forEach(l => { engine.addLink(l); });
let engineStartInfo = {
  initialVelocityFirstPoint : 3,
  initialVelocityLastPoint : -3
};
engine.start(engineStartInfo);

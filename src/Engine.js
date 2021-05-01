import * as Stats from 'stats.js';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {PhysicsEngine} from './PhysicsEngine.js';
import {RenderEngine} from './RenderEngine.js';
import {Flag, createFlag} from './Flag.js';


class Engine {

  ///////////////////////////////////////////////////////////////////////////////////////
  constructor(gui) {
    this.pointArray = [];
    this.linkArray  = [];
    const pointCount = 6;
    this.startInfo     = null;
    this.physicsEngine = new PhysicsEngine(gui);
    this.renderEngine  = new RenderEngine();
    gui.add(this, 'reset');

    // Controls
    this.controls = new OrbitControls(this.renderEngine.camera,
                                      this.renderEngine.renderer.domElement);

    // Stats
    this.stats = [ new Stats(), new Stats(), new Stats() ];
    this.stats[0].showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    this.stats[1].showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
    this.stats[2].showPanel(2); // 0: fps, 1: ms, 2: mb, 3+: custom
    this.stats.forEach(e => { document.body.appendChild(e.dom); });
    this.stats[1].domElement.style.left = '80px';
    this.stats[2].domElement.style.left = '160px';
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  addPoint(point) {
    this.pointArray[point.id] = point;
    this.renderEngine.addPoint(point);
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  addLink(link) {
    this.linkArray[link.id] = link;
    this.renderEngine.addLink(link);
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  loop() {
    this.stats.forEach(s => { s.begin(); });
    this.physicsEngine.update(this.linkArray, this.pointArray);
    this.renderEngine.updateMeshes(this.pointArray, this.linkArray);
    this.renderEngine.render();
    this.controls.update();
    this.stats.forEach(s => { s.end(); });
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  start(startInfo) {
    this.pointArray[0].velocity = startInfo.initialVelocityFirstPoint;
    this.pointArray[this.pointArray.length - 1].velocity =
        startInfo.initialVelocityLastPoint;
    this.startInfo = startInfo;
    this.renderEngine.setLoop(this.loop.bind(this));
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  reset() {
    this.renderEngine.setLoop(null);
    this.physicsEngine.reset(this.linkArray, this.pointArray);
    if (this.startInfo) {
      this.pointArray[0].velocity = this.startInfo.initialVelocityFirstPoint;
      this.pointArray[this.pointArray.length - 1].velocity =
          this.startInfo.initialVelocityLastPoint;
    }
    this.renderEngine.setLoop(this.loop.bind(this));
  }
}


export {Engine};
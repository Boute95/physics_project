import * as THREE from 'three';

const NORMAL_MATERIAL = new THREE.MeshNormalMaterial();
const PLANE_MATERIAL  = new THREE.MeshBasicMaterial({
  color: '#333333'
});
const LINE_MATERIAL   = new THREE.LineBasicMaterial();
const SPHERE_GEOMETRY = new THREE.SphereGeometry(0.01, 4, 4);
const PLANE_GEOMETRY  = new THREE.PlaneGeometry();

class RenderEngine {

  ///////////////////////////////////////////////////////////////////////////////////////
  constructor() {

    this.camera = new THREE.PerspectiveCamera(
        80, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 4;
    const loader           = new THREE.CubeTextureLoader();
    loader.setPath('assets/');

    const textureCube = loader.load([
      'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg'
    ]);
    this.scene        = new THREE.Scene();
    // this.scene.background = textureCube;
    this.renderer = new THREE.WebGLRenderer({antialias : true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.scene.add(createGroundPlane());

    this.pointMeshArray = [];
    this.linkLineArray  = [];
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  setLoop(loop) { this.renderer.setAnimationLoop(loop); }


  ///////////////////////////////////////////////////////////////////////////////////////
  render() { this.renderer.render(this.scene, this.camera); }


  ///////////////////////////////////////////////////////////////////////////////////////
  addPoint(point) {
    let pointMesh = new THREE.Mesh(SPHERE_GEOMETRY, NORMAL_MATERIAL);
    this.pointMeshArray[point.id] = pointMesh;
    pointMesh.position.setX(point.x);
    pointMesh.position.setY(point.y);
    // this.scene.add(pointMesh);
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  addLink(link) {
    let points = [
      new THREE.Vector3(link.p1.x, link.p1.y, 0),
      new THREE.Vector3(link.p2.x, link.p2.y, 0)
    ];
    let lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    let linkLine     = new THREE.Line(lineGeometry, LINE_MATERIAL);
    this.linkLineArray[link.id] = linkLine;
    this.scene.add(linkLine);
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  updateMeshes(pointArray, linkArray) {
    // for (let i = 0; i < this.pointMeshArray.length; ++i) {
    //   this.pointMeshArray[i].position.setX(pointArray[i].x);
    //   this.pointMeshArray[i].position.setY(pointArray[i].y);
    //   this.pointMeshArray[i].position.setZ(pointArray[i].z);
    // }
    for (let i = 0; i < this.linkLineArray.length; ++i) {
      this.linkLineArray[i].geometry.attributes.position.setX(
          0, linkArray[i].p1.x);
      this.linkLineArray[i].geometry.attributes.position.setY(
          0, linkArray[i].p1.y);
      this.linkLineArray[i].geometry.attributes.position.setZ(
          0, linkArray[i].p1.z);
      this.linkLineArray[i].geometry.attributes.position.setX(
          1, linkArray[i].p2.x);
      this.linkLineArray[i].geometry.attributes.position.setY(
          1, linkArray[i].p2.y);
      this.linkLineArray[i].geometry.attributes.position.setZ(
          1, linkArray[i].p2.z);
      this.linkLineArray[i].geometry.attributes.position.needsUpdate = true;
    }
  }
}



///////////////////////////////////////////////////////////////////////////////////////
function createGroundPlane() {
  let mesh = new THREE.Mesh(PLANE_GEOMETRY, PLANE_MATERIAL);
  mesh.translateY(-3);
  mesh.rotateX(-Math.PI / 2);
  mesh.scale.set(4, 4, 4);
  return mesh;
}

export {RenderEngine};

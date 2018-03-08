var camera;
var renderer;

function init() {
    var color = new THREE.Color(0xff0000);
    var scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, document.documentElement.clientWidth / document.documentElement.clientHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    document.body.appendChild(renderer.domElement);

    var shape = [];

    geometryFrame = new THREE.SphereGeometry(3.5, 0);
    materialFrame = new THREE.MeshBasicMaterial({
        wireframe: true,
        transparent: true,
        opacity: 0.2,
        color: 0xdddddd,
    });
    shape[0] = new THREE.Mesh(geometryFrame, materialFrame);
    shape[0].position.set(3, 5, 0);
    scene.add(shape[0]);
    var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
    var skyboxMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        side: THREE.BackSide
    });
    var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    scene.add(skybox);
    var pointLight = new THREE.PointLight(0x888888);
    pointLight.position.set(0, 100, 500);
    scene.add(pointLight);
    camera.position.set(3, 5.5, 10); // x y z

    function render() {
        requestAnimationFrame(render);
        shape[0].rotation.x -= 0.005;
        shape[0].rotation.y -= 0.005;
        renderer.render(scene, camera);
    }
    render();
}
init();
window.addEventListener('resize', resize, false);

function resize() {
    camera.aspect = document.documentElement.clientWidth / document.documentElement.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);

}
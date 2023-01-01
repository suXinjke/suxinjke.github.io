import * as THREE from 'three';
import { GLTFLoader } from 'gltfLoader';
import * as CANNON from 'cannon'

const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82 * 3, 0), // m/s²
})

const loader = new GLTFLoader()

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
camera.position.set( 200, 200, 400 );
camera.lookAt( 0, 0, 0 );

const light = new THREE.AmbientLight( 0xaaaaaa )
const scene = new THREE.Scene();

scene.add( light )

const groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
})
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // make it face up
world.addBody(groundBody)

const kiwis = []

loader.load( '/kiwi.gltf', function ( gltf ) {
    for ( let i = 0 ; i < 10 ; i++ ) {
        const sphereBody = new CANNON.Body({
            mass: 1000,
            shape: new CANNON.Sphere(15),
        })
        sphereBody.position.set(-100 + Math.random() * 200, 100, -100 + Math.random() * 200) // m

        const velFactor = 20
        sphereBody.velocity.set(
            -velFactor + Math.random() * velFactor * 2,
            -velFactor + Math.random() * velFactor * 2,
            -velFactor + Math.random() * velFactor * 2
        )
        world.addBody(sphereBody)

        const kiwi = gltf.scene.clone()
        kiwi.scale.x = 0.1
        kiwi.scale.y = 0.1
        kiwi.scale.z = 0.1

        kiwis.push({
            mesh: kiwi,
            body: sphereBody
        })

        scene.add( kiwi );
    }
}, undefined, function ( error ) {

	console.error( error );
} );

function animate() {
    requestAnimationFrame(animate)
    world.fixedStep()

    kiwis.forEach(kiwi => {
        kiwi.mesh.position.copy(kiwi.body.position)
        kiwi.mesh.quaternion.copy(kiwi.body.quaternion)
    })

    renderer.render( scene, camera );
}

animate()
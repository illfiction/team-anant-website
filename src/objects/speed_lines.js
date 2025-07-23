// objects/speed_lines.js
import * as THREE from 'three';
import { createCamera } from '../scene/camera';

let speedLinesGroup;
const numLines = 500; // Increase number of lines for easier visibility
const lineLength = 10; // Make lines longer
const maxSpread = 80; // Make them spread wider

export function createSpeedLines(camera) {
    if (!camera) {
        console.error("createSpeedLines: Camera object is required.");
        return null;
    }

    speedLinesGroup = new THREE.Group();

    const positions = [];
    const colors = [];
    const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 1.0, // <--- TEMPORARILY SET TO 1.0 FOR DEBUGGING
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    for (let i = 0; i < numLines; i++) {
        const startX = (Math.random() - 0.5) * maxSpread; // Wider spread
        const startY = (Math.random() - 0.5) * maxSpread; // Wider spread
        const startZ = (Math.random() - 0.5) * maxSpread * 2; // More depth variation

        const directionX = (Math.random() - 0.5) * 2;
        const directionY = (Math.random() - 0.5) * 2;
        const directionZ = -1; // Point slightly backwards for "forward" motion

        const directionVec = new THREE.Vector3(directionX, directionY, directionZ).normalize();

        const endX = startX + directionVec.x * lineLength * (0.5 + Math.random());
        const endY = startY + directionVec.y * lineLength * (0.5 + Math.random());
        const endZ = startZ + directionVec.z * lineLength * (0.5 + Math.random());

        positions.push(startX, startY, startZ);
        positions.push(endX, endY, endZ);

        const alpha = 0.5 + Math.random() * 0.5; // Ensure good alpha
        colors.push(1, 1, 1, alpha);
        colors.push(1, 1, 1, 0);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));

    const lines = new THREE.LineSegments(geometry, material);
    speedLinesGroup.add(lines);

    camera.add(speedLinesGroup);
    // <--- ADJUST THIS: Place them closer to the camera's view
    // If camera.near is 0.1, placing them at -5 means they are 5 units behind the camera's local origin.
    // This should be well within the clipping planes.
    speedLinesGroup.position.set(0, 0, -5); 
    
    // <--- TEMPORARILY SET TO TRUE FOR DEBUGGING
    speedLinesGroup.visible = true; 

    return speedLinesGroup;
}
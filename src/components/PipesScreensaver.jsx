import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const PipesScreensaver = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera setup - stable like reference image
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 25);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Grid system - smaller bounds to keep pipes in viewport
    const gridSize = 6;
    const cellSize = 2;
    const occupiedCells = new Set();
    const pipes = [];

    // Colors - classic Windows colors
    const colors = [
      0x00ff00, // Green
      0x00ffff, // Cyan
      0x0080ff, // Blue
      0x8000ff, // Purple
      0xff0080, // Magenta
      0xff8000, // Orange
      0xffff00, // Yellow
      0x80ff00, // Lime
    ];

    // Pipe geometry - thicker for better visibility
    const pipeGeometry = new THREE.CylinderGeometry(0.3, 0.3, cellSize, 8);

    class Pipe {
      constructor(x, y, z, direction, color) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.direction = direction;
        this.color = color;
        this.mesh = null;
        this.growthProgress = 0;
        this.growthSpeed = 0.02;
        this.isGrowing = true;
      }

      update() {
        if (!this.isGrowing) return;

        this.growthProgress += this.growthSpeed;

        if (this.growthProgress >= 1) {
          this.growthProgress = 1;
          this.isGrowing = false;
          
          // Try to spawn new pipe
          const nextDirection = this.getNextDirection();
          if (nextDirection) {
            const nextX = this.x + nextDirection.x * cellSize;
            const nextY = this.y + nextDirection.y * cellSize;
            const nextZ = this.z + nextDirection.z * cellSize;
            
            const key = `${nextX},${nextY},${nextZ}`;
            if (!occupiedCells.has(key)) {
              const newColor = colors[Math.floor(Math.random() * colors.length)];
              const newPipe = new Pipe(nextX, nextY, nextZ, nextDirection, newColor);
              pipes.push(newPipe);
              occupiedCells.add(key);
            }
          }
        }

        // Update mesh scale
        if (this.mesh) {
          this.mesh.scale.set(
            this.direction.x !== 0 ? this.growthProgress : 1,
            this.direction.y !== 0 ? this.growthProgress : 1,
            this.direction.z !== 0 ? this.growthProgress : 1
          );
        }
      }

      getNextDirection() {
        const directions = [
          { x: 1, y: 0, z: 0 },
          { x: -1, y: 0, z: 0 },
          { x: 0, y: 1, z: 0 },
          { x: 0, y: -1, z: 0 },
          { x: 0, y: 0, z: 1 },
          { x: 0, y: 0, z: -1 },
        ];

        const validDirections = directions.filter(dir => {
          const nextX = this.x + dir.x * cellSize;
          const nextY = this.y + dir.y * cellSize;
          const nextZ = this.z + dir.z * cellSize;
          
          const key = `${nextX},${nextY},${nextZ}`;
          return !occupiedCells.has(key) && 
                 Math.abs(nextX) <= gridSize && 
                 Math.abs(nextY) <= gridSize && 
                 Math.abs(nextZ) <= gridSize;
        });

        return validDirections.length > 0 
          ? validDirections[Math.floor(Math.random() * validDirections.length)]
          : null;
      }

      createMesh() {
        const material = new THREE.MeshPhongMaterial({
          color: this.color,
          shininess: 100,
          specular: 0x444444,
        });

        let rotation = new THREE.Euler();

        if (this.direction.x !== 0) {
          rotation.z = Math.PI / 2;
        } else if (this.direction.y !== 0) {
          rotation.x = Math.PI / 2;
        }

        this.mesh = new THREE.Mesh(pipeGeometry, material);
        
        // Position the pipe so it connects to the previous pipe
        const halfCell = cellSize / 2;
        let posX = this.x;
        let posY = this.y;
        let posZ = this.z;
        
        // Adjust position based on direction to create connections
        if (this.direction.x !== 0) {
          posX = this.x + (this.direction.x * halfCell);
        } else if (this.direction.y !== 0) {
          posY = this.y + (this.direction.y * halfCell);
        } else if (this.direction.z !== 0) {
          posZ = this.z + (this.direction.z * halfCell);
        }
        
        this.mesh.position.set(posX, posY, posZ);
        this.mesh.rotation.copy(rotation);
        this.mesh.scale.set(
          this.direction.x !== 0 ? 0 : 1,
          this.direction.y !== 0 ? 0 : 1,
          this.direction.z !== 0 ? 0 : 1
        );
        
        scene.add(this.mesh);
      }
    }

    // Start first pipe
    const startColor = colors[Math.floor(Math.random() * colors.length)];
    const startDirection = [
      { x: 1, y: 0, z: 0 },
      { x: -1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 0, y: -1, z: 0 },
      { x: 0, y: 0, z: 1 },
      { x: 0, y: 0, z: -1 },
    ][Math.floor(Math.random() * 6)];
    
    const firstPipe = new Pipe(0, 0, 0, startDirection, startColor);
    pipes.push(firstPipe);
    occupiedCells.add("0,0,0");

    // Animation loop
    let frameCount = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      // Create meshes for pipes that don't have them yet
      pipes.forEach(pipe => {
        if (!pipe.mesh) {
          pipe.createMesh();
        }
      });

      // Update pipes
      pipes.forEach(pipe => {
        pipe.update();
      });

      // Camera movement - very slow and stable like reference
      frameCount += 0.0005; // Much slower
      camera.position.x = Math.sin(frameCount) * 12;
      camera.position.z = Math.cos(frameCount) * 12;
      camera.position.y = Math.sin(frameCount * 0.05) * 0.5; // Minimal vertical movement
      camera.lookAt(0, 0, 0);

      // Reset when too many pipes or randomly
      if (pipes.length > 40 || (pipes.length > 10 && Math.random() < 0.002)) {
        // Clear all pipes
        pipes.forEach(pipe => {
          if (pipe.mesh) {
            scene.remove(pipe.mesh);
          }
        });
        pipes.length = 0;
        occupiedCells.clear();
        
        // Start new pipe
        const newColor = colors[Math.floor(Math.random() * colors.length)];
        const newDirection = [
          { x: 1, y: 0, z: 0 },
          { x: -1, y: 0, z: 0 },
          { x: 0, y: 1, z: 0 },
          { x: 0, y: -1, z: 0 },
          { x: 0, y: 0, z: 1 },
          { x: 0, y: 0, z: -1 },
        ][Math.floor(Math.random() * 6)];
        
        const newPipe = new Pipe(0, 0, 0, newDirection, newColor);
        pipes.push(newPipe);
        occupiedCells.add("0,0,0");
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default PipesScreensaver; 
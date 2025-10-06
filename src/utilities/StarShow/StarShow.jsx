import React, { useEffect, useRef } from "react";
import p5 from "p5";
import hsIcon from "./hammer-sickle.png";
import hsIcon1 from "./hammer-sickle-1.png";
import hsIcon2 from "./hammer-sickle-2.png";
import hsIcon3 from "./hammer-sickle-3.png";
import hsIcon4 from "./hammer-sickle-4.png";
import hsIcon5 from "./hammer-sickle-5.png";
import starIcon from "./star.png";
import starIcon1 from "./star-1.png";
import starIcon2 from "./star-2.png";
import starIcon3 from "./star-3.png";
import starIcon4 from "./star-4.png";
import starIcon5 from "./star-5.png";
import "./StarShow.css";

const StarShow = () => {
  const sketchRef = useRef();
  const p5InstanceRef = useRef(null);

  // Array of image paths to support multiple images
  const imagePaths = [
    hsIcon,
    hsIcon1,
    hsIcon2,
    hsIcon3,
    hsIcon4,
    hsIcon5,
    starIcon,
    starIcon1,
    starIcon2,
    starIcon3,
    starIcon4,
    starIcon5
  ];

  useEffect(() => {
    const sketch = (p) => {
      let windows = [];
      let windowsNum = 500;
      let speed = 4;
      let images = [];

      class Window {
        constructor() {
          this.x = p.random(-p.width, p.width);
          this.y = p.random(-p.height, p.height);
          this.z = p.random(p.width);
          this.pz = this.z;
          // Randomly assign an image from the loaded images
          this.img = images[Math.floor(p.random(images.length))];
        }

        update() {
          this.z = this.z - speed;
          if (this.z < 1) {
            this.z = p.width / 2;
            this.x = p.random(-p.width, p.width);
            this.y = p.random(-p.height, p.height);
            this.pz = this.z;
            // Reassign a random image when resetting
            this.img = images[Math.floor(p.random(images.length))];
          }
        }

        show() {
          let sx = p.map(this.x / this.z, 0, 1, 0, p.width / 2);
          let sy = p.map(this.y / this.z, 0, 1, 0, p.height / 2);
          let r = p.map(this.z, 0, p.width / 2, 26, 4);
          p.image(this.img, sx, sy, r, r);
          this.pz = this.z;
        }
      }

      p.setup = async () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        // Load all images from the imagePaths array
        try {
          images = await Promise.all(
            imagePaths.map(
              (path) =>
                new Promise((resolve, reject) => {
                  p.loadImage(path, resolve, (event) => reject(event));
                })
            )
          );
        } catch (error) {
          console.error("Failed to load images:", error);
          return;
        }

        for (let i = 0; i < windowsNum; i++) {
          windows[i] = new Window();
        }
      };

      p.draw = () => {
        if (images.length === 0) return; // Wait for images to load
        p.background(0);
        p.translate(p.width / 2, p.height / 2);
        for (let i = 0; i < windows.length; i++) {
          windows[i].update();
          windows[i].show();
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };
    };

    p5InstanceRef.current = new p5(sketch, sketchRef.current);

    return () => {
      p5InstanceRef.current.remove();
    };
  }, []);

  return <div ref={sketchRef} className="star-show-canvas" />;
};

export default StarShow;
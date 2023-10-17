import React, { useRef, useEffect } from 'react';

function App() {
  const canvasRef = useRef(null);
  const bubbles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const generateBubbles = () => {
      const numBubbles = 14;
      for (let i = 0; i < numBubbles; i++) {
        const bubble = {
          x: Math.random() * 1490,
          y: 740,
          radius: Math.random() * 50 + 30,
          speed: Math.random() * 50 + 40,
        };
        bubbles.current.push(bubble);
      }
    };

    const animateBubbles = () => {
      const animateFrame = () => {
        const timePassed = 1 / 60;
        context.clearRect(0, 0, 1490, 740);

        bubbles.current = bubbles.current.map((bubble) => {
          bubble.y -= bubble.speed * timePassed;
          if (bubble.y < 0) {
            bubble.y = 740;
          }

          const grd = context.createRadialGradient(
            bubble.x + bubble.radius / 2,
            bubble.y,
            2.5,
            bubble.x + bubble.radius / 2,
            bubble.y + bubble.radius / 2,
            bubble.radius
          );
          grd.addColorStop(0, 'white');
          grd.addColorStop(1, '#9acdf5');

          context.beginPath();
          context.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI);
          context.fillStyle = grd;
          context.fill();
          context.lineWidth = 1;
          context.strokeStyle = '#fff';
          context.stroke();

          return bubble;
        });

        requestAnimationFrame(animateFrame);
      };

      animateFrame();
    };

    generateBubbles();
    animateBubbles();
  }, []);

  return <canvas ref={canvasRef} width={1490} height={740}></canvas>;
}

export default App;

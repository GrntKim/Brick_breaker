import './App.css';
import { useRef, useEffect } from 'react';

const useCanvas = () => {
  const canvasRef = useRef(null);

  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    return canvas ? canvas.getContext('2d') : null;
  };

  const getCanvas = () => canvasRef.current;

  return { canvasRef, getCanvasContext, getCanvas };
};

function App() {
  const { canvasRef, getCanvasContext, getCanvas } = useCanvas();

  const drawBall = (x, y) => {
    const ctx = getCanvasContext();
    if (!ctx) return;

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }

  useEffect(() => {
    const canvas = getCanvas();
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    const ctx = getCanvasContext();
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(x, y);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall(x, y);
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className="App">
      <canvas 
        ref={canvasRef}
        id='gameCanvas' 
        width={480} 
        height={320}
      ></canvas>
    </div>
  );
}

export default App;

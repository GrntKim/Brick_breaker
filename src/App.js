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

  useEffect(() => {
    const canvas = getCanvas();
    const ctx = getCanvasContext();
    if (!canvas || !ctx) return;

    let ballRadius = 10;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let dx = 2;
    let dy = -2;
    let animationId;

    const paddleWidth = 75;
    const paddleHeight = 10;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let leftPressed = false;
    let rightPressed = false;


    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft')
        leftPressed = true;
      else if (e.key === 'ArrowRight')
        rightPressed = true;
    }

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft')
        leftPressed = false;
      else if (e.key === 'ArrowRight')
        rightPressed = false;
    }

    const drawBall = (ctx, x, y, ballRadius) => {

      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();
    }

    const drawBar = (ctx, x, y, paddleWidth, paddleHeight) => {
      ctx.beginPath();
      ctx.rect(x, y, paddleWidth, paddleHeight);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();
    }

    const mainLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall(ctx, ballX, ballY, ballRadius);
      drawBar(ctx, paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);

      if (leftPressed && paddleX > 0) 
        paddleX -= 7;
      if (rightPressed && paddleX + paddleWidth < canvas.width) 
        paddleX += 7;

      if (ballX + dx < ballRadius || ballX + dx > canvas.width - ballRadius) {
        dx = -dx;
      }
      if (ballY + dy < ballRadius || ballY + dy > canvas.height - ballRadius) {
        dy = -dy;
      }

      ballX += dx;
      ballY += dy;
      animationId = requestAnimationFrame(mainLoop);
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    mainLoop();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };

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

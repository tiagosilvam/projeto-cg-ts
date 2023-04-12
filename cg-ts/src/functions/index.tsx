export function setPixel(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Calcula centro da tela
  const centerX = 800 / 2;
  const centerY = 600 / 2;

  // Colocar pixels
  ctx.fillStyle = "#0f0";
  ctx.fillRect(x + centerX, centerY - y, 1, 1);
}


export const setLines = (ctx: CanvasRenderingContext2D) => {
  // Traça os quadrantes
  ctx.strokeStyle = 'rgba(255,255,255, 0.3)';
  ctx.moveTo(0, 300);
  ctx.lineTo(399, 300);
  ctx.moveTo(400, 0);
  ctx.lineTo(400, 600);
  ctx.moveTo(401, 300);
  ctx.lineTo(800, 300);
  ctx.stroke();
};

export const clear = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, 800, 600);
  ctx.beginPath();
};

// Reta
export const desenharRetaPM = (ctx: CanvasRenderingContext2D, posX: number, posY: number, posX2: number, posY2: number) => {
  // Iterators, counters required by algorithm
  let x, y, dx, dy, px, py, xEnd, yEnd; // Calculate line deltas
  dx = posX2 - posX;
  dy = posY2 - posY; // Create a positive copy of deltas (makes iterating easier)
  px = 2 * Math.abs(dy) - Math.abs(dx);
  py = 2 * Math.abs(dx) - Math.abs(dy); // The line is X-axis dominant
  if (Math.abs(dy) <= Math.abs(dx)) {
    // Line is drawn left to right
    if (dx >= 0) {
      x = posX;
      y = posY;
      xEnd = posX2;
    } else {
      // Line is drawn right to left (swap ends)
      x = posX2;
      y = posY2;
      xEnd = posX;
    }
    setPixel(ctx, x, y); // Draw first pixel        // Rasterize the line
    while (x < xEnd) {
      x++;
      if (px < 0) {
        px += 2 * Math.abs(dy);
      } else {
        if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
          y++;
        } else {
          y--;
        }
        px = px + 2 * (Math.abs(dy) - Math.abs(dx));
      } // Draw pixel from line span at
      // currently rasterized position
      setPixel(ctx, x, y);
    }
  } else {
    // The line is Y-axis dominant        // Line is drawn bottom to top
    if (dy >= 0) {
      x = posX;
      y = posY;
      yEnd = posY2;
    } else {
      // Line is drawn top to bottom
      x = posX2;
      y = posY2;
      yEnd = posY;
    }
    setPixel(ctx, x, y); // Draw first pixel        // Rasterize the line
    while (y < yEnd) {
      y++;
      if (py <= 0) {
        py += 2 * Math.abs(dx);
      } else {
        if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
          x++;
        } else {
          x--;
        }
        py = py + 2 * (Math.abs(dx) - Math.abs(dy));
      } // Draw pixel from line span at
      // currently rasterized position
      setPixel(ctx, x, y);
    }
  }
};

export const desenharRetaDDA = (ctx: CanvasRenderingContext2D, x0: number, y0: number, xEnd: number, yEnd: number) => {
  let dx = xEnd - x0,
    dy = yEnd - y0,
    steps,
    k;

  let xIncrement,
    yIncrement,
    x = x0,
    y = y0;

  if (Math.abs(dx) > Math.abs(dy)) {
    steps = Math.abs(dx);
  } else {
    steps = Math.abs(dy);
  }
  xIncrement = dx / steps;
  yIncrement = dy / steps;
  setPixel(ctx, Math.round(x), Math.round(y));
  for (k = 0; k < steps; k++) {
    x += xIncrement;
    y += yIncrement;
    setPixel(ctx, Math.round(x), Math.round(y));
  }
};
// Fim Algoritmos Reta

// Algoritmos Círculo
export const desenharPontoMedioCirculo = (ctx: CanvasRenderingContext2D, r: number) => {
  let y = r;
  let d;
  if (y % 2 === 0) {
    d = 1 - r;
  } else {
    d = 5 / 4 - r;
  }
  let x = 0;
  pontoCirculo(ctx, x, y);
  while (y > x) {
    if (d < 0) {
      d += 2.0 * x + 3.0;
    } else {
      d += 2.0 * (x - y) + 5;
      y--;
    }
    x++;
    pontoCirculo(ctx, x, y);
  }
};

const pontoCirculo = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  setPixel(ctx, x, y);
  setPixel(ctx, y, x);
  setPixel(ctx, y, -x);
  setPixel(ctx, x, -y);
  setPixel(ctx, -x, -y);
  setPixel(ctx, -y, -x);
  setPixel(ctx, -y, x);
  setPixel(ctx, -x, y);
};
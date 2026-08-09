export type RenderFormat = "PFP" | "BUILDER";

export interface UserData {
  name: string;
  role: string;
  tagline: string;
  title: string;
}

export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};

function drawImageCenterCrop(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const imgRatio = img.width / img.height;
  const targetRatio = w / h;
  let srcW, srcH, srcX, srcY;

  if (imgRatio > targetRatio) {
    srcH = img.height;
    srcW = img.height * targetRatio;
    srcX = (img.width - srcW) / 2;
    srcY = 0;
  } else {
    srcW = img.width;
    srcH = img.width / targetRatio;
    srcX = 0;
    srcY = (img.height - srcH) / 2;
  }

  // Draw image
  ctx.save();
  ctx.drawImage(img, srcX, srcY, srcW, srcH, x, y, w, h);
  
  // Add a tropical warm/yellow overlay to the photo to blend it with the retro sunset theme
  ctx.fillStyle = "rgba(255, 229, 0, 0.1)"; 
  ctx.globalCompositeOperation = "overlay";
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

// Retro Sunset Palette
const BG_GREEN = "#0E793C";
const BRAND_YELLOW = "#FFE500";
const BRAND_PINK = "#FF007A";
const TEXT_WHITE = "#FFFFFF";

const FONT_DISPLAY = "'Bodoni Moda', serif";
const FONT_MONO = "'Space Mono', monospace";

function createGoaGradient(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const grad = ctx.createLinearGradient(x, y, x + w, y + h);
  grad.addColorStop(0, BRAND_YELLOW);
  grad.addColorStop(1, BRAND_PINK);
  return grad;
}

// Polyfill for roundRect if needed, but modern browsers support it
function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export async function renderPfpFrame(
  canvas: HTMLCanvasElement,
  imgUrl: string | null
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = 1080;
  const height = 1080;
  canvas.width = width;
  canvas.height = height;

  // Background
  ctx.fillStyle = BG_GREEN;
  ctx.fillRect(0, 0, width, height);

  // Soft glowing mesh effect
  const bgGrad = ctx.createRadialGradient(width/2, height/2, 100, width/2, height/2, 800);
  bgGrad.addColorStop(0, "rgba(255, 229, 0, 0.3)");
  bgGrad.addColorStop(1, "transparent");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  const border = 40;
  const footerHeight = 220;
  
  if (imgUrl) {
    try {
      const img = await loadImage(imgUrl);
      drawImageCenterCrop(
        ctx,
        img,
        border,
        border,
        width - border * 2,
        height - border * 2 - footerHeight + border
      );
    } catch (e) {
      console.error("Failed to load image for canvas", e);
    }
  }

  // Draw glowing gradient frame border around the image
  ctx.strokeStyle = createGoaGradient(ctx, border, border, width, height);
  ctx.lineWidth = 16;
  ctx.lineJoin = "round";
  ctx.shadowColor = BRAND_YELLOW;
  ctx.shadowBlur = 15;
  ctx.strokeRect(border, border, width - border * 2, height - border * 2 - footerHeight + border);
  
  // Reset shadow
  ctx.shadowBlur = 0;

  // Bottom Branding Box (Translucent Glass Panel)
  const footerY = height - footerHeight;
  ctx.fillStyle = "rgba(14, 121, 60, 0.7)";
  ctx.fillRect(0, footerY, width, footerHeight);
  
  // Top gradient border for the glass footer
  ctx.fillStyle = createGoaGradient(ctx, 0, footerY, width, 10);
  ctx.fillRect(border, footerY + 20, width - border * 2, 6);

  // Main Display Text (Glowing)
  ctx.fillStyle = BRAND_YELLOW;
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.font = `800 120px ${FONT_DISPLAY}`;
  ctx.textAlign = "left";
  ctx.fillText("HACKER HOUSE", border + 10, footerY + 140);
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  
  // Pink overlapping text
  ctx.save();
  ctx.translate(border + 600, footerY + 90);
  ctx.rotate(-5 * Math.PI / 180);
  ctx.fillStyle = BRAND_PINK;
  roundedRect(ctx, -20, -50, 140, 65, 8);
  ctx.fill();
  ctx.fillStyle = TEXT_WHITE;
  ctx.font = `900 40px ${FONT_DISPLAY}`;
  ctx.textAlign = "center";
  ctx.fillText("गोआ", 50, -5);
  ctx.restore();

  // Bottom Metadata
  ctx.fillStyle = BRAND_YELLOW;
  ctx.font = `bold 24px ${FONT_MONO}`;
  ctx.textAlign = "left";
  ctx.fillText("GOA, INDIA · 28-31 OCT 2026", border + 10, footerY + 190);

  ctx.textAlign = "right";
  ctx.fillText("2:47 PM STUDIO", width - border - 10, footerY + 190);
}

export async function renderBuilderCard(
  canvas: HTMLCanvasElement,
  imgUrl: string | null,
  userData: UserData
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = 1080;
  const height = 1350;
  canvas.width = width;
  canvas.height = height;

  // Background
  ctx.fillStyle = BG_GREEN;
  ctx.fillRect(0, 0, width, height);

  // Soft gradient mesh effect at the top
  const bgGrad = ctx.createRadialGradient(width/2, -200, 100, width/2, 200, 800);
  bgGrad.addColorStop(0, "rgba(255, 229, 0, 0.4)");
  bgGrad.addColorStop(1, "transparent");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Decorative Waves at the top (Gradient strokes)
  ctx.strokeStyle = createGoaGradient(ctx, 0, 0, width, 200);
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 50);
  ctx.bezierCurveTo(200, -20, 300, 120, 540, 50);
  ctx.bezierCurveTo(780, -20, 880, 120, 1080, 50);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 80);
  ctx.bezierCurveTo(200, 10, 300, 150, 540, 80);
  ctx.bezierCurveTo(780, 10, 880, 150, 1080, 80);
  ctx.stroke();

  // Header Box (Glassy Green)
  ctx.fillStyle = "rgba(14, 121, 60, 0.6)";
  ctx.fillRect(0, 140, width, 140);
  
  // Pink/Yellow gradient borders on header box
  ctx.fillStyle = createGoaGradient(ctx, 0, 0, width, 10);
  ctx.fillRect(0, 130, width, 10);
  ctx.fillRect(0, 280, width, 10);

  // Header Text
  ctx.fillStyle = BRAND_YELLOW;
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.font = `800 90px ${FONT_DISPLAY}`;
  ctx.textAlign = "center";
  ctx.fillText("HACKER HOUSE", width / 2, 240);
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Draw Image Area (Rounded Corners, Glowing Border)
  const imgY = 340;
  const imgH = 500;
  const imgW = 700;
  const imgX = (width - imgW) / 2;
  
  ctx.save();
  roundedRect(ctx, imgX, imgY, imgW, imgH, 20);
  ctx.clip();
  
  if (imgUrl) {
    try {
      const img = await loadImage(imgUrl);
      drawImageCenterCrop(ctx, img, imgX, imgY, imgW, imgH);
    } catch (e) {
      console.error("Failed to load image for canvas", e);
    }
  } else {
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(imgX, imgY, imgW, imgH);
  }
  ctx.restore();
  
  // Image Border
  ctx.strokeStyle = createGoaGradient(ctx, imgX, imgY, imgW, imgH);
  ctx.lineWidth = 8;
  ctx.shadowColor = BRAND_YELLOW;
  ctx.shadowBlur = 20;
  roundedRect(ctx, imgX, imgY, imgW, imgH, 20);
  ctx.stroke();
  ctx.shadowBlur = 0;

  const startY = imgY + imgH + 100;

  // Builder Class
  ctx.fillStyle = BRAND_YELLOW;
  ctx.font = `bold 24px ${FONT_MONO}`;
  ctx.textAlign = "left";
  ctx.fillText(userData.title || "BUILDER CLASS: UNKNOWN", imgX, startY);

  // Name (Massive Serif)
  ctx.fillStyle = TEXT_WHITE;
  ctx.font = `900 100px ${FONT_DISPLAY}`;
  let name = (userData.name || "YOUR NAME").toUpperCase();
  ctx.fillText(name, imgX - 5, startY + 110);

  // Role (Pink block, rounded)
  ctx.fillStyle = BRAND_PINK;
  roundedRect(ctx, imgX, startY + 150, imgW, 60, 12);
  ctx.fill();
  ctx.fillStyle = TEXT_WHITE;
  ctx.font = `bold 32px ${FONT_MONO}`;
  ctx.fillText((userData.role || "ROLE / STACK").toUpperCase(), imgX + 20, startY + 192);

  // Tagline
  if (userData.tagline) {
    ctx.fillStyle = BRAND_YELLOW;
    ctx.font = `italic 32px ${FONT_DISPLAY}`;
    ctx.fillText(`"${userData.tagline}"`, imgX, startY + 280);
  }

  // Footer text
  ctx.textAlign = "center";
  ctx.fillStyle = TEXT_WHITE;
  ctx.font = `bold 24px ${FONT_MONO}`;
  ctx.fillText("GOA, INDIA / 28–31 OCT 2026", width / 2, height - 60);
}

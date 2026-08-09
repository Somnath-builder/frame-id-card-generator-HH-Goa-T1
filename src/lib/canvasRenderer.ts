export type RenderFormat = "PFP" | "BUILDER";

export interface UserData {
  name: string;
  role: string;
  tagline: string;
  title: string;
}

// Helper to load image
export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};

// Center crop image drawing logic
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
    // Image is wider than target
    srcH = img.height;
    srcW = img.height * targetRatio;
    srcX = (img.width - srcW) / 2;
    srcY = 0;
  } else {
    // Image is taller than target
    srcW = img.width;
    srcH = img.width / targetRatio;
    srcX = 0;
    srcY = (img.height - srcH) / 2;
  }

  ctx.drawImage(img, srcX, srcY, srcW, srcH, x, y, w, h);
}

// Constants for Design System
const BRAND_ORANGE = "#ff4a00";
const BG_DARK = "#050505";
const TEXT_WHITE = "#f4f4f5";
const TEXT_MUTED = "#a1a1aa";

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
  ctx.fillStyle = BG_DARK;
  ctx.fillRect(0, 0, width, height);

  // Draw user image
  if (imgUrl) {
    try {
      const img = await loadImage(imgUrl);
      // Leave a border around the image
      const border = 40;
      drawImageCenterCrop(
        ctx,
        img,
        border,
        border,
        width - border * 2,
        height - border * 2
      );
      
      // Draw inner border
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 2;
      ctx.strokeRect(border, border, width - border * 2, height - border * 2);
    } catch (e) {
      console.error("Failed to load image for canvas", e);
    }
  }

  // Draw geometric/technical overlays
  ctx.fillStyle = BRAND_ORANGE;
  
  // Top right corner element
  ctx.fillRect(width - 80, 40, 40, 8);
  ctx.fillRect(width - 48, 40, 8, 40);

  // Bottom left corner element
  ctx.fillRect(40, height - 48, 40, 8);
  ctx.fillRect(40, height - 80, 8, 40);

  // Text: "LESS NOISE. MORE SIGNAL."
  ctx.save();
  ctx.translate(20, height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = BRAND_ORANGE;
  ctx.font = "bold 16px 'Space Grotesk', monospace";
  ctx.textAlign = "center";
  ctx.letterSpacing = "2px";
  ctx.fillText("LESS NOISE. MORE SIGNAL.", 0, 0);
  ctx.restore();

  // Bottom overlay text
  ctx.fillStyle = "rgba(5, 5, 5, 0.85)";
  ctx.fillRect(40, height - 140, width - 80, 100);

  ctx.fillStyle = TEXT_WHITE;
  ctx.font = "bold 56px 'Inter', sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("HH GOA 2026", 70, height - 70);

  ctx.fillStyle = BRAND_ORANGE;
  ctx.font = "600 24px 'Space Grotesk', monospace";
  ctx.textAlign = "right";
  ctx.fillText("AI × CRYPTO", width - 70, height - 85);
  
  ctx.fillStyle = TEXT_MUTED;
  ctx.font = "400 16px 'Space Grotesk', monospace";
  ctx.fillText("28–31 OCT 2026 / GOA, INDIA", width - 70, height - 60);
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
  ctx.fillStyle = BG_DARK;
  ctx.fillRect(0, 0, width, height);

  // Draw subtle grid
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 1;
  for (let i = 0; i < width; i += 54) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
  }
  for (let i = 0; i < height; i += 54) {
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
  }

  // Draw Header
  ctx.fillStyle = TEXT_WHITE;
  ctx.font = "bold 42px 'Inter', sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("HACKER HOUSE GOA", 60, 90);

  ctx.fillStyle = BRAND_ORANGE;
  ctx.font = "bold 24px 'Space Grotesk', monospace";
  ctx.textAlign = "right";
  ctx.fillText("BUILDER_ID_001", width - 60, 85);

  // Draw Image
  const imgY = 140;
  const imgH = 750;
  if (imgUrl) {
    try {
      const img = await loadImage(imgUrl);
      drawImageCenterCrop(ctx, img, 60, imgY, width - 120, imgH);
    } catch (e) {
      console.error("Failed to load image for canvas", e);
    }
  } else {
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(60, imgY, width - 120, imgH);
  }
  
  // Image Frame overlay
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 2;
  ctx.strokeRect(60, imgY, width - 120, imgH);

  // Bottom Section: Info
  const startY = imgY + imgH + 80;

  // Title
  ctx.fillStyle = BRAND_ORANGE;
  ctx.font = "bold 28px 'Space Grotesk', monospace";
  ctx.textAlign = "left";
  ctx.letterSpacing = "2px";
  ctx.fillText(userData.title || "THE BUILDER", 60, startY);

  // Name
  ctx.fillStyle = TEXT_WHITE;
  ctx.font = "900 84px 'Inter', sans-serif";
  ctx.letterSpacing = "-2px";
  let name = (userData.name || "YOUR NAME").toUpperCase();
  ctx.fillText(name, 55, startY + 90);

  // Role
  ctx.fillStyle = TEXT_MUTED;
  ctx.font = "600 32px 'Inter', sans-serif";
  ctx.fillText((userData.role || "ROLE / STACK").toUpperCase(), 60, startY + 150);

  // Tagline
  if (userData.tagline) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "italic 24px 'Inter', sans-serif";
    ctx.fillText(userData.tagline, 60, startY + 200);
  }

  // Right Side Metadata
  ctx.textAlign = "right";
  ctx.fillStyle = TEXT_WHITE;
  ctx.font = "bold 24px 'Space Grotesk', monospace";
  ctx.fillText("GOA, INDIA", width - 60, startY + 90);
  
  ctx.fillStyle = TEXT_MUTED;
  ctx.font = "20px 'Space Grotesk', monospace";
  ctx.fillText("28–31 OCT 2026", width - 60, startY + 130);

  ctx.fillStyle = BRAND_ORANGE;
  ctx.fillText("AI × CRYPTO", width - 60, startY + 170);

  // Barcode / Technical Deco
  ctx.fillStyle = TEXT_WHITE;
  for(let i = 0; i < 20; i++) {
    const barWidth = Math.random() * 10 + 2;
    ctx.fillRect(width - 60 - (i * 15), startY + 220, barWidth, 40);
  }
}

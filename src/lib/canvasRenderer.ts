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

  // Draw image slightly desaturated/cool to fit the theme
  ctx.save();
  ctx.drawImage(img, srcX, srcY, srcW, srcH, x, y, w, h);
  // Apply a very subtle color burn overlay to merge it with the background
  ctx.fillStyle = "rgba(0, 229, 255, 0.05)"; // subtle cyan tint
  ctx.globalCompositeOperation = "color-burn";
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

const BRAND_ACCENT = "#00ff41"; // Electric Green
const BG_DARK = "#030303"; // Deep Black
const BG_SECONDARY = "#0a0a0a"; // Graphite
const TEXT_WHITE = "#f4f4f5";
const TEXT_MUTED = "#888888";
const TEXT_CYAN = "#00e5ff"; // Subtle Cyan

function drawCrosshair(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x + size, y);
  ctx.moveTo(x, y - size);
  ctx.lineTo(x, y + size);
  ctx.stroke();
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

  ctx.fillStyle = BG_DARK;
  ctx.fillRect(0, 0, width, height);

  const border = 80;
  if (imgUrl) {
    try {
      const img = await loadImage(imgUrl);
      drawImageCenterCrop(
        ctx,
        img,
        border,
        border,
        width - border * 2,
        height - border * 2
      );
    } catch (e) {
      console.error("Failed to load image for canvas", e);
    }
  }

  // Draw main frame border
  ctx.strokeStyle = TEXT_WHITE;
  ctx.lineWidth = 6;
  ctx.strokeRect(border, border, width - border * 2, height - border * 2);

  // Crosshairs
  const chSize = 25;
  drawCrosshair(ctx, border, border, chSize, BRAND_ACCENT);
  drawCrosshair(ctx, width - border, border, chSize, BRAND_ACCENT);
  drawCrosshair(ctx, border, height - border, chSize, BRAND_ACCENT);
  drawCrosshair(ctx, width - border, height - border, chSize, BRAND_ACCENT);

  // Cryptographic metadata top right
  ctx.fillStyle = BRAND_ACCENT;
  ctx.font = "bold 16px 'Space Grotesk', monospace";
  ctx.textAlign = "right";
  ctx.fillText("HHG/26", width - border - 15, border + 30);
  ctx.fillText("NODE: GOA", width - border - 15, border + 50);
  ctx.fillText("SIG: 7F2A", width - border - 15, border + 70);

  // Left vertical text
  ctx.save();
  ctx.translate(35, height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = TEXT_WHITE;
  ctx.font = "bold 20px 'Space Grotesk', monospace";
  ctx.textAlign = "center";
  ctx.letterSpacing = "4px";
  ctx.fillText("LESS NOISE. MORE SIGNAL.", 0, 0);
  ctx.restore();

  // Bottom Branding Box
  ctx.fillStyle = BG_DARK;
  ctx.fillRect(border, height - border - 140, width - border * 2, 140);
  
  ctx.strokeStyle = TEXT_WHITE;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(border, height - border - 140);
  ctx.lineTo(width - border, height - border - 140);
  ctx.stroke();

  ctx.fillStyle = TEXT_WHITE;
  ctx.font = "600 76px 'Oswald', sans-serif";
  ctx.textAlign = "left";
  ctx.letterSpacing = "2px";
  ctx.fillText("HH GOA 2026", border + 30, height - border - 45);

  ctx.fillStyle = BRAND_ACCENT;
  ctx.font = "bold 24px 'Space Grotesk', monospace";
  ctx.textAlign = "right";
  ctx.fillText("AI × CRYPTO", width - border - 30, height - border - 80);
  
  ctx.fillStyle = TEXT_MUTED;
  ctx.font = "500 18px 'Space Grotesk', monospace";
  ctx.fillText("28–31 OCT 2026 / GOA, INDIA", width - border - 30, height - border - 45);
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

  ctx.fillStyle = BG_DARK;
  ctx.fillRect(0, 0, width, height);

  // Header background block
  ctx.fillStyle = BG_SECONDARY;
  ctx.fillRect(0, 0, width, 140);

  ctx.fillStyle = TEXT_WHITE;
  ctx.font = "800 56px 'Oswald', sans-serif";
  ctx.textAlign = "left";
  ctx.letterSpacing = "2px";
  ctx.fillText("HACKER HOUSE GOA", 60, 95);

  ctx.fillStyle = BRAND_ACCENT;
  ctx.font = "bold 24px 'Space Grotesk', monospace";
  ctx.textAlign = "right";
  ctx.fillText("HHG_2026", width - 60, 90);

  // Draw Image Area
  const imgY = 140;
  const imgH = 720;
  if (imgUrl) {
    try {
      const img = await loadImage(imgUrl);
      drawImageCenterCrop(ctx, img, 60, imgY + 40, width - 120, imgH);
    } catch (e) {
      console.error("Failed to load image for canvas", e);
    }
  } else {
    ctx.fillStyle = BG_SECONDARY;
    ctx.fillRect(60, imgY + 40, width - 120, imgH);
  }
  
  ctx.strokeStyle = TEXT_WHITE;
  ctx.lineWidth = 4;
  ctx.strokeRect(60, imgY + 40, width - 120, imgH);

  // Crosshairs around image
  const chSize = 15;
  drawCrosshair(ctx, 60, imgY + 40, chSize, BRAND_ACCENT);
  drawCrosshair(ctx, width - 60, imgY + 40, chSize, BRAND_ACCENT);
  drawCrosshair(ctx, 60, imgY + 40 + imgH, chSize, BRAND_ACCENT);
  drawCrosshair(ctx, width - 60, imgY + 40 + imgH, chSize, BRAND_ACCENT);

  // Signal indicator on image
  ctx.fillStyle = BRAND_ACCENT;
  ctx.fillRect(width - 240, imgY + 60, 160, 30);
  ctx.fillStyle = BG_DARK;
  ctx.font = "bold 16px 'Space Grotesk', monospace";
  ctx.textAlign = "center";
  ctx.fillText("SIGNAL: ACTIVE", width - 160, imgY + 80);

  const startY = imgY + imgH + 110;

  // Builder Class (from titleGenerator)
  ctx.fillStyle = TEXT_CYAN;
  ctx.font = "bold 22px 'Space Grotesk', monospace";
  ctx.textAlign = "left";
  ctx.letterSpacing = "2px";
  ctx.fillText(userData.title || "BUILDER CLASS: 00 — THE UNKNOWN", 60, startY);

  // Name
  ctx.fillStyle = TEXT_WHITE;
  ctx.font = "700 84px 'Oswald', sans-serif";
  ctx.letterSpacing = "1px";
  let name = (userData.name || "YOUR NAME").toUpperCase();
  ctx.fillText(name, 55, startY + 90);

  // Role
  ctx.fillStyle = TEXT_MUTED;
  ctx.font = "600 32px 'Inter', sans-serif";
  ctx.fillText((userData.role || "ROLE / STACK").toUpperCase(), 60, startY + 150);

  // Tagline
  if (userData.tagline) {
    ctx.fillStyle = TEXT_WHITE;
    ctx.font = "italic 24px 'Inter', sans-serif";
    ctx.fillText(`"${userData.tagline}"`, 60, startY + 200);
  }

  // Right Side Metadata
  ctx.textAlign = "right";
  ctx.fillStyle = TEXT_WHITE;
  ctx.font = "bold 26px 'Space Grotesk', monospace";
  ctx.fillText("GOA, INDIA", width - 60, startY + 80);
  
  ctx.fillStyle = TEXT_MUTED;
  ctx.font = "20px 'Space Grotesk', monospace";
  ctx.fillText("28–31 OCT 2026", width - 60, startY + 120);

  ctx.fillStyle = BRAND_ACCENT;
  ctx.fillText("AI × CRYPTO", width - 60, startY + 160);

  // Barcode / Cryptographic Hash Deco
  ctx.fillStyle = TEXT_WHITE;
  let barX = width - 60;
  for(let i = 0; i < 28; i++) {
    const barWidth = [2, 4, 1, 6, 8, 2, 4, 12, 1][i % 9];
    barX -= (barWidth + 4);
    ctx.fillRect(barX, startY + 200, barWidth, 40);
  }
}



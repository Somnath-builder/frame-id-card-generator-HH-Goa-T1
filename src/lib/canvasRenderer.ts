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

  // Draw image in full natural color
  ctx.save();
  // Optional: add a slight warmth to the photo using a very soft overlay
  ctx.drawImage(img, srcX, srcY, srcW, srcH, x, y, w, h);
  ctx.fillStyle = "rgba(255, 142, 83, 0.05)"; // extremely subtle warm tint
  ctx.globalCompositeOperation = "overlay";
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

// Sunset / Ocean Palette
const BRAND_ACCENT = "#FF512F"; // Sunset Orange
const BRAND_SECONDARY = "#F09819"; // Warm Yellow
const BG_DARK = "#0B0914"; // Deep Twilight
const BG_CARD = "#161224"; // Glass Panel Background
const TEXT_WHITE = "#F8F9FA";
const TEXT_MUTED = "#A09DB0";
const TEXT_CYAN = "#48CAE4"; // Ocean Cyan

function createGoaGradient(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const grad = ctx.createLinearGradient(x, y, x + w, y + h);
  grad.addColorStop(0, BRAND_ACCENT);
  grad.addColorStop(1, BRAND_SECONDARY);
  return grad;
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

  const border = 60;
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

  // Soft glowing border instead of stark lines
  ctx.strokeStyle = createGoaGradient(ctx, border, border, width, height);
  ctx.lineWidth = 12;
  ctx.lineJoin = "round";
  ctx.shadowColor = BRAND_ACCENT;
  ctx.shadowBlur = 20;
  ctx.strokeRect(border, border, width - border * 2, height - border * 2);
  
  // Reset shadow
  ctx.shadowBlur = 0;

  // Modern soft corner accents
  ctx.fillStyle = TEXT_WHITE;
  const corners = [
    [border, border],
    [width - border, border],
    [border, height - border],
    [width - border, height - border]
  ];
  
  corners.forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, 16, 0, Math.PI * 2);
    ctx.fill();
  });

  // Subtle Goa coordinates top right
  ctx.fillStyle = TEXT_WHITE;
  ctx.font = "bold 18px 'Inter', sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("15°29′N / 73°49′E", width - border - 30, border + 40);

  // Bottom Branding Glass Box
  ctx.fillStyle = "rgba(22, 18, 36, 0.85)"; // Translucent card
  ctx.fillRect(border + 20, height - border - 160, width - border * 2 - 40, 140);
  
  ctx.fillStyle = TEXT_WHITE;
  ctx.font = "800 76px 'Oswald', sans-serif";
  ctx.textAlign = "left";
  ctx.letterSpacing = "2px";
  ctx.fillText("HH GOA 2026", border + 50, height - border - 60);

  ctx.fillStyle = createGoaGradient(ctx, border, border, width, height);
  ctx.font = "bold 26px 'Inter', sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("AI × CRYPTO × BUILDERS", width - border - 50, height - border - 90);
  
  ctx.fillStyle = TEXT_MUTED;
  ctx.font = "500 20px 'Inter', sans-serif";
  ctx.fillText("28–31 OCT 2026 / GOA, INDIA", width - border - 50, height - border - 55);
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

  // Soft gradient mesh effect at the top
  const bgGrad = ctx.createRadialGradient(width/2, -200, 100, width/2, 200, 800);
  bgGrad.addColorStop(0, "rgba(255, 81, 47, 0.2)");
  bgGrad.addColorStop(1, "transparent");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Header
  ctx.fillStyle = TEXT_WHITE;
  ctx.font = "800 64px 'Oswald', sans-serif";
  ctx.textAlign = "left";
  ctx.letterSpacing = "2px";
  ctx.fillText("HACKER HOUSE GOA", 60, 100);

  ctx.fillStyle = createGoaGradient(ctx, 0, 0, width, 200);
  ctx.font = "bold 28px 'Inter', sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("2026", width - 60, 95);

  // Draw Image Area
  const imgY = 160;
  const imgH = 680;
  if (imgUrl) {
    try {
      const img = await loadImage(imgUrl);
      drawImageCenterCrop(ctx, img, 60, imgY, width - 120, imgH);
    } catch (e) {
      console.error("Failed to load image for canvas", e);
    }
  } else {
    ctx.fillStyle = BG_CARD;
    ctx.fillRect(60, imgY, width - 120, imgH);
  }
  
  // Image Border
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.lineWidth = 4;
  ctx.strokeRect(60, imgY, width - 120, imgH);

  const startY = imgY + imgH + 100;

  // Builder Class
  ctx.fillStyle = TEXT_CYAN;
  ctx.font = "bold 24px 'Inter', sans-serif";
  ctx.textAlign = "left";
  ctx.letterSpacing = "4px";
  ctx.fillText(userData.title || "BUILDER CLASS: UNKNOWN", 60, startY);

  // Name
  ctx.fillStyle = TEXT_WHITE;
  ctx.font = "900 84px 'Oswald', sans-serif";
  ctx.letterSpacing = "1px";
  let name = (userData.name || "YOUR NAME").toUpperCase();
  ctx.fillText(name, 55, startY + 90);

  // Role
  ctx.fillStyle = BRAND_SECONDARY;
  ctx.font = "600 36px 'Inter', sans-serif";
  ctx.fillText((userData.role || "ROLE / STACK").toUpperCase(), 60, startY + 150);

  // Tagline
  if (userData.tagline) {
    ctx.fillStyle = TEXT_WHITE;
    ctx.font = "italic 28px 'Inter', sans-serif";
    ctx.fillText(`"${userData.tagline}"`, 60, startY + 210);
  }

  // Right Side Metadata
  ctx.textAlign = "right";
  ctx.fillStyle = TEXT_WHITE;
  ctx.font = "bold 28px 'Inter', sans-serif";
  ctx.fillText("GOA, INDIA", width - 60, startY + 90);
  
  ctx.fillStyle = TEXT_MUTED;
  ctx.font = "24px 'Inter', sans-serif";
  ctx.fillText("28–31 OCT 2026", width - 60, startY + 130);

  // Modern Ticket Barcode
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  let barX = width - 60;
  for(let i = 0; i < 28; i++) {
    const barWidth = [2, 4, 1, 6, 8, 2, 4, 12, 1][i % 9];
    barX -= (barWidth + 4);
    ctx.fillRect(barX, startY + 180, barWidth, 40);
  }
}

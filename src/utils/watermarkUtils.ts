export const applyWatermark = (
  canvas: HTMLCanvasElement,
  imageUrl: string,
  watermarkText: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return reject(new Error('Could not get 2D context from canvas.'));
    }

    const img = new Image();
    img.crossOrigin = 'anonymous'; // Needed for images from different origins if applicable
    img.src = imageUrl;

    img.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the original image
      ctx.drawImage(img, 0, 0);

      // Apply watermark
      ctx.font = `${Math.max(20, img.width / 30)}px 'Inter', sans-serif`; // Responsive font size
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'; // White, semi-transparent
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';

      const padding = Math.max(10, img.width / 100); // Responsive padding
      const x = canvas.width - padding;
      const y = canvas.height - padding;

      // Add a subtle shadow for better readability
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      ctx.fillText(watermarkText, x, y);

      // Reset shadow for subsequent drawings if any
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      resolve();
    };

    img.onerror = (error) => {
      reject(new Error(`Failed to load image: ${error}`));
    };
  });
};
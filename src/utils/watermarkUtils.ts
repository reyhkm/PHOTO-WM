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
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    img.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the original image
      ctx.drawImage(img, 0, 0);

      // --- Start of Tiled Watermark Logic ---

      // Watermark style
      const fontSize = Math.max(24, img.width / 25);
      ctx.font = `bold ${fontSize}px 'Inter', sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'; // Semi-transparent white
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Measure text to calculate spacing
      const textMetrics = ctx.measureText(watermarkText);
      
      // Define the gap between repetitions
      const gapX = textMetrics.width * 1.5;
      const gapY = fontSize * 4;

      const angle = -Math.PI / 4; // -45 degrees

      // Loop through the canvas to draw the tiled watermark
      for (let y = 0; y < canvas.height + gapY; y += gapY) {
        for (let x = 0; x < canvas.width + gapX; x += gapX) {
          ctx.save();
          // Translate and rotate the canvas context
          ctx.translate(x, y);
          ctx.rotate(angle);
          // Draw the text
          ctx.fillText(watermarkText, 0, 0);
          // Restore the original context state
          ctx.restore();
        }
      }

      // --- End of Tiled Watermark Logic ---

      resolve();
    };

    img.onerror = (error) => {
      reject(new Error(`Failed to load image: ${error}`));
    };
  });
};

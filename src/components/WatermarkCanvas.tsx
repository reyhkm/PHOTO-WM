import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { applyWatermark } from '../utils/watermarkUtils';

interface WatermarkCanvasProps {
  imageUrl: string;
  watermarkText: string;
}

export interface WatermarkCanvasRef {
  getCanvas: () => HTMLCanvasElement | null;
}

const WatermarkCanvas = forwardRef<WatermarkCanvasRef, WatermarkCanvasProps>(
  ({ imageUrl, watermarkText }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => ({
      getCanvas: () => canvasRef.current,
    }));

    useEffect(() => {
      if (imageUrl && canvasRef.current) {
        applyWatermark(canvasRef.current, imageUrl, watermarkText)
          .catch(console.error);
      }
    }, [imageUrl, watermarkText]);

    return (
      <div className="relative w-full h-auto max-w-full overflow-hidden rounded-lg shadow-lg bg-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <canvas ref={canvasRef} className="max-w-full h-auto block" />
        ) : (
          <div className="p-12 text-gray-500 text-center">
            <p>Upload an image to see the watermark preview.</p>
          </div>
        )}
      </div>
    );
  }
);

export default WatermarkCanvas;
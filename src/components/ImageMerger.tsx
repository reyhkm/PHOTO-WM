import React, { useState, useRef } from 'react';

function ImageMerger() {
  const [images, setImages] = useState<string[]>([]);
  const [mergeDirection, setMergeDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filePromises = Array.from(files).map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(filePromises).then(imageDataUrls => {
        setImages(prevImages => [...prevImages, ...imageDataUrls]);
      });
    }
  };

  const handleMerge = async () => {
    if (images.length < 2 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loadedImages = await Promise.all(
      images.map(src => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      })
    );

    let totalWidth = 0;
    let totalHeight = 0;

    if (mergeDirection === 'horizontal') {
      totalWidth = loadedImages.reduce((sum, img) => sum + img.width, 0);
      totalHeight = Math.max(...loadedImages.map(img => img.height));
    } else { // vertical
      totalWidth = Math.max(...loadedImages.map(img => img.width));
      totalHeight = loadedImages.reduce((sum, img) => sum + img.height, 0);
    }

    canvas.width = totalWidth;
    canvas.height = totalHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let currentX = 0;
    let currentY = 0;

    for (const img of loadedImages) {
      ctx.drawImage(img, currentX, currentY);
      if (mergeDirection === 'horizontal') {
        currentX += img.width;
      } else {
        currentY += img.height;
      }
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'merged-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleClear = () => {
    setImages([]);
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = 0;
            canvas.height = 0;
        }
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
        Image Merger
      </h2>
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Upload Images</h3>
        <p className="text-sm text-gray-500 mb-4">Select two or more images to merge.</p>
        <div className="mb-6">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {images.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Selected Images ({images.length})</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((src, index) => (
                <img key={index} src={src} alt={`upload-preview-${index}`} className="rounded-md object-cover h-32 w-full" />
              ))}
            </div>
             <button onClick={handleClear} className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200">
                Clear Images
            </button>
          </div>
        )}

        {images.length > 1 && (
          <>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Merge Options</h3>
              <div className="flex items-center space-x-6 mb-6">
                <span className="text-sm font-medium text-gray-700">Merge Direction:</span>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="direction"
                    value="horizontal"
                    checked={mergeDirection === 'horizontal'}
                    onChange={() => setMergeDirection('horizontal')}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span>Horizontal</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="direction"
                    value="vertical"
                    checked={mergeDirection === 'vertical'}
                    onChange={() => setMergeDirection('vertical')}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span>Vertical</span>
                </label>
              </div>
              <button
                onClick={handleMerge}
                className="w-full md:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Merge Images
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Preview & Download</h3>
                <div className="mb-6 bg-gray-100 p-4 rounded-lg flex justify-center items-center">
                    <canvas ref={canvasRef} className="max-w-full h-auto" />
                </div>
                <button
                    onClick={handleDownload}
                    disabled={!canvasRef.current || canvasRef.current.width === 0}
                    className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Download Merged Image
                </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ImageMerger;
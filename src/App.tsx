import { useState, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';
import WatermarkCanvas, { WatermarkCanvasRef } from './components/WatermarkCanvas';

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState<string>("YourBrandName.com | DM for original");
  const canvasRef = useRef<WatermarkCanvasRef>(null);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current?.getCanvas();
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'watermarked-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Elegant Photo Watermarking
        </h2>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Upload Your Image</h3>
              <ImageUploader onImageSelect={handleImageSelect} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Watermark Settings</h3>
              <div className="mb-4">
                <label htmlFor="watermark-text" className="block text-sm font-medium text-gray-700 mb-1">
                  Watermark Text
                </label>
                <input
                  type="text"
                  id="watermark-text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="e.g., YourBrand.com | DM for original"
                />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                This text will be subtly added to your image.
              </p>
            </div>
          </div>

          {selectedImage && (
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Preview & Download</h3>
              <div className="mb-6">
                <WatermarkCanvas
                  ref={canvasRef}
                  imageUrl={selectedImage}
                  watermarkText={watermarkText}
                />
              </div>
              <button
                onClick={handleDownload}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Download Watermarked Image
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
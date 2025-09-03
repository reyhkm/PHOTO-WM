# Photo Watermark App

A modern, elegant, and clean web application built with React, Vite, and TailwindCSS, designed to automatically add a subtle watermark to your uploaded images. Perfect for photographers, artists, or service providers who want to protect their work and guide clients to contact them for original, unwatermarked versions.

## Features

*   **Image Upload:** Easily upload JPG, PNG, or GIF images.
*   **Automatic Watermarking:** Images are automatically watermarked with a customizable text.
*   **Live Preview:** See the watermarked image in real-time.
*   **Customizable Watermark:** Change the watermark text directly in the UI.
*   **Download:** Download the processed image with the watermark.
*   **Clean & Modern UI/UX:** Built with TailwindCSS for a sleek and responsive design.

## Tech Stack

*   **Frontend:** React.js
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Language:** TypeScript

## Setup and Installation

Follow these steps to get the project up and running on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/photo-watermark-app.git
cd photo-watermark-app
```

### 2. Install dependencies

```bash
npm install
# or yarn install
# or pnpm install
```

### 3. Run the development server

```bash
npm run dev
# or yarn dev
# or pnpm dev
```

Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

### 4. Build for production

```bash
npm run build
# or yarn build
# or pnpm build
```

This will create a `dist` directory with all the static files ready for deployment.

## Customization

### Watermark Text
You can easily change the default watermark text directly in the `src/App.tsx` file:

```typescript
// src/App.tsx
const [watermarkText, setWatermarkText] = useState<string>("YourBrandName.com | DM for original");
```
Or, you can simply use the input field provided in the UI to change it dynamically.

### Styling
All styling is done using Tailwind CSS. You can modify the `tailwind.config.js` file or directly edit the class names in the React components (`.tsx` files) to match your brand's aesthetic.

### Watermark Appearance
The watermark's font size, color, position, and shadow are defined in `src/utils/watermarkUtils.ts`. Feel free to adjust these values to achieve your desired look:

```typescript
// src/utils/watermarkUtils.ts
ctx.font = `${Math.max(20, img.width / 30)}px 'Inter', sans-serif`; // Responsive font size
ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'; // White, semi-transparent
ctx.textAlign = 'right';
ctx.textBaseline = 'bottom';
const padding = Math.max(10, img.width / 100);
// ... and shadow properties
```

## Deployment on Cloudflare Pages

This project is designed to be easily deployed on Cloudflare Pages.

1.  **Connect your Git repository:** Log in to Cloudflare, go to "Pages", and connect your GitHub/GitLab/Bitbucket repository.
2.  **Configure build settings:**
    *   **Framework preset:** `Vite`
    *   **Build command:** `npm run build` (or `yarn build`, `pnpm build`)
    *   **Build output directory:** `dist`
3.  **Deploy:** Cloudflare Pages will automatically build and deploy your application. Any subsequent pushes to your connected branch will trigger a new deployment.

---

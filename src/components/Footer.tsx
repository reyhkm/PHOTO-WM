function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 px-6 mt-8">
      <div className="max-w-4xl mx-auto text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Photo Watermark Service. All rights reserved.</p>
        <p className="mt-2">
          Created with ❤️ for your elegant watermarking needs.
        </p>
      </div>
    </footer>
  );
}
export default Footer;
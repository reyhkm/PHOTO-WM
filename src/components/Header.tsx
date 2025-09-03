function Header() {
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Photo Watermark Service</h1>
        <nav>
          {/* Optional: Add navigation links here */}
        </nav>
      </div>
    </header>
  );
}
export default Header;